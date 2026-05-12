/**
 * score-archetype-paths.js
 *
 * Simula caminhos de respostas e calcula scores/arquétipos,
 * replicando a lógica de scoring do quiz-tdah-v1.jsx.
 *
 * Uso: node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js
 *
 * Verifica:
 * - Se os caminhos esperados geram os arquétipos corretos
 * - Se caminhos extremos (tudo A, tudo D, alternado) funcionam
 * - Inconsistências no algoritmo de scoring e tie-breaking
 * - Discrepâncias entre spec e implementação
 */

// =============================================================================
// DADOS DO QUIZ (espelhados da especificação — quiz-tdah-especificacao-completa.md)
// =============================================================================

const QUESTIONS = [
  { id: 1,  dim: 'D', scoring: { A: {D:3}, B: {D:2}, C: {D:1}, D: {D:0} } },
  { id: 2,  dim: 'H', scoring: { A: {H:3}, B: {H:2, D:1}, C: {H:1}, D: {H:0} } },
  { id: 3,  dim: 'I', scoring: { A: {I:3}, B: {I:2}, C: {I:1}, D: {I:0} } },
  { id: 4,  dim: 'A', scoring: { A: {A:3}, B: {A:2}, C: {A:1}, D: {A:0} } },
  { id: 5,  dim: 'E', scoring: { A: {E:3}, B: {E:2}, C: {E:1}, D: {E:0} } },
  { id: 6,  dim: 'D', scoring: { A: {D:3, A:1}, B: {D:2, A:1}, C: {D:1}, D: {D:0} } },
  { id: 7,  dim: 'H', scoring: { A: {H:3, E:1}, B: {H:2}, C: {H:1}, D: {H:0} } },
  { id: 8,  dim: 'I', scoring: { A: {I:3}, B: {I:2}, C: {I:1}, D: {I:0} } },
  { id: 9,  dim: 'A', scoring: { A: {A:3, E:2}, B: {A:2, E:1}, C: {A:1}, D: {A:0} } },
  { id: 10, dim: 'E', scoring: { A: {E:3, A:1}, B: {E:2}, C: {E:1}, D: {E:0} } },
  { id: 11, dim: 'D', scoring: { A: {D:3}, B: {D:2}, C: {D:1}, D: {D:0} } },
  { id: 12, dim: 'H', scoring: { A: {H:3, D:1}, B: {H:2}, C: {H:1}, D: {H:0} } },
  { id: 13, dim: 'I', scoring: { A: {I:3}, B: {I:2}, C: {I:1}, D: {I:0} } },
  { id: 14, dim: 'A', scoring: { A: {A:3}, B: {A:2}, C: {A:1}, D: {A:0} } },
  { id: 15, dim: 'E', scoring: { A: {E:3, A:2}, B: {E:2, A:1}, C: {E:1}, D: {E:0} } },
];

const ARCHETYPES = {
  nomade:    { name: 'O Nômade Quântico',   profile: { D:'S', I:'N', A:'M', E:'N', H:'N' } },
  reator:    { name: 'O Reator em Cadeia',  profile: { D:'M', I:'S', A:'M', E:'M', H:'S' } },
  vulcao:    { name: 'O Vulcão Silencioso', profile: { D:'M', I:'M', A:'S', E:'S', H:'N' } },
  arquiteto: { name: 'O Arquiteto do Caos', profile: { D:'S', I:'S', A:'S', E:'M', H:'M' } },
  furacao:   { name: 'O Furacão',           profile: { D:'S', I:'S', A:'S', E:'S', H:'S' } },
  camaleao:  { name: 'O Camaleão Exausto',  profile: { D:'M', I:'M', A:'M', E:'M', H:'N' } },
};

// =============================================================================
// FUNÇÕES DE SCORING (conforme spec §7)
// =============================================================================

function computeRawScores(answers) {
  // answers: array de 15 letras (A/B/C/D), índice 0 = Q1
  const raw = { D: 0, H: 0, I: 0, A: 0, E: 0 };

  QUESTIONS.forEach((q, i) => {
    const answer = answers[i];
    const scoreMap = q.scoring[answer];
    if (!scoreMap) return;
    Object.entries(scoreMap).forEach(([dim, pts]) => {
      raw[dim] = (raw[dim] || 0) + pts;
    });
  });

  return raw;
}

function computeFinalScores(raw) {
  // Cap secundários: D e A podem ter +2 de secondary, E +2 — já incluídos no raw acima
  // O spec define cap de min(score, 11) para D, A, E
  return {
    D: Math.min(raw.D, 11),
    H: Math.min(raw.H, 11),
    I: Math.min(raw.I, 11),
    A: Math.min(raw.A, 11),
    E: Math.min(raw.E, 11),
  };
}

function toSeverity(score) {
  if (score <= 3) return 'N';
  if (score <= 6) return 'M';
  return 'S';
}

function severityLevel(s) {
  return s === 'N' ? 0 : s === 'M' ? 1 : 2;
}

function similarityScore(userProfile, archetypeProfile) {
  let total = 0;
  const dims = ['D', 'H', 'I', 'A', 'E'];
  dims.forEach(dim => {
    const diff = Math.abs(severityLevel(userProfile[dim]) - severityLevel(archetypeProfile[dim]));
    total += diff === 0 ? 2 : diff === 1 ? 1 : 0;
  });
  return total;
}

function identifyArchetype(scores) {
  const userProfile = {
    D: toSeverity(scores.D),
    H: toSeverity(scores.H),
    I: toSeverity(scores.I),
    A: toSeverity(scores.A),
    E: toSeverity(scores.E),
  };

  let best = null;
  let bestScore = -1;
  const allScores = {};

  Object.entries(ARCHETYPES).forEach(([key, arc]) => {
    const sim = similarityScore(userProfile, arc.profile);
    allScores[key] = sim;
    if (sim > bestScore) {
      bestScore = sim;
      best = key;
    }
  });

  return { archetypeKey: best, userProfile, allScores, bestScore };
}

// =============================================================================
// FUNÇÃO DE EXECUÇÃO DE CAMINHO
// =============================================================================

function runPath(name, sequence, expectedArchetype = null) {
  const answers = sequence.toUpperCase().split('');
  if (answers.length !== 15) {
    console.log(`  ⚠️  Sequência "${sequence}" tem ${answers.length} respostas (esperado: 15)`);
    return;
  }

  const raw = computeRawScores(answers);
  const final = computeFinalScores(raw);
  const profile = {
    D: toSeverity(final.D),
    H: toSeverity(final.H),
    I: toSeverity(final.I),
    A: toSeverity(final.A),
    E: toSeverity(final.E),
  };
  const { archetypeKey, allScores, bestScore } = identifyArchetype(final);
  const archetypeName = ARCHETYPES[archetypeKey]?.name || 'Desconhecido';

  const correct = expectedArchetype ? archetypeKey === expectedArchetype : null;
  const status = correct === null ? '🔵' : correct ? '✅' : '❌';

  console.log(`\n  ${status} ${name}`);
  console.log(`     Sequência: ${sequence}`);
  console.log(`     Scores:    D=${final.D} H=${final.H} I=${final.I} A=${final.A} E=${final.E}`);
  console.log(`     Perfil:    D=${profile.D} H=${profile.H} I=${profile.I} A=${profile.A} E=${profile.E}`);
  console.log(`     Arquétipo: ${archetypeName} (similarity: ${bestScore}/10)`);
  if (expectedArchetype && !correct) {
    console.log(`     ⚠️  ESPERADO: ${ARCHETYPES[expectedArchetype]?.name}`);
    console.log(`     Scores por arquétipo: ${Object.entries(allScores).map(([k,v]) => `${k}:${v}`).join(', ')}`);
  }

  return { archetypeKey, correct, final, profile };
}

// =============================================================================
// MAIN
// =============================================================================

console.log('='.repeat(70));
console.log('  SCORE-ARCHETYPE-PATHS — Simulação de Caminhos do Quiz TDAH');
console.log('='.repeat(70));

// --- Caminhos esperados por arquétipo ---
console.log('\n## 1. CAMINHOS ESPERADOS POR ARQUÉTIPO\n');

const expectedPaths = [
  { name: 'O Nômade Quântico',   seq: 'ABBDCADDCCDCDAC', expected: 'nomade' },
  { name: 'O Reator em Cadeia',  seq: 'BAABCBBADBDAABC', expected: 'reator' },
  { name: 'O Vulcão Silencioso', seq: 'BDCDCDDABABADAA', expected: 'vulcao' },
  { name: 'O Arquiteto do Caos', seq: 'BAABDBCAADADCBB', expected: 'arquiteto' },
  { name: 'O Furacão',           seq: 'ABACAAAACBBAABA', expected: 'furacao' },
  { name: 'O Camaleão Exausto',  seq: 'BDBBBBDACCBDCDC', expected: 'camaleao' },
];

let passed = 0;
let failed = 0;
expectedPaths.forEach(({ name, seq, expected }) => {
  const result = runPath(name, seq, expected);
  if (result?.correct) passed++;
  else if (result?.correct === false) failed++;
});

console.log(`\n  Resultado: ${passed}/${expectedPaths.length} arquétipos corretos`);
if (failed > 0) console.log(`  ⚠️  ${failed} arquétipo(s) com divergência — investigar scoring`);

// --- Casos extremos ---
console.log('\n\n## 2. CASOS EXTREMOS\n');

runPath('Tudo A (máxima severidade)',    'AAAAAAAAAAAAAAA');
runPath('Tudo B',                        'BBBBBBBBBBBBBBB');
runPath('Tudo C',                        'CCCCCCCCCCCCCCC');
runPath('Tudo D (mínima severidade)',    'DDDDDDDDDDDDDDD');
runPath('Alternado A/D',                 'ADADADADADADADA');
runPath('Alternado D/A',                 'DADADADADADADAD');

// --- Verificação do XP máximo possível ---
console.log('\n\n## 3. VERIFICAÇÃO DE XP (spec vs implementação)\n');

const XP_SPEC = {
  'Por pergunta (x15)': 15 * 10,
  'Bônus velocidade (x15, teórico máx)': 15 * 5,
  'Marco 1 (+25)': 25,
  'Marco 2 (+25)': 25,
  'Marco 3 (+50)': 50,
  'TOTAL MÁXIMO': 300,
};
console.log('  XP conforme spec §4.1:');
Object.entries(XP_SPEC).forEach(([label, value]) => {
  console.log(`    ${label}: ${value} XP`);
});
console.log('\n  ⚠️  Verificar no código se o bônus de +5 XP por velocidade está implementado.');
console.log('  ⚠️  Verificar se Marco 3 adiciona +50 (não +25 como os outros marcos).');

// --- Análise do Marco 2 ---
console.log('\n\n## 4. ANÁLISE DO MARCO 2 (radar parcial)\n');

console.log('  Spec §4.5 diz: "Exibir dados reais de D, H e I (já completamente avaliadas)"');
console.log('  Mas pela distribuição de perguntas:');
console.log('    D → Q1, Q6, Q11  (Q11 ainda não respondida após Q10)');
console.log('    H → Q2, Q7, Q12  (Q12 ainda não respondida após Q10)');
console.log('    I → Q3, Q8, Q13  (Q13 ainda não respondida após Q10)');
console.log('    A → Q4, Q9, Q14  (Q14 ainda não respondida — "bloqueada" na spec)');
console.log('    E → Q5, Q10, Q15 (Q15 ainda não respondida — "bloqueada" na spec)');
console.log('\n  ⚠️  INCONSISTÊNCIA POTENCIAL: D, H e I não estão completas após Q10.');
console.log('     O radar parcial pode ser narrativamente bonito mas logicamente impreciso.');
console.log('     Investigar como a implementação trata isso.');

// --- Resumo ---
console.log('\n' + '='.repeat(70));
console.log('  RESUMO');
console.log('='.repeat(70));
console.log(`
  Arquétipos corretos: ${passed}/${expectedPaths.length}
  Falhas de scoring:   ${failed}

  Pontos críticos para investigação manual:
  1. Bônus de +5 XP por velocidade — implementado?
  2. Marco 3 com +50 XP (não +25) — implementado?
  3. Marco 2 radar parcial — logicamente consistente?
  4. Algoritmo de tie-break — implementado conforme spec §7.4?
  5. Caso extremo (N/N/N/N/N) — exibe Camaleão com linguagem adaptada?
`);
