# Validação Quiz vs Pesquisa Reddit - Planner TDAH

> **Ticket:** Pesquisa interna / sem ticket Jira atribuído  
> **Status:** Gerado em 2026-06-05  
> **Dependências:** quiz/data/archetypes.js; quiz/quiz-tdah-especificacao-completa.md; product/planner-structure.md; reddit_archetype_classification.csv  
> **Sumário:** Compara os achados do corpus com os arquétipos e a estrutura modular já existentes, sem alterar código.

---

## 1. Escopo da validação

Esta validação é documental. Nenhum componente do quiz, landing, copy de produção ou planner foi modificado. O objetivo é verificar se os sinais do corpus sustentam, tensionam ou refinam as hipóteses de arquétipo e personalização leve da v1.

## 2. Arquétipos existentes x evidência de discovery

| Arquétipo | Registros totais | Confiança média/alta | Status | Feature coerente |
| --- | --- | --- | --- | --- |
| O Nômade Quântico | 450 | 289 | bem sustentado para discovery | Âncoras visuais e lembretes contextuais |
| O Reator em Cadeia | 196 | 93 | bem sustentado para discovery | Speed bumps para impulso e decisões |
| O Vulcão Silencioso | 42 | 27 | bem sustentado para discovery | Check-in de humor/energia |
| O Arquiteto do Caos | 310 | 188 | bem sustentado para discovery | Micro-ações e próximo passo físico |
| O Furacão | 172 | 141 | bem sustentado para discovery | Limite de 1 a 3 prioridades |
| O Camaleão Exausto | 22 | 12 | sinal presente, revisar amostras | Reset sem culpa e retomada curta |
| Perfil de Manutenção | 61 | 35 | bem sustentado para discovery | Templates simples de baixo atrito |

## 3. Pontos de aderência

- A estrutura modular do planner combina com os achados: BASE forte + regras curtas por arquétipo reduz risco de sobrecarga.
- A existência de uma variação de manutenção é coerente com registros que preferem sistemas simples e baixo atrito.
- Os arquétipos mais úteis são os que traduzem dor em regra operacional: âncora visual, pausa, check-in, micro-ação, limite de prioridades ou reset.

## 4. Pontos de tensão

- Registros `indeterminado` e de baixa confiança não devem ser forçados em arquétipos só para aumentar cobertura.
- Algumas dores aparecem transversais, especialmente manutenção, retomada e sobrecarga; tratá-las como BASE pode ser melhor do que criar variação excessiva.
- Copy do quiz deve evitar transformar arquétipo em identidade fixa ou diagnóstico implícito.

## 5. Recomendações sem alteração de código nesta fase

| Área | Recomendação | Prioridade |
| --- | --- | --- |
| Quiz | Revisar perguntas futuras para captar retomada pós-falha e custo de manutenção sem termos clínicos. | P1 |
| Landing | Manter disclaimer de autoavaliação e reforçar que o planner é ferramenta de organização, não diagnóstico. | P0 |
| Planner | Garantir que cada variante tenha uma regra de uso concreta baseada em dor rastreável. | P1 |
| Onboarding | Inserir início mínimo de 15 minutos e reset sem culpa como mecanismo antiabandono. | P1 |
| Copy | Usar ângulos comportamentais seguros; revisar contra `foundation/posicionamento-etico.md` antes de produção. | P0 |

## Histórico de revisões

| Data | Versão | Mudança | Autor |
| --- | --- | --- | --- |
| 2026-06-05 | 1.0 | Validação documental gerada contra quiz e planner existentes. | Codex |
