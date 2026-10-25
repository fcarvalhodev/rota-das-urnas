# Rota das Urnas

1º turno × 2º turno da eleição para presidente de 2026: o que mudou e o que ficou igual, região por região e país por país.

Site: https://fcarvalhodev.github.io/rota-das-urnas/

O site é uma navegação em camadas: Início → Brasil → região → estado, ou Início → Exterior → país → cidade. Qualquer número fica a no máximo 3 cliques, e os endereços (`#/brasil/nordeste/BA`, `#/exterior/japao/toquio`) podem ser compartilhados.

Todos os números ficam em `dados.js`. Para atualizar, preencha `t2` (2º turno) de cada estado, país ou cidade com `{f, l}` (votos de Flávio e de Lula) e ajuste o `status`. Regiões e Brasil são somados automaticamente quando todos os estados têm `t2`. O site recalcula as etiquetas e o mapa sozinho.

Faz parte da série [Rotas](https://fcarvalhodev.github.io/rotas/).
