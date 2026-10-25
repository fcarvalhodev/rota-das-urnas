#!/usr/bin/env python3
"""Busca o resultado do 2º turno para presidente no TSE e grava dados-tse.json.

Roda de hora em hora pela GitHub Action (.github/workflows/atualizar.yml).
Sem dependências: só a biblioteca padrão do Python.

Arquivos do TSE (formato de 2026, "resultado unificado"):
  https://resultados.tse.jus.br/oficial/ele2026/6258/dados/<uf>/<uf>-c0001-e006258-u.json
  <uf> = br (Brasil), as 27 UFs em minúsculas, e zz (exterior).

Lula é o número 13 e Flávio Bolsonaro o 22. O script procura os candidatos em
qualquer lugar do JSON (pelo número ou pelo nome), para não quebrar se o TSE
mudar o aninhamento dos campos.

Uso: python3 scripts/atualizar_tse.py [--base URL] [--saida dados-tse.json]
     --base aceita um diretório local (file://...) para testar com dados falsos.
"""
import argparse, json, os, sys, time, urllib.request, urllib.error
from datetime import datetime, timezone

ELEICAO = 6258
CICLO = "ele2026"
BASE = "https://resultados.tse.jus.br/oficial"
UFS = ["ac", "al", "ap", "am", "ba", "ce", "df", "es", "go", "ma", "mt", "ms", "mg", "pa", "pb",
       "pr", "pe", "pi", "rj", "rn", "rs", "ro", "rr", "sc", "sp", "se", "to"]
NUM = {"13": "l", "22": "f"}
NOME = {"LULA": "l", "FLAVIO": "f", "FLÁVIO": "f"}


def url(base, uf):
    return f"{base}/{CICLO}/{ELEICAO}/dados/{uf}/{uf}-c0001-e{ELEICAO:06d}-u.json"


def baixar(u, tentativas=3):
    for i in range(tentativas):
        try:
            req = urllib.request.Request(u, headers={"User-Agent": "rota-das-urnas (github.com/fcarvalhodev/rota-das-urnas)",
                                                     "Cache-Control": "no-cache"})
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.loads(r.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            if e.code == 404:          # ainda não publicado: não insistir (404 repetido pode bloquear o IP)
                return None
            erro = e
        except Exception as e:         # rede, tempo esgotado, JSON quebrado
            erro = e
        time.sleep(2 * (i + 1))
    raise RuntimeError(f"{u}: {erro}")


def num(v):
    """'1.234' / '45,67' / 1234 -> float"""
    if v is None or v == "":
        return None
    if isinstance(v, (int, float)):
        return float(v)
    s = str(v).strip().replace(".", "").replace(",", ".") if "," in str(v) else str(v).strip()
    try:
        return float(s)
    except ValueError:
        return None


def candidatos(obj, achados):
    """Procura em todo o JSON objetos de candidato com votos (vap)."""
    if isinstance(obj, dict):
        if "vap" in obj:
            chave = None
            n = str(obj.get("n", "")).strip()
            if n in NUM:
                chave = NUM[n]
            else:
                nome = " ".join(str(obj.get(k, "")) for k in ("nm", "nmu", "nome")).upper()
                for k, v in NOME.items():
                    if k in nome:
                        chave = v
            if chave and num(obj["vap"]) is not None:
                achados[chave] = int(num(obj["vap"]))
        for v in obj.values():
            candidatos(v, achados)
    elif isinstance(obj, list):
        for v in obj:
            candidatos(v, achados)
    return achados


def pst(js):
    s = js.get("s") if isinstance(js, dict) else None
    if isinstance(s, dict) and s.get("pst") is not None:
        return num(s["pst"])
    if isinstance(js, dict) and js.get("pst") is not None:
        return num(js["pst"])
    return None


def ler(js):
    c = candidatos(js, {})
    if "l" not in c or "f" not in c:
        return None
    out = {"l": c["l"], "f": c["f"]}
    p = pst(js)
    if p is not None:
        out["pst"] = round(p, 2)
    if isinstance(js, dict) and js.get("dg") and js.get("hg"):
        out["tse"] = f'{js["dg"]} {js["hg"]}'
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default=os.environ.get("TSE_BASE", BASE))
    ap.add_argument("--saida", default="dados-tse.json")
    a = ap.parse_args()

    agora = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    antigo = {}
    if os.path.exists(a.saida):
        with open(a.saida, encoding="utf-8") as f:
            antigo = json.load(f)

    novo = {"eleicao": ELEICAO, "fonte": url(BASE, "br"), "verificado": agora,
            "brasil": None, "estados": {}, "exterior": None, "final": False, "erros": []}

    try:
        br = baixar(url(a.base, "br"))
    except Exception as e:
        br = None
        novo["erros"].append(str(e))
    novo["brasil"] = ler(br) if br else None

    if novo["brasil"]:                 # só busca as UFs depois que o Brasil começou a sair
        for uf in UFS + ["zz"]:
            try:
                js = baixar(url(a.base, uf))
                r = ler(js) if js else None
            except Exception as e:
                novo["erros"].append(str(e))
                r = None
            if r is None and uf.upper() in antigo.get("estados", {}):
                r = antigo["estados"][uf.upper()]      # mantém o último número bom
            if uf == "zz":
                novo["exterior"] = r or antigo.get("exterior")
            elif r:
                novo["estados"][uf.upper()] = r
            time.sleep(0.2)            # bem abaixo do limite de 100 req/s do TSE
    else:
        for k in ("brasil", "estados", "exterior"):   # nada novo: mantém o que já tinha
            if antigo.get(k):
                novo[k] = antigo[k]

    b = novo["brasil"]
    novo["final"] = bool(b and b.get("pst") is not None and b["pst"] >= 100
                         and len(novo["estados"]) == 27
                         and all(e.get("pst", 0) >= 100 for e in novo["estados"].values()))
    if b and novo["estados"]:
        soma_l = sum(e["l"] for e in novo["estados"].values()) + ((novo["exterior"] or {}).get("l") or 0)
        soma_f = sum(e["f"] for e in novo["estados"].values()) + ((novo["exterior"] or {}).get("f") or 0)
        novo["confere"] = {"l": soma_l - b["l"], "f": soma_f - b["f"]}   # deve dar 0 quando tudo estiver completo

    mudou = {k: v for k, v in novo.items() if k != "verificado"} != {k: v for k, v in antigo.items() if k != "verificado"}
    novo["mudou_em"] = agora if mudou or "mudou_em" not in antigo else antigo["mudou_em"]
    with open(a.saida, "w", encoding="utf-8") as f:
        json.dump(novo, f, ensure_ascii=False, indent=1)
        f.write("\n")
    pb = b["pst"] if b else None
    print(f"verificado {agora} · Brasil {'%s%% apurado' % pb if pb is not None else 'ainda sem dados'} · "
          f"{len(novo['estados'])} UFs · final={novo['final']} · erros={len(novo['erros'])}")
    if "GITHUB_OUTPUT" in os.environ:
        with open(os.environ["GITHUB_OUTPUT"], "a") as f:
            f.write(f"final={'true' if novo['final'] else 'false'}\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
