/* Rota das Urnas: todos os números do site ficam aqui.
   f = votos de Flávio Bolsonaro (PL) · l = votos de Lula (PT)
   t1 = 1º turno (4/10) · t2 = 2º turno (25/10). t2: null = "aguardando".
   status: "doc" Documentado (TSE, resultado completo) · "aberto" Em aberto (parcial / soma de boletins)
           · "calc" Calculado (conta feita aqui a partir de outros números) · "alegacao" ainda sem confirmação.
   Para atualizar: preencha t2 = {f, l} e troque o status. O site recalcula tudo sozinho. */
window.URNAS = {
  atualizado: "26/10/2026 · 2h55 no Japão · 14h55 em Brasília (exterior: parcial das 13h54)",
  aviso: "Exterior: Ásia, Oceania, Oriente Médio, África e parte da Europa já apurados por boletim de urna. Portugal, Américas e o resto da Europa ainda estão votando ou contando. O TSE divulga tudo a partir das 17h de Brasília (5h de segunda no Japão).",

  brasil: {
    t1: { f: 56104503, l: 53879538, validos: 119300788 }, t2: null,
    outros: [["Augusto Cury (Avante)", 3448569], ["Renan Santos (Missão)", 2675887], ["Ronaldo Caiado (PSD)", 2605148],
             ["Romeu Zema (Novo)", 326488], ["Samara Martins (UP)", 122911], ["Outros 5 candidatos", 137744]]
  },

  /* 1º turno por estado: votos e % dos válidos (TSE, 100% apurado). x,y = posição no mapa de quadradinhos. */
  regioes: [
    { id: "norte", nome: "Norte", t2: null, estados: [
      { uf: "AC", nome: "Acre",      x: 1, y: 2, t1: { f: 302807,  fp: 64.56, l: 134770,  lp: 28.73 }, t2: null },
      { uf: "AP", nome: "Amapá",     x: 3, y: 0, t1: { f: 212278,  fp: 45.67, l: 212503,  lp: 45.71 }, t2: null },
      { uf: "AM", nome: "Amazonas",  x: 2, y: 1, t1: { f: 976764,  fp: 45.00, l: 1046996, lp: 48.23 }, t2: null },
      { uf: "PA", nome: "Pará",      x: 3, y: 1, t1: { f: 2163957, fp: 44.50, l: 2427237, lp: 49.91 }, t2: null },
      { uf: "RO", nome: "Rondônia",  x: 2, y: 2, t1: { f: 652988,  fp: 67.45, l: 250667,  lp: 25.89 }, t2: null },
      { uf: "RR", nome: "Roraima",   x: 2, y: 0, t1: { f: 231322,  fp: 71.06, l: 74420,   lp: 22.86 }, t2: null },
      { uf: "TO", nome: "Tocantins", x: 3, y: 2, t1: { f: 469321,  fp: 50.44, l: 404009,  lp: 43.42 }, t2: null } ] },
    { id: "nordeste", nome: "Nordeste", t2: null, estados: [
      { uf: "AL", nome: "Alagoas",             x: 6, y: 3, t1: { f: 735718,  fp: 40.45, l: 995459,  lp: 54.73 }, t2: null },
      { uf: "BA", nome: "Bahia",               x: 4, y: 3, t1: { f: 2442585, fp: 28.53, l: 5664771, lp: 66.17 }, t2: null },
      { uf: "CE", nome: "Ceará",               x: 5, y: 1, t1: { f: 1756850, fp: 31.27, l: 3555263, lp: 63.29 }, t2: null },
      { uf: "MA", nome: "Maranhão",            x: 4, y: 1, t1: { f: 1239040, fp: 30.90, l: 2566301, lp: 63.99 }, t2: null },
      { uf: "PB", nome: "Paraíba",             x: 6, y: 2, t1: { f: 831377,  fp: 33.07, l: 1541127, lp: 61.31 }, t2: null },
      { uf: "PE", nome: "Pernambuco",          x: 5, y: 2, t1: { f: 1738043, fp: 31.03, l: 3553971, lp: 63.45 }, t2: null },
      { uf: "PI", nome: "Piauí",               x: 4, y: 2, t1: { f: 517028,  fp: 24.09, l: 1523710, lp: 70.99 }, t2: null },
      { uf: "RN", nome: "Rio Grande do Norte", x: 6, y: 1, t1: { f: 720493,  fp: 34.77, l: 1237963, lp: 59.75 }, t2: null },
      { uf: "SE", nome: "Sergipe",             x: 5, y: 3, t1: { f: 417839,  fp: 30.63, l: 856019,  lp: 62.75 }, t2: null } ] },
    { id: "centro-oeste", nome: "Centro-Oeste", t2: null, estados: [
      { uf: "DF", nome: "Distrito Federal",   x: 3, y: 4, t1: { f: 909616,  fp: 51.31, l: 675627,  lp: 38.11 }, t2: null },
      { uf: "GO", nome: "Goiás",              x: 3, y: 3, t1: { f: 2051888, fp: 53.60, l: 1188880, lp: 31.06 }, t2: null },
      { uf: "MT", nome: "Mato Grosso",        x: 2, y: 3, t1: { f: 1298581, fp: 65.15, l: 581681,  lp: 29.18 }, t2: null },
      { uf: "MS", nome: "Mato Grosso do Sul", x: 2, y: 4, t1: { f: 873351,  fp: 58.60, l: 516855,  lp: 34.68 }, t2: null } ] },
    { id: "sudeste", nome: "Sudeste", t2: null, estados: [
      { uf: "ES", nome: "Espírito Santo", x: 5, y: 4, t1: { f: 1233194,  fp: 54.78, l: 850028,  lp: 37.76 }, t2: null },
      { uf: "MG", nome: "Minas Gerais",   x: 4, y: 4, t1: { f: 5777548,  fp: 48.24, l: 5188936, lp: 43.33 }, t2: null },
      { uf: "RJ", nome: "Rio de Janeiro", x: 4, y: 5, t1: { f: 4966844,  fp: 53.01, l: 3693021, lp: 39.41 }, t2: null },
      { uf: "SP", nome: "São Paulo",      x: 3, y: 5, t1: { f: 12922023, fp: 51.93, l: 9505413, lp: 38.20 }, t2: null } ] },
    { id: "sul", nome: "Sul", t2: null, estados: [
      { uf: "PR", nome: "Paraná",            x: 2, y: 5, t1: { f: 3945345, fp: 59.91, l: 2054597, lp: 31.20 }, t2: null },
      { uf: "RS", nome: "Rio Grande do Sul", x: 2, y: 7, t1: { f: 3573783, fp: 55.64, l: 2294759, lp: 35.73 }, t2: null },
      { uf: "SC", nome: "Santa Catarina",    x: 2, y: 6, t1: { f: 3000020, fp: 66.65, l: 1127168, lp: 25.04 }, t2: null } ] }
  ],

  exterior: {
    t1: { f: 143900, l: 157387, fp: 43.49, lp: 47.57 },
    t2: { f: 39156, l: 29864, parcial: true },
    t2nota: "Soma parcial de 41 países e territórios já contados por boletim de urna, às 13h54 de Brasília (Congresso em Foco). Ainda faltam Portugal, Espanha, Itália, Reino Unido, Suíça, Américas e a maior parte da Alemanha e da França.",
    paises: [
      /* ---------- Ásia ---------- */
      { id: "japao", nome: "Japão", cont: "Ásia", eleitores: 88293, status: "aberto",
        t1: { f: 24601, l: 5234 }, t2: { f: 28538, l: 7098 },
        nota: "3º maior eleitorado brasileiro fora do país. Total do 2º turno confere em três fontes (CNN, Metrópoles, Revista Fórum): 119 de 119 urnas.",
        cidades: [
          { id: "nagoia", nome: "Nagoia", t1: { f: 11480, l: 2022 }, t2: { f: 13284, l: 2877 }, status: "aberto", nota: "58 boletins, todos os da jurisdição (inclui Toyohashi). 2º turno: soma de boletins publicada por um blog (Jair Sampaio), ainda não confirmada por fonte grande." },
          { id: "toquio", nome: "Tóquio (com Oizumi)", t1: { f: 8423, l: 2328 }, t2: { f: 9770, l: 2995 }, status: "calc", nota: "Jurisdição de Tóquio: 43 urnas, 26 na cidade de Tóquio (Ariake) e 17 em Oizumi (Gunma). 1º turno: Exame, por jurisdição; só a cidade de Tóquio teve Flávio 3.941 × Lula 1.418 (Alternativa). 2º turno: nenhuma fonte grande publicou Tóquio separado, então este número é uma CONTA: total do Japão (CNN, Metrópoles) menos Nagoia e Hamamatsu (blog Jair Sampaio). As urnas batem (58 + 18 + 43 = 119), mas pode ficar um pouco diferente do número oficial do TSE." },
          { id: "hamamatsu", nome: "Hamamatsu", t1: { f: 4698, l: 884 }, t2: { f: 5484, l: 1226 }, status: "aberto", nota: "18 boletins, o mesmo número do 1º turno. 2º turno: soma de boletins publicada por um blog (Jair Sampaio), ainda não confirmada por fonte grande." } ] },
      { id: "china", nome: "China", cont: "Ásia", status: "aberto",
        t1: { f: 203, l: 367 }, t2: { f: 267, l: 502 },
        nota: "Inclui Hong Kong. Atenção: o 1º turno é a soma dos boletins divulgados no dia, e o 2º vem de outra fonte, que pode não ter as mesmas urnas. Trate a comparação como aproximada.",
        cidades: [
          { id: "continental", nome: "China continental", t1: { f: 98, l: 268 }, t2: { f: 134, l: 375 }, status: "calc", nota: "Pequim, Xangai e Cantão. Calculado: China menos Hong Kong." },
          { id: "hong-kong", nome: "Hong Kong", t1: { f: 105, l: 99 }, t2: { f: 133, l: 127 }, status: "aberto" } ] },
      { id: "coreia-do-sul", nome: "Coreia do Sul", cont: "Ásia", status: "doc", t1: { f: 72, l: 123 }, t2: { f: 82, l: 148 }, nota: "Seul, apuração concluída." },
      { id: "taiwan", nome: "Taiwan", cont: "Ásia", status: "aberto", t1: { f: 107, l: 77 }, t2: { f: 130, l: 94 } },
      { id: "filipinas", nome: "Filipinas", cont: "Ásia", status: "aberto", t1: { f: 33, l: 26 }, t2: { f: 39, l: 27 } },
      { id: "tailandia", nome: "Tailândia", cont: "Ásia", status: "aberto", t1: { f: 51, l: 40 }, t2: { f: 60, l: 56 } },
      { id: "singapura", nome: "Singapura", cont: "Ásia", status: "aberto", t1: null, t2: { f: 121, l: 213 }, nota: "Sem o número exato do 1º turno nas fontes (Lula teve 54,6%)." },
      { id: "malasia", nome: "Malásia", cont: "Ásia", status: "aberto", t1: null, t2: { f: 44, l: 41 }, nota: "No 1º turno as fontes só trazem os 44 votos de Lula (53,7%)." },
      { id: "indonesia", nome: "Indonésia", cont: "Ásia", status: "aberto", t1: null, t2: { f: 23, l: 15 }, nota: "No 1º turno as fontes só trazem os 19 votos de Flávio (61,3%)." },
      /* ---------- Oriente Médio (2º turno: boletins, Congresso em Foco, 13h54) ---------- */
      { id: "libano", nome: "Líbano", cont: "Oriente Médio", status: "aberto", t1: { f: 1138, l: 2538 }, t2: { f: 1276, l: 2736 }, nota: "13 de 13 urnas." },
      { id: "catar", nome: "Catar", cont: "Oriente Médio", status: "aberto", t1: { f: 173, l: 147 }, t2: { f: 195, l: 159 }, nota: "Doha, 1 urna." },
      { id: "israel", nome: "Israel", cont: "Oriente Médio", status: "aberto", t1: null, t2: { f: 699, l: 166 }, nota: "5 de 5 urnas. Sem o número exato do 1º turno nas fontes consultadas (Flávio teve 74,3%)." },
      { id: "palestina", nome: "Palestina", cont: "Oriente Médio", status: "aberto", t1: null, t2: { f: 46, l: 1000 }, nota: "3 de 3 urnas. Sem o número exato do 1º turno nas fontes consultadas (Lula teve 93,2%)." },
      { id: "jordania", nome: "Jordânia", cont: "Oriente Médio", status: "aberto", t1: null, t2: { f: 76, l: 725 }, nota: "2 de 2 urnas. Sem o número exato do 1º turno nas fontes consultadas (Lula teve 86,2%)." },
      /* ---------- África ---------- */
      { id: "africa-do-sul", nome: "África do Sul", cont: "África", status: "aberto", t1: null, t2: { f: 256, l: 186 }, nota: "2 de 2 urnas. Sem o número exato do 1º turno nas fontes consultadas (Flávio teve 54,9%)." },
      { id: "quenia", nome: "Quênia", cont: "África", status: "aberto", t1: { f: 17, l: 26 }, t2: { f: 16, l: 29 }, nota: "Nairóbi, 1 urna." },
      { id: "emirados", nome: "Emirados Árabes Unidos", cont: "Oriente Médio", status: "aberto",
        t1: { f: 659, l: 512 }, t2: { f: 772, l: 643 }, nota: "Dubai e Abu Dhabi. 2º turno: soma dos boletins publicada às 11h de Brasília." },
      /* ---------- Oceania ---------- */
      { id: "australia", nome: "Austrália", cont: "Oceania", eleitores: 20274, status: "aberto",
        t1: { f: 2579, l: 4562 }, t2: { f: 3465, l: 6017 }, nota: "2º turno: soma dos boletins (Metrópoles).",
        cidades: [
          { id: "sydney", nome: "Sydney", t1: { f: 1774, l: 3084 }, t2: null, status: "aberto" },
          { id: "camberra", nome: "Camberra", t1: { f: 805, l: 1478 }, t2: null, status: "aberto" } ] },
      { id: "nova-zelandia", nome: "Nova Zelândia", cont: "Oceania", status: "aberto", t1: { f: 64, l: 234 }, t2: { f: 101, l: 418 }, nota: "Wellington. Primeiro país a fechar as urnas." },
      /* ---------- Américas ---------- */
      { id: "estados-unidos", nome: "Estados Unidos", cont: "Américas", eleitores: 265022, status: "doc",
        t1: { f: 45004, l: 23335 }, t2: null, nota: "Maior eleitorado brasileiro fora do país.",
        cidades: [
          { id: "boston", nome: "Boston", t1: { f: 11228, l: 3919 }, t2: null },
          { id: "miami", nome: "Miami", t1: { f: 8914, l: 2260 }, t2: null },
          { id: "orlando", nome: "Orlando", t1: { f: 6981, l: 1332 }, t2: null },
          { id: "nova-york", nome: "Nova York", t1: { f: 4684, l: 4570 }, t2: null },
          { id: "atlanta", nome: "Atlanta", t1: { f: 3276, l: 1221 }, t2: null },
          { id: "houston", nome: "Houston", t1: { f: 2586, l: 1265 }, t2: null },
          { id: "los-angeles", nome: "Los Angeles", t1: { f: 1994, l: 2131 }, t2: null },
          { id: "washington", nome: "Washington", t1: { f: 1858, l: 2419 }, t2: null },
          { id: "sao-francisco", nome: "São Francisco", t1: { f: 1323, l: 2176 }, t2: null },
          { id: "hartford", nome: "Hartford", t1: { f: 1207, l: 557 }, t2: null },
          { id: "chicago", nome: "Chicago", t1: { f: 953, l: 1485 }, t2: null } ] },
      { id: "canada", nome: "Canadá", cont: "Américas", eleitores: 46345, status: "doc", t1: { f: 7043, l: 12508 }, t2: null,
        cidades: [
          { id: "toronto", nome: "Toronto", t1: { f: 3319, l: 4670 }, t2: null },
          { id: "montreal", nome: "Montreal", t1: { f: 1456, l: 3823 }, t2: null },
          { id: "vancouver", nome: "Vancouver", t1: { f: 1873, l: 3221 }, t2: null },
          { id: "ottawa", nome: "Ottawa", t1: { f: 395, l: 794 }, t2: null } ] },
      /* ---------- Europa ---------- */
      { id: "austria", nome: "Áustria", cont: "Europa", status: "aberto", t1: { f: 311, l: 979 }, t2: { f: 393, l: 1178 }, nota: "Viena, 5 de 5 urnas." },
      { id: "dinamarca", nome: "Dinamarca", cont: "Europa", status: "aberto", t1: { f: 195, l: 1166 }, t2: { f: 243, l: 1383 }, nota: "Copenhague, 4 de 4 urnas." },
      { id: "finlandia", nome: "Finlândia", cont: "Europa", status: "aberto", t1: null, t2: { f: 185, l: 550 }, nota: "Helsinque, 2 de 2 urnas. Sem o número exato do 1º turno nas fontes consultadas (Lula teve 68,5%)." },
      { id: "grecia", nome: "Grécia", cont: "Europa", status: "aberto", t1: null, t2: { f: 311, l: 255 }, nota: "Atenas, 2 de 2 urnas. No 1º turno, Flávio teve 230 votos (46,6%); o número exato de Lula não está nas fontes." },
      { id: "portugal", nome: "Portugal", cont: "Europa", eleitores: 134374, status: "doc", t1: { f: 19412, l: 26401 }, t2: null, nota: "2º maior eleitorado brasileiro fora do país.",
        cidades: [
          { id: "lisboa", nome: "Lisboa", t1: { f: 10548, l: 14948 }, t2: null },
          { id: "porto", nome: "Porto", t1: { f: 7559, l: 10356 }, t2: null },
          { id: "faro", nome: "Faro", t1: { f: 1305, l: 1097 }, t2: null } ] },
      { id: "alemanha", nome: "Alemanha", cont: "Europa", eleitores: 41401, status: "aberto", t1: { f: 3532, l: 13525 }, t2: { f: 601, l: 2147, pst: 12.9 }, nota: "2º turno: só 8 de 62 urnas contadas às 13h54 de Brasília. Não dá para comparar com o 1º turno ainda.",
        cidades: [
          { id: "berlim", nome: "Berlim", t1: { f: 925, l: 6504 }, t2: null },
          { id: "frankfurt", nome: "Frankfurt", t1: { f: 1320, l: 3657 }, t2: null },
          { id: "munique", nome: "Munique", t1: { f: 1287, l: 3364 }, t2: null } ] },
      { id: "reino-unido", nome: "Reino Unido", cont: "Europa", eleitores: 41895, status: "doc", t1: { f: 5366, l: 8640 }, t2: null,
        cidades: [
          { id: "londres", nome: "Londres", t1: { f: 5227, l: 8152 }, t2: null },
          { id: "edimburgo", nome: "Edimburgo", t1: { f: 139, l: 488 }, t2: null } ] },
      { id: "espanha", nome: "Espanha", cont: "Europa", eleitores: 40718, status: "doc", t1: { f: 3338, l: 7263 }, t2: null,
        cidades: [
          { id: "madri", nome: "Madri", t1: { f: 2343, l: 3571 }, t2: null },
          { id: "barcelona", nome: "Barcelona", t1: { f: 995, l: 3692 }, t2: null } ] },
      { id: "italia", nome: "Itália", cont: "Europa", eleitores: 38747, status: "doc", t1: { f: 4386, l: 6148 }, t2: null,
        cidades: [
          { id: "milao", nome: "Milão", t1: { f: 2908, l: 3593 }, t2: null },
          { id: "roma", nome: "Roma", t1: { f: 1478, l: 2555 }, t2: null } ] },
      { id: "franca", nome: "França", cont: "Europa", eleitores: 32744, status: "aberto", t1: { f: 2276, l: 9253 }, t2: { f: 112, l: 929, pst: 10.5 },
        nota: "2º turno: só 4 de 38 urnas contadas às 13h54 de Brasília; não dá para comparar ainda. O 1º turno inclui Caiena (Guiana Francesa).",
        cidades: [
          { id: "paris", nome: "Paris", t1: { f: 1654, l: 8054 }, t2: null },
          { id: "marselha", nome: "Marselha", t1: { f: 104, l: 715 }, t2: null },
          { id: "caiena", nome: "Caiena (Guiana Francesa)", t1: { f: 518, l: 484 }, t2: null } ] },
      { id: "suica", nome: "Suíça", cont: "Europa", eleitores: 26982, status: "doc", t1: { f: 4525, l: 5194 }, t2: null,
        cidades: [
          { id: "zurique", nome: "Zurique", t1: { f: 2299, l: 2896 }, t2: null },
          { id: "genebra", nome: "Genebra", t1: { f: 2226, l: 2298 }, t2: null } ] }
    ]
  },

  fontes: [
    ["TSE: resultados oficiais", "https://resultados.tse.jus.br/oficial/app/index.html"],
    ["TSE: votação nominal do 1º turno", "https://sig.tse.jus.br/ords/dwapr/r/seai/sig-eleicao-resultados/resultado-da-elei%C3%A7%C3%A3o"],
    ["Hub Político: 1º turno por estado (dados do TSE)", "https://hubpolitico.com.br/eleicoes/2026/apuracao/presidente/estados"],
    ["Hub Político: 1º turno por região", "https://hubpolitico.com.br/eleicoes/2026/apuracao/presidente/regioes"],
    ["Elves: 1º turno por país e cidade (dados do TSE)", "https://elves.com.br/apuracao-eleitoral/paises/"],
    ["Congresso em Foco: 41 países no 2º turno, 13h54", "https://www.congressoemfoco.com.br/noticia/123603/primeiras-urnas-sao-apuradas-no-exterior-acompanhe-os-resultados"],
    ["Elves: Líbano, Áustria, Dinamarca e Catar no 1º turno", "https://elves.com.br/apuracao-eleitoral/paises/"],
    ["Brasil 247: Emirados Árabes no 2º turno", "https://www.brasil247.com/mundo/eleicoes-no-exterior-flavio-bolsonaro-vence-o-2o-turno-nos-emirados-arabes-unidos/"],
    ["Exame: 2º turno no exterior, parcial das 10h", "https://exame.com/brasil/lula-ou-flavio-bolsonaro-quem-esta-ganhando-no-exterior-no-2o-turno-das-eleicoes/"],
    ["Metrópoles: 2º turno no exterior, parcial das 8h", "https://www.metropoles.com/mundo/votacao-no-exterior-lula-sai-na-frente-de-flavio-em-apuracao-parcial"],
    ["CNN: 2º turno no exterior por país", "https://www.cnnbrasil.com.br/internacional/eleicoes-2026-exterior-boletins-urna-flavio-lula/"],
    ["CNN: Coreia do Sul", "https://www.cnnbrasil.com.br/eleicoes/na-coreia-do-sul-lula-tem-643-no-2o-turno-flavio-356/"],
    ["Jair Sampaio: Nagoia e Hamamatsu no 2º turno", "https://www.jairsampaio.com/flavio-bolsonaro-amplia-votacao-no-japao-e-supera-81-dos-votos-validos-em-hamamatsu-e-nagoya-no-2o-turno/"],
    ["Alternativa: cidade de Tóquio e Toyohashi no 1º turno", "https://alternativa.co.jp/noticias/comunidade/199632/flavio-bolsonaro-obtem-6380-dos-votos-em-toquio-e-7351-em-toyohashi-apontam-boletins-de-urna/"],
    ["Metrópoles: Japão no 2º turno", "https://www.metropoles.com/mundo/flavio-bolsonaro-vence-lula-no-japao-no-2o-turno-das-eleicoes"],
    ["Revista Fórum: Lula no Japão", "https://revistaforum.com.br/politica/lula-no-japao-recorde-votos-2026/"],
    ["Exame: Japão por jurisdição no 1º turno", "https://exame.com/brasil/eleicoes-2026-flavio-bolsonaro-lidera-no-japao-com-67-dos-votos/"],
    ["Portal Mie: Japão e China no 1º turno", "https://portalmie.com/atualidade/2026/10/eleicoes-2026-veja-como-brasileiros-votaram-no-japao-e-pelo-mundo/"],
    ["Metrópoles: Taiwan e Ásia no 1º turno", "https://www.metropoles.com/mundo/brasileiros-votam-o-exterior"],
    ["Exame: Hong Kong, Tailândia e Filipinas no 1º turno", "https://exame.com/brasil/votacao-para-presidente-no-exterior-veja-quem-venceu-no-japao-china-e-nova-zelandia/"]
  ]
};
