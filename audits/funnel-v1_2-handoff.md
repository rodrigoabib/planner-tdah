# Re-auditoria instrumentada do funil — v1.2

> **Ticket:** [KAN-133 / FUNNEL-11](https://the-abib-company.atlassian.net/browse/KAN-133)
> **Status:** Entregue — Em análise · 2026-06-11
> **Origem:** item B-03 / N-3 do plano estratégico `research/outputs/06_plano_estrategico_proximas_acoes_planner_tdah.md` (§10)
> **Dependências:** executada **após** KAN-132 (commit `e07a54d` — disclaimers canônicos + rodapé legal), auditando o estado final
> **Alimenta:** itens F1 (mobile), F2 (teclado) e L2 (disclaimers AA) do gate ACQ-11 (KAN-44/KAN-114)
> **Auditorias anteriores:** `quiz-tdah-v1_1-handoff.md` (2026-05-04), `ux-ui-adhd-funnel-audit-2026-05-09.md` — ambas anteriores à Landing por arquétipo, CouponCountdown, Obrigado, MethodSection e rotas legais

---

## Sumário

1. [Resultado em uma linha](#1-resultado-em-uma-linha)
2. [Método e cobertura](#2-método-e-cobertura)
3. [Resultados axe-core](#3-resultados-axe-core)
4. [Navegação por teclado end-to-end](#4-navegação-por-teclado-end-to-end)
5. [Estados do cupom](#5-estados-do-cupom)
6. [Achados e correções desta auditoria](#6-achados-e-correções-desta-auditoria)
7. [Evidências arquivadas](#7-evidências-arquivadas)
8. [Limites do que foi validado](#8-limites-do-que-foi-validado)
9. [Histórico de revisões](#9-histórico-de-revisões)

---

## 1. Resultado em uma linha

**Zero violações axe (critical/serious/moderate/minor) em todas as 38 varreduras; quiz completável só com teclado da intro ao resultado; estados de cupom válido/expirado funcionando; 0 erros de console.** Os itens F1/F2/L2 do gate ACQ-11 ganham evidência fresca e arquivada.

## 2. Método e cobertura

- **Engine:** axe-core (tags `wcag2a` + `wcag2aa`) via `@axe-core/playwright` (AxeBuilder), Chromium headless.
- **Scripts:** `run-funnel-audit.js` (novo, cobre o funil completo) + `run-a11y-audit.js` (canônico, corrigido — ver §6.1). Ambos em `.agents/skills/tdah-ux-audit/scripts/`. Sem dependências novas.
- **App:** vite dev server local, código do commit `e07a54d` (pós-KAN-132).

| Tela | Viewports axe | Como foi alcançada |
|---|---|---|
| `/` (intro do quiz) | 320 / 390 / 768 / 1280 | navegação direta |
| Q1 | 320 / 390 / 768 / 1280 | clique em "Descobrir meu padrão" |
| Marco 2 (radar parcial) | 320 / 1280 | fluxo real: 10 perguntas respondidas |
| Resultado (arquétipo + CTA) | 320 / 1280 | fluxo real: 15 perguntas + processing |
| `/planner/furacao` sem cupom | 320 / 390 / 768 / 1280 | navegação direta (sem sessão) |
| `/planner/furacao` cupom **válido** | 320 / 1280 | sessão real gerada pelo próprio quiz |
| `/planner/furacao` cupom **expirado** | 320 / 1280 | `quizCouponSession` com `expiresAt` no passado + reload |
| `/obrigado` | 320 / 390 / 768 / 1280 | navegação direta |
| `/termos-de-uso`, `/politica-de-privacidade`, `/politica-de-reembolso` | 320 / 390 / 768 / 1280 | navegação direta |

## 3. Resultados axe-core

| Impacto | Quantidade |
|---|---|
| 🔴 Critical | **0** |
| 🟠 Serious | **0** |
| 🟡 Moderate | **0** |
| ⚪ Minor | **0** |

Detalhe por varredura em `audits/funnel-v1_2-axe-results.json` (38 scans, todos com `count: 0`). O script canônico (`run-a11y-audit.js`, intro+Q1 nos 4 viewports, incluindo `prefers-reduced-motion`) também fechou em 0 após a correção da API (§6.1).

Nota: o axe marca como "incomplete" (não-violação) o texto sobreposto ao gradiente do cabeçalho do resultado — contraste sobre gradiente não é computável automaticamente. Verificação manual: os tokens usados (`#9892C4`, `#C4BFF0` sobre `#0A0818`/`#120F2D`) ficam entre 6.4:1 e 9:1.

## 4. Navegação por teclado end-to-end

Percurso completo **usando apenas teclado** (1280px): Tab → Enter no botão de início → para cada uma das 15 perguntas: foco automático na primeira opção (KAN-18) → Space seleciona → "Próxima pergunta" recebe foco automático → Enter → nos marcos 1 e 2, Tab até o botão de continuar → Enter → resultado renderizado com `#result-cta` visível.

- **Resultado: ✅ completável** — evidência: `audits/screenshots/funnel-v1_2/teclado-resultado-1280.png`.
- Observação registrada (não bloqueante, severidade baixa): nos cards de marco, o botão de continuar **não** recebe foco automático — o usuário de teclado precisa de 1-2 Tabs. Funciona e é alcançável; se quiser polir, autofocus no botão do marco é mudança de 3 linhas (mesmo padrão do `nextRef` das perguntas). Candidato a P3/v1.5, não ao gate.

## 5. Estados do cupom

| Estado | Verificação | Resultado |
|---|---|---|
| Válido (sessão real do quiz) | countdown `role="timer"` visível + preço R$ 29,90 riscando R$ 49,90 | ✅ 320 e 1280 |
| Expirado (timestamp passado) | mensagem "Oferta com cupom expirou." + preço cheio, sem nova janela | ✅ 320 e 1280 |
| Sem sessão (acesso direto) | mensagem de preço regular + link "fazer o quiz" | ✅ 4 viewports |

## 6. Achados e correções desta auditoria

### 6.1 Script canônico de a11y estava quebrado com as dependências do repo (corrigido)

`run-a11y-audit.js` importava `injectAxe`/`getViolations` — API do pacote `axe-playwright`, que **não** está no `package.json` (a dependência real é `@axe-core/playwright`, que expõe `AxeBuilder`). O script falhava com `injectAxe is not a function` em qualquer execução. **Corrigido neste ticket** (helper `collectViolations` com `AxeBuilder`), preservando relatório e exit codes. Implicação: a "última rodada full de 2026-05-09" citada nos handoffs não pode ter usado este script com estas deps — provável execução manual ou ambiente anterior.

### 6.2 Falso positivo de contraste durante animações de entrada (documentado e mitigado)

Escanear a tela de resultado imediatamente quando `#result-cta` aparece flagra `color-contrast` serious em 3 nós — porém os elementos estavam em **opacity parcial de animação** (`rUp`/`fi` 0.4-0.6s + radar ~0.8s). Sonda dedicada (`probe-result-contrast.js`) com 1.5s de settle: **0 violações**. O `run-funnel-audit.js` agora aguarda 1.6s pós-render antes do axe. Lição registrada para futuras auditorias: axe só após animações de entrada.

### 6.3 Sem regressões das correções históricas

Spot-checks visuais nos screenshots: radar parcial do Marco 2 com cadeados nas dimensões bloqueadas (AUD-006 ok), disclaimers canônicos do KAN-132 presentes nas posições exigidas, rodapé legal na intro e no resultado, prova social ausente da landing (regra FOUNDATION-2 §5).

## 7. Evidências arquivadas

- **Screenshots (22):** `audits/screenshots/funnel-v1_2/` — `intro`, `q1`, `marco2`, `resultado`, `landing-sem-cupom`, `landing-cupom-valido`, `landing-cupom-expirado`, `obrigado`, `termos`, `privacidade`, `reembolso`, `teclado-resultado` (320px de todas; 768/1280 das principais). Os 320px servem ao item F1 do gate.
- **Resultados axe (JSON):** `audits/funnel-v1_2-axe-results.json` (38 scans + flag `keyboardEndToEnd: true` + `pageErrors: []`).
- **Relatório do script canônico:** `.agents/quiz/audits/a11y-report.md`.
- **Screenshots do KAN-132:** `audits/screenshots/kan132-*.png` (estado pós-saneamento).

## 8. Limites do que foi validado

- Auditoria automatizada + teclado scriptado — **não substitui** teste com leitor de tela (VoiceOver/TalkBack) nem device móvel real; o item F1 do gate ainda pede 1 passada humana em aparelho físico (subtarefa correspondente do KAN-44).
- Checkout não testado de ponta a ponta — CTA ainda aponta para placeholder (KAN-131, bloqueado por KAN-29).
- Ambiente: dev server local; re-validar deep-links após o deploy de produção (KAN-19, rewrite SPA).

## 9. Histórico de revisões

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-06-11 | 1.0 | Re-auditoria pós-KAN-132: 38 scans axe zerados, teclado E2E ✅, correção do script canônico, novo script de funil | Claude Code (Fable 5) |

---

**Fim do documento.**
