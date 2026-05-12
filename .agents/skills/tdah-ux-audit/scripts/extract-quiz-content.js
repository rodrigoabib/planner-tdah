/**
 * extract-quiz-content.js
 *
 * Extrai e exibe de forma estruturada o conteúdo do quiz-tdah-v1.jsx:
 * - Perguntas e alternativas
 * - Scoring por opção
 * - Micro-validações
 * - Dimensão de cada pergunta
 * - Arquétipos e perfis
 *
 * Uso: node .agents/skills/tdah-ux-audit/scripts/extract-quiz-content.js
 */

const fs = require('fs');
const path = require('path');

const QUIZ_FILE = path.join(__dirname, '../../../../quiz/quiz-tdah-v1.jsx');

// --- Helpers ---

function heading(text, level = 1) {
  const prefix = '#'.repeat(level);
  console.log(`\n${prefix} ${text}`);
}

function separator() {
  console.log('\n' + '─'.repeat(70));
}

// --- Leitura do arquivo ---

let source;
try {
  source = fs.readFileSync(QUIZ_FILE, 'utf-8');
  console.log(`✅ Arquivo lido: ${QUIZ_FILE}`);
  console.log(`   Tamanho: ${(source.length / 1024).toFixed(1)} KB | ${source.split('\n').length} linhas`);
} catch (err) {
  console.error(`❌ Erro ao ler ${QUIZ_FILE}:`, err.message);
  process.exit(1);
}

// --- Extração do array Q (perguntas) via regex ---

heading('ESTRUTURA GERAL');

// Verifica imports
const hasRecharts = source.includes('recharts');
const hasReact = source.includes("from 'react'") || source.includes('from "react"');
const hasFramerMotion = source.includes('framer-motion');
const hasCanvasConfetti = source.includes('canvas-confetti');

console.log('\nDependências detectadas:');
console.log(`  React:          ${hasReact ? '✅' : '❌'}`);
console.log(`  Recharts:       ${hasRecharts ? '✅' : '❌'}`);
console.log(`  Framer Motion:  ${hasFramerMotion ? '✅' : '❌'}`);
console.log(`  canvas-confetti:${hasCanvasConfetti ? '✅' : '❌'}`);

// Verifica eventos de analytics
const analyticsEvents = [
  'quiz_started',
  'question_answered',
  'milestone_reached',
  'quiz_completed',
  'result_viewed',
  'cta_clicked',
  'quiz_abandoned',
];

separator();
heading('EVENTOS DE ANALYTICS', 2);
analyticsEvents.forEach(event => {
  const found = source.includes(`'${event}'`) || source.includes(`"${event}"`);
  console.log(`  ${found ? '✅' : '❌'} ${event}`);
});

// Verifica XP system
separator();
heading('SISTEMA DE XP', 2);
const xpPatterns = {
  '+10 por pergunta': /xp.*\+.*10|setXp.*\+.*10|\+10.*xp/i,
  '+5 bônus velocidade': /\+5.*xp|\+5.*speed|speed.*\+5|bonus.*speed/i,
  '+25 Marco 1/2': /\+25.*xp|milestone.*25|25.*xp/i,
  '+50 Marco 3': /\+50.*xp|milestone.*50|50.*xp/i,
  'XP máximo 300': /300.*xp|xp.*300/i,
};
Object.entries(xpPatterns).forEach(([label, pattern]) => {
  const found = pattern.test(source);
  console.log(`  ${found ? '✅' : '⚠️ '} ${label}`);
});

// Verifica features de UI
separator();
heading('FEATURES DE UI', 2);
const uiFeatures = {
  'Barra de progresso shimmer': /shimmer/i,
  'Timeline de pontos (15 dots)': /timeline|dot.*15|15.*dot/i,
  'Confetti de marco': /confetti|conf[A-Z]/,
  'Radar chart parcial (Marco 2)': /radar.*partial|partial.*radar|locked|cadeado|blur.*radar/i,
  'Teaser progressivo': /teaser/i,
  'prefers-reduced-motion': /reduced.motion|prefers-reduced/i,
  'Botão voltar': /voltar|back.*btn|btn.*back/i,
  'Compartilhar resultado': /compartilhar|share/i,
};
Object.entries(uiFeatures).forEach(([label, pattern]) => {
  const found = pattern.test(source);
  console.log(`  ${found ? '✅' : '❌'} ${label}`);
});

// Verifica acessibilidade básica
separator();
heading('ACESSIBILIDADE (checagem básica)', 2);
const a11yChecks = {
  'role="radiogroup"': /role.*radiogroup|radiogroup/i,
  'aria-live': /aria-live/i,
  'aria-checked': /aria-checked/i,
  'aria-label': /aria-label/i,
  'tabIndex / tabindex': /tabindex/i,
  'button semântico (não div clicável)': /<button/i,
  'input radio': /<input.*type.*radio/i,
  'lang="pt-BR"': /lang.*pt/i,
};
Object.entries(a11yChecks).forEach(([label, pattern]) => {
  const found = pattern.test(source);
  console.log(`  ${found ? '✅' : '⚠️ '} ${label}`);
});

// Extrai e exibe questões (parse manual do JSX)
separator();
heading('PERGUNTAS E SCORING', 2);

// Encontrar o array Q no source
const qArrayMatch = source.match(/const Q = \[([\s\S]*?)\]\s*\n\s*const /);
if (!qArrayMatch) {
  console.log('⚠️  Não foi possível extrair o array Q automaticamente.');
  console.log('   Verifique manualmente a estrutura em quiz-tdah-v1.jsx.');
} else {
  // Extrai IDs e dimensões com regex simples
  const questionBlocks = source.matchAll(/\{id:(\d+),d:'([A-Z])',q:'([^']+)'/g);
  let qCount = 0;
  for (const match of questionBlocks) {
    const [, id, dim, question] = match;
    console.log(`\n  Q${id} [${dim}]: "${question}"`);
    qCount++;
  }
  console.log(`\n  Total de perguntas detectadas: ${qCount}/15`);
}

// Verifica arquétipos
separator();
heading('ARQUÉTIPOS', 2);
const archetypeNames = [
  { key: 'nomade', name: 'O Nômade Quântico', expectedProfile: 'D:S, I:N, A:M, E:N, H:N' },
  { key: 'reator', name: 'O Reator em Cadeia', expectedProfile: 'D:M, I:S, A:M, E:M, H:S' },
  { key: 'vulcao', name: 'O Vulcão Silencioso', expectedProfile: 'D:M, I:M, A:S, E:S, H:N' },
  { key: 'arquiteto', name: 'O Arquiteto do Caos', expectedProfile: 'D:S, I:S, A:S, E:M, H:M' },
  { key: 'furacao', name: 'O Furacão', expectedProfile: 'D:S, I:S, A:S, E:S, H:S' },
  { key: 'camaleao', name: 'O Camaleão Exausto', expectedProfile: 'D:M, I:M, A:M, E:M, H:N' },
];
archetypeNames.forEach(({ key, name, expectedProfile }) => {
  const found = source.includes(key);
  console.log(`  ${found ? '✅' : '❌'} ${name} (${expectedProfile})`);
});

// Resumo final
separator();
heading('RESUMO PARA O AUDITOR', 2);
console.log('');
console.log('  Este script fez uma análise estática básica do quiz-tdah-v1.jsx.');
console.log('');
console.log('  Próximos passos recomendados:');
console.log('    1. Rode o quiz localmente e navegue manualmente');
console.log('    2. Use score-archetype-paths.js para verificar scoring por sequência');
console.log('    3. Use run-a11y-audit.js para testes de acessibilidade automatizados');
console.log('    4. Compare achados com quiz/quiz-tdah-especificacao-completa.md');
console.log('');
console.log('  Para rodar localmente:');
console.log('    cd quiz && npx serve . -- ou o metodo de dev do projeto');
console.log('');
