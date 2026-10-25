# Rota das Urnas

1º turno × 2º turno da eleição para presidente de 2026: o que mudou e o que ficou igual, região por região e país por país.

Site: https://fcarvalhodev.github.io/rota-das-urnas/

O site é uma navegação em camadas: Início → Brasil → região → estado, ou Início → Exterior → país → cidade. Qualquer número fica a no máximo 3 cliques, e os endereços (`#/brasil/nordeste/BA`, `#/exterior/japao/toquio`) podem ser compartilhados.

Todos os números ficam em `dados.js`. Para atualizar, preencha `t2` (2º turno) de cada estado, país ou cidade com `{f, l}` (votos de Flávio e de Lula) e ajuste o `status`. Regiões e Brasil são somados automaticamente quando todos os estados têm `t2`. O site recalcula as etiquetas e o mapa sozinho.

Faz parte da série [Rotas](https://fcarvalhodev.github.io/rotas/).

## Atualização automática (TSE)

A GitHub Action `.github/workflows/atualizar.yml` roda no minuto 5 de toda hora. Ela usa `scripts/atualizar_tse.py`, que busca o 2º turno para presidente (eleição 6258) direto do TSE: Brasil, 27 estados e exterior. O resultado vai para `dados-tse.json`.

O site lê esse arquivo e mostra no topo um contador até a próxima busca. Quando o contador zera, o site busca os dados novos sozinho. Se o TSE chegar a 100%, ou depois de 27/10/2026, a Action se desliga sozinha.

Para rodar na hora: aba **Actions → Atualizar apuração (TSE) → Run workflow**.
