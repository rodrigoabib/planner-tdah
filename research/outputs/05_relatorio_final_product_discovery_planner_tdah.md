# Relatório Final de Product Discovery - Planner TDAH

> **Ticket:** Pesquisa interna / sem ticket Jira atribuído  
> **Status:** Gerado em 2026-06-05  
> **Dependências:** 00_corpus_manifest.md; 01_mapa_qualitativo_dores_reddit.md; 02_matriz_arquetipos_dores_features.md; 03_matrizes_estrategicas_planner_tdah.md; 04_validacao_quiz_vs_pesquisa.md  
> **Sumário:** Consolida achados decisórios da fase de pesquisa Reddit e recomenda próximos passos para produto, quiz, copy, onboarding e antiabandono.

---

## 1. Decisão executiva

A fase de pesquisa pode avançar para revisão humana e priorização de produto. O corpus local é suficiente para sustentar hipóteses de discovery sobre fricções com planners, desde que as conclusões sejam tratadas como sinais qualitativos rastreáveis, não como diagnóstico clínico nem como promessa comercial.

## 2. Evidência primária

| Item | Resultado |
| --- | --- |
| Corpus primário | 65 CSVs Reddit / 2252 registros |
| Base consolidada | reddit_evidence_consolidated.csv |
| Classificação qualitativa | reddit_qualitative_findings.csv |
| Classificação por arquétipo | reddit_archetype_classification.csv |
| Rastreabilidade | source_file_stem + record_id + thread_url + comment_url |

## 3. Principais dores sustentadas

| Dor | Registros | Feature mais associada |
| --- | --- | --- |
| Função executiva e organização externa | 768 | Templates simples de baixo atrito |
| Impulsividade e decisões rápidas | 240 | Templates simples de baixo atrito |
| Cegueira temporal, atrasos e prazos | 170 | Revisão semanal e planejamento leve |
| Rotinas rígidas que quebram quando um dia falha | 127 | Tracking gentil sem streak punitivo |
| Excesso de ideias e projetos pela metade | 125 | Captura rápida / inbox de ideias |
| Bagunça visual, estética e legibilidade | 112 | Templates simples de baixo atrito |
| Esquecimento, memória de trabalho e fora do campo visual | 98 | Âncoras visuais e lembretes contextuais |
| Motivação, novidade e dopamina | 75 | Templates simples de baixo atrito |
| Sobrecarga cognitiva e excesso de etapas | 74 | Captura rápida / inbox de ideias |

## 4. Recomendações para o planner

| Tema | Recomendação | Motivo |
| --- | --- | --- |
| Antiabandono | Adicionar reset de 5 minutos e instrução explícita de retomada sem culpa. | Abandono, rotina rígida e retomada aparecem como risco transversal. |
| Baixo atrito | Garantir versão mínima de todo ritual antes da versão completa. | Soluções falham quando exigem manutenção alta. |
| Âncora visual | Orientar onde deixar o planner e como trazer o plano de volta ao campo visual. | Esquecimento/fora do campo visual é uma dor recorrente. |
| Micro-ações | Converter metas e ideias em próximo passo físico pequeno. | Iniciação, priorização e excesso de ideias aparecem como fricções centrais. |
| Personalização | Manter variações curtas por arquétipo, com regra operacional e exemplo. | Personalização profunda demais aumenta complexidade do MVP. |

## 5. Recomendações para quiz e landing

| Área | Recomendação | Cuidado ético |
| --- | --- | --- |
| Quiz | Captar padrões de funcionamento e custo de manutenção; não inferir diagnóstico. | Não sugerir que resultado confirma TDAH. |
| Landing | Explicar personalização como ajuste de uso do planner. | Evitar promessa de foco garantido, cura ou tratamento. |
| Copy | Usar dores observáveis: esquecimento, sobrecarga, retomada, micro-ações. | Evitar vergonha, urgência manipulativa e medicalização. |
| Onboarding | Comece em 15 minutos deve ser prioridade real, não bônus periférico. | Não transformar onboarding em mais uma tarefa pesada. |

## 6. Recomendações por arquétipo

| Arquétipo | Sinal no corpus | Prioridade de produto |
| --- | --- | --- |
| O Nômade Quântico | 450 | Âncoras visuais e lembretes contextuais |
| O Reator em Cadeia | 196 | Speed bumps para impulso e decisões |
| O Vulcão Silencioso | 42 | Check-in de humor/energia |
| O Arquiteto do Caos | 310 | Micro-ações e próximo passo físico |
| O Furacão | 172 | Limite de 1 a 3 prioridades |
| O Camaleão Exausto | 22 | Reset sem culpa e retomada curta |
| Perfil de Manutenção | 61 | Templates simples de baixo atrito |

## 7. Lacunas e riscos

- Registros longos exigem cuidado com `text_for_ai`; usar `analysis_text` e retornar ao registro original quando uma decisão for crítica.
- Dossiês complementares podem ajudar Rodrigo a interpretar, mas não devem ser citados como evidência final sem normalização própria.
- Classificação heurística pode superatribuir arquétipo em registros ambíguos; usar `indeterminado` como proteção, não como falha.
- Evidência sensível deve ser resumida com cuidado e sem exposição de identidade.

## 8. Próximos passos recomendados

1. Rodrigo revisar manualmente os clusters de maior impacto: dor x feature e arquétipo x feature.
2. Selecionar 10-20 registros de alta confiança para embasar decisões editoriais da v1.5.
3. Validar copy angles contra `foundation/posicionamento-etico.md` antes de qualquer uso comercial.
4. Transformar recomendações aprovadas em tickets KAN separados para produto, quiz, onboarding e copy.

## Histórico de revisões

| Data | Versão | Mudança | Autor |
| --- | --- | --- | --- |
| 2026-06-05 | 1.0 | Relatório final de discovery gerado a partir dos outputs rastreáveis. | Codex |
