# Documentos legais — Planner TDAH v1

> **Documento vivo · Versão 1.0 · 2026-05-12**
> **Ticket:** [KAN-9 / FOUNDATION-3](https://the-abib-company.atlassian.net/browse/KAN-9)
> **Status:** Aprovado — textos prontos para publicação após FUNNEL-1 (rotas) e FUNNEL-7 (domínio)
> **Dependência:** [`../oferta-mvp.md`](../oferta-mvp.md) (FOUNDATION-1), [`../posicionamento-etico.md`](../posicionamento-etico.md) (FOUNDATION-2)
> **Bloqueia:** KAN-44 (ACQ-11 — gate pré-tráfego pago, critério L1)

---

## O que está aqui

Três documentos legais que precisam estar publicados como rotas na aplicação Vite **antes** de qualquer venda real ou de subir tráfego pago:

| Arquivo | Rota futura | Lei aplicável | Exigido por |
|---|---|---|---|
| [`termos-de-uso.md`](termos-de-uso.md) | `/termos-de-uso` | CDC (Lei 8.078/1990) | Kiwify, CDC |
| [`politica-privacidade.md`](politica-privacidade.md) | `/politica-de-privacidade` | LGPD (Lei 13.709/2018) | LGPD, Kiwify |
| [`politica-reembolso.md`](politica-reembolso.md) | `/politica-de-reembolso` | CDC art. 49 | Kiwify, CDC |

## ⚠️ Alertas importantes

### 1. Texto gerado com apoio de IA — revisar antes de publicar

Estes documentos foram redigidos por Claude (Opus 4.7) com base em:
- A operação real descrita em `foundation/oferta-mvp.md`
- Os dados realmente coletados (e-mail no checkout via Kiwify, eventos PostHog, UTMs)
- As exigências mínimas de LGPD e CDC para infoproduto digital no Brasil

**Antes de publicar em produção, Rodrigo deve:**
1. Ler os 3 documentos completos
2. Verificar coerência com sua operação fiscal real (Pessoa Física na Kiwify na v1)
3. Confirmar dados de contato (e-mail de contato + endereço se obrigatório)
4. Considerar revisão por advogado especializado em LGPD se passar de R$ 5k/mês de receita

### 2. Placeholders que precisam ser substituídos antes do deploy

Em **todos os 3 documentos**, os seguintes campos estão como placeholder `[...]` e precisam ser preenchidos:

- `[NOME COMPLETO]` — nome civil do controlador de dados (provavelmente Rodrigo Carvalho Abib)
- `[CPF/CNPJ]` — CPF até migrar para MEI/PJ
- `[E-MAIL DE CONTATO]` — sugestão: `contato@planner-tdah.com.br` ou similar após registro do domínio
- `[E-MAIL DE PRIVACIDADE]` — sugestão: `privacidade@planner-tdah.com.br` (pode ser o mesmo)
- `[CIDADE/UF]` — cidade da pessoa física (necessário para foro de litígio)
- `[URL DO SITE]` — após FUNNEL-7

Recomendação: substituir todos os `[...]` numa única passada antes de ligar as rotas na app.

### 3. Versionamento e atualização

Toda alteração nestes documentos:
1. Deve incrementar versão e data no cabeçalho de cada arquivo
2. Deve atualizar o histórico de revisões no rodapé do arquivo modificado
3. Deve gerar commit separado (`[KAN-9] legal: atualiza X em [doc]`)
4. Se for alteração material (não só ortografia), notificar usuários existentes por e-mail

### 4. Como ligar nas rotas da app (referência para FUNNEL-1)

Quando FUNNEL-1 (KAN-13) introduzir `react-router-dom`, os documentos `.md` desta pasta serão convertidos em páginas:

- Opção A: importar como string e renderizar com `react-markdown` (preferida — fonte única de verdade)
- Opção B: copiar conteúdo para `quiz/src/pages/Termos.jsx` etc. (maior controle visual, duplicação)

Recomendação: opção A para v1 (menos esforço, menos drift). Opção B fica para v1.5 se precisar de design custom.

### 5. Links no rodapé

Após publicação, os 3 links devem aparecer no rodapé de **quiz** e **landing** (critério de aceite do ticket KAN-9):

```html
<footer>
  <a href="/termos-de-uso">Termos de Uso</a> ·
  <a href="/politica-de-privacidade">Privacidade</a> ·
  <a href="/politica-de-reembolso">Reembolso</a>
</footer>
```

---

## Histórico de revisões (índice)

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-05-12 | 1.0 | Criação inicial dos 3 documentos legais | Rodrigo Abib + Claude (Opus 4.7) |

---

**Fim do README.** Os 3 documentos legais estão em arquivos separados nesta pasta.
