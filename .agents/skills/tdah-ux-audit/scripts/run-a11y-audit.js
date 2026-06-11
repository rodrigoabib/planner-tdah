/**
 * run-a11y-audit.js
 *
 * Executa auditoria de acessibilidade automatizada no quiz usando axe-core + Playwright.
 * Testa o quiz em múltiplos viewports e gera relatório de problemas encontrados.
 *
 * Pré-requisitos:
 *   npm install --save-dev @axe-core/playwright @playwright/test
 *   npx playwright install chromium
 *
 * Uso:
 *   # Com quiz rodando localmente na porta padrão:
 *   QUIZ_URL=http://localhost:3000 node .agents/skills/tdah-ux-audit/scripts/run-a11y-audit.js
 *
 *   # Ou com porta específica:
 *   QUIZ_URL=http://localhost:5173 node .agents/skills/tdah-ux-audit/scripts/run-a11y-audit.js
 */

const { chromium } = require('@playwright/test');
// @axe-core/playwright >= 4.x expõe AxeBuilder (injectAxe/getViolations eram do pacote axe-playwright,
// que não está instalado). Corrigido em KAN-133 para casar com a dependência real do package.json.
const { AxeBuilder } = require('@axe-core/playwright');

async function collectViolations(page, tags) {
  const results = await new AxeBuilder({ page }).withTags(tags).analyze();
  return results.violations;
}
const fs = require('fs');
const path = require('path');

const QUIZ_URL = process.env.QUIZ_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '../../../quiz/audits');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'a11y-report.md');

const VIEWPORTS = [
  { name: '320px (iPhone SE)', width: 320, height: 568 },
  { name: '390px (iPhone 14)', width: 390, height: 844 },
  { name: '768px (Tablet)',    width: 768, height: 1024 },
  { name: '1280px (Desktop)',  width: 1280, height: 800 },
];

// Garante que a pasta audits existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Formata violações para Markdown
function formatViolations(violations, context) {
  if (!violations || violations.length === 0) {
    return `_Nenhuma violação encontrada em ${context}_\n`;
  }

  return violations.map(v => {
    const impact = v.impact?.toUpperCase() || 'UNKNOWN';
    const impactEmoji = { CRITICAL: '🔴', SERIOUS: '🟠', MODERATE: '🟡', MINOR: '⚪' }[impact] || '⚪';
    const nodes = v.nodes.slice(0, 3).map(n => `\`${n.html?.substring(0, 120)}\``).join('\n    ');
    return `#### ${impactEmoji} ${impact} — ${v.id}

**Descrição:** ${v.description}

**Ajuda:** ${v.helpUrl}

**Elementos afetados (até 3):**
    ${nodes}

---`;
  }).join('\n');
}

async function runAudit() {
  console.log('🔍 Iniciando auditoria de acessibilidade...');
  console.log(`   URL: ${QUIZ_URL}`);
  console.log(`   Relatório: ${OUTPUT_FILE}\n`);

  let browser;
  const reportSections = [];
  const summary = { total: 0, critical: 0, serious: 0, moderate: 0, minor: 0 };

  try {
    browser = await chromium.launch({ headless: true });

    for (const viewport of VIEWPORTS) {
      console.log(`\n📐 Testando viewport: ${viewport.name}...`);

      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
      });
      const page = await context.newPage();

      try {
        await page.goto(QUIZ_URL, { waitUntil: 'networkidle', timeout: 15000 });
      } catch (err) {
        console.warn(`  ⚠️  Não foi possível carregar ${QUIZ_URL}: ${err.message}`);
        reportSections.push(`### ${viewport.name}\n\n⚠️ Não foi possível carregar a URL: ${err.message}\n`);
        await context.close();
        continue;
      }

      // Testa tela inicial (landing/entrada do quiz)
      const landingViolations = await collectViolations(page, ['wcag2a', 'wcag2aa', 'best-practice']);

      // Tenta responder a primeira pergunta (se existir)
      let questionViolations = [];
      try {
        const startBtn = await page.$('button');
        if (startBtn) {
          await startBtn.click();
          await page.waitForTimeout(600);
          questionViolations = await collectViolations(page, ['wcag2a', 'wcag2aa']);
        }
      } catch (_) {
        // ignora se não conseguir navegar
      }

      // Agrega ao summary
      [...landingViolations, ...questionViolations].forEach(v => {
        summary.total++;
        if (v.impact === 'critical') summary.critical++;
        else if (v.impact === 'serious') summary.serious++;
        else if (v.impact === 'moderate') summary.moderate++;
        else if (v.impact === 'minor') summary.minor++;
      });

      const landingCount = landingViolations.length;
      const questionCount = questionViolations.length;
      console.log(`  Landing: ${landingCount} violações | Pergunta: ${questionCount} violações`);

      reportSections.push(`### ${viewport.name}

#### Tela de Entrada — ${landingCount} violação(ões)

${formatViolations(landingViolations, `Landing @ ${viewport.name}`)}

#### Primeira Pergunta — ${questionCount} violação(ões)

${formatViolations(questionViolations, `Q1 @ ${viewport.name}`)}`);

      // Testa reduced-motion
      const reducedMotionPage = await context.newPage();
      try {
        await reducedMotionPage.emulateMedia({ reducedMotion: 'reduce' });
        await reducedMotionPage.goto(QUIZ_URL, { waitUntil: 'networkidle', timeout: 10000 });
        const rmViolations = await collectViolations(reducedMotionPage, ['wcag2a', 'wcag2aa']);
        if (rmViolations.length > 0) {
          reportSections.push(`#### Reduced Motion @ ${viewport.name} — ${rmViolations.length} violação(ões)\n\n${formatViolations(rmViolations, 'reduced-motion')}`);
        }
      } catch (_) {
        // ignora
      } finally {
        await reducedMotionPage.close();
      }

      await context.close();
    }

  } finally {
    if (browser) await browser.close();
  }

  // Gera relatório Markdown
  const now = new Date().toLocaleString('pt-BR');
  const report = `# Relatório de Acessibilidade — Quiz TDAH v1

> Gerado automaticamente por run-a11y-audit.js
> Data: ${now}
> URL testada: ${QUIZ_URL}
> Engine: axe-core via @axe-core/playwright

---

## Resumo

| Impacto | Qtd |
|---|---|
| 🔴 Critical | ${summary.critical} |
| 🟠 Serious | ${summary.serious} |
| 🟡 Moderate | ${summary.moderate} |
| ⚪ Minor | ${summary.minor} |
| **Total** | **${summary.total}** |

---

## Resultados por Viewport

${reportSections.join('\n\n---\n\n')}

---

## Próximos Passos

1. Resolver todas as violações **Critical** e **Serious** antes do lançamento
2. Verificar manualmente navegação por teclado (Tab, Enter, Space)
3. Testar com VoiceOver (iOS/macOS) e TalkBack (Android)
4. Verificar contraste em: https://webaim.org/resources/contrastchecker/
5. Simular \`prefers-reduced-motion\` manualmente no Chrome DevTools → Rendering

---

_Para re-executar: \`QUIZ_URL=http://localhost:3000 node .agents/skills/tdah-ux-audit/scripts/run-a11y-audit.js\`_
`;

  fs.writeFileSync(OUTPUT_FILE, report, 'utf-8');

  console.log('\n' + '='.repeat(60));
  console.log('  RESUMO DA AUDITORIA DE ACESSIBILIDADE');
  console.log('='.repeat(60));
  console.log(`  🔴 Critical:  ${summary.critical}`);
  console.log(`  🟠 Serious:   ${summary.serious}`);
  console.log(`  🟡 Moderate:  ${summary.moderate}`);
  console.log(`  ⚪ Minor:     ${summary.minor}`);
  console.log(`  Total:        ${summary.total}`);
  console.log(`\n  📄 Relatório salvo em: ${OUTPUT_FILE}`);

  if (summary.critical > 0 || summary.serious > 0) {
    console.log('\n  ⚠️  Há violações críticas/sérias. Corrija antes do lançamento.');
    process.exit(1);
  } else {
    console.log('\n  ✅ Sem violações críticas/sérias detectadas automaticamente.');
    console.log('     Lembre-se: testes manuais de teclado e screen reader ainda são necessários.');
  }
}

runAudit().catch(err => {
  console.error('\n❌ Erro durante a auditoria:', err.message);
  console.error('\nVerifique:');
  console.error('  1. O quiz está rodando? (QUIZ_URL=http://localhost:PORT)');
  console.error('  2. As dependências estão instaladas? (npm install)');
  console.error('  3. Playwright instalado? (npx playwright install chromium)');
  process.exit(1);
});
