/**
 * run-funnel-audit.js — KAN-133 (FUNNEL-11)
 *
 * Auditoria instrumentada do funil completo:
 *   - axe-core (wcag2a + wcag2aa) nas telas-chave: intro, Q1, marco 2, resultado,
 *     /planner/furacao (cupom válido E expirado), /obrigado e 3 rotas legais
 *   - screenshots por viewport arquivados em audits/screenshots/funnel-v1_2/
 *   - navegação por teclado end-to-end do quiz (intro → 15 perguntas → marcos → resultado)
 *
 * Reusa as dependências já instaladas (@playwright/test + @axe-core/playwright). Sem deps novas.
 *
 * Uso:
 *   QUIZ_URL=http://localhost:5199 node .agents/skills/tdah-ux-audit/scripts/run-funnel-audit.js
 */

const { chromium } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.QUIZ_URL || 'http://localhost:5199';
const REPO = path.join(__dirname, '..', '..', '..', '..');
const SHOT_DIR = path.join(REPO, 'audits', 'screenshots', 'funnel-v1_2');
const REPORT_JSON = path.join(REPO, 'audits', 'funnel-v1_2-axe-results.json');

const TAGS = ['wcag2a', 'wcag2aa'];
const VIEWPORTS = [
  { name: '320', width: 320, height: 568 },
  { name: '390', width: 390, height: 844 },
  { name: '768', width: 768, height: 1024 },
  { name: '1280', width: 1280, height: 800 },
];

fs.mkdirSync(SHOT_DIR, { recursive: true });

const axeResults = [];
const pageErrors = [];

async function axeScan(page, label) {
  const r = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  const violations = r.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    nodes: v.nodes.slice(0, 3).map((n) => (n.html || '').substring(0, 160)),
  }));
  axeResults.push({ label, count: violations.length, violations });
  const serious = violations.filter((v) => v.impact === 'critical' || v.impact === 'serious');
  console.log(`  axe [${label}]: ${violations.length} violações (${serious.length} críticas/sérias)`);
  return violations;
}

async function shot(page, name, fullPage = true) {
  await page.screenshot({ path: path.join(SHOT_DIR, `${name}.png`), fullPage });
}

function watchErrors(page, label) {
  page.on('pageerror', (err) => pageErrors.push({ label, message: String(err && err.message) }));
  page.on('console', (msg) => {
    if (msg.type() === 'error') pageErrors.push({ label, message: `console.error: ${msg.text().substring(0, 200)}` });
  });
}

// Responde a pergunta atual clicando na primeira opção e avança via "Próxima pergunta".
// Retorna 'next' se avançou direto, 'milestone' se caiu em marco (botão diferente) ou fim.
async function answerAndNext(page) {
  await page.locator('label.oc').first().click();
  await page.waitForTimeout(1400); // microvalidação (400ms) + botão next (1100ms) + margem
  const next = page.locator('button', { hasText: 'Próxima pergunta' });
  if (await next.count()) {
    await next.first().click();
    await page.waitForTimeout(400);
    return 'next';
  }
  return 'end';
}

async function dismissMilestone(page, buttonText) {
  const btn = page.locator('button', { hasText: buttonText });
  await btn.first().waitFor({ state: 'visible', timeout: 8000 });
  await btn.first().click();
  await page.waitForTimeout(450);
}

// Fluxo completo do quiz por clique. Para no marco 2 e no resultado para axe/screenshot quando flags ativas.
async function runQuizFlow(page, vpName, { scanMilestone = false, scanResult = false } = {}) {
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 20000 });
  await page.locator('button', { hasText: 'Descobrir meu padrão' }).click();
  await page.waitForTimeout(500);

  for (let qi = 0; qi < 15; qi++) {
    await answerAndNext(page);
    if (qi === 4) {
      await dismissMilestone(page, 'Continuar');
    } else if (qi === 9) {
      // Marco 2 — radar parcial
      await page.locator('button', { hasText: 'Desbloquear meu perfil' }).first().waitFor({ state: 'visible', timeout: 8000 });
      if (scanMilestone) {
        await axeScan(page, `marco2@${vpName}`);
        await shot(page, `marco2-${vpName}`);
      }
      await dismissMilestone(page, 'Desbloquear meu perfil');
    }
  }

  // Marco 3 (auto, 2.4s) → processing (~4.6s) → resultado
  await page.locator('#result-cta').waitFor({ state: 'visible', timeout: 15000 });
  // Aguarda as animações de entrada (rUp/fi ~0.6s + radar ~0.8s) terminarem antes do axe —
  // escanear com opacity parcial gera falso positivo de color-contrast (verificado na sonda).
  await page.waitForTimeout(1600);
  if (scanResult) {
    await axeScan(page, `resultado@${vpName}`);
    await shot(page, `resultado-${vpName}`);
  }
}

async function main() {
  console.log(`\n🔍 Auditoria instrumentada do funil — ${BASE}\n`);
  const browser = await chromium.launch({ headless: true });

  // ── 1. Telas estáticas: axe nos 4 viewports; screenshots no 320 (gate F1) + 768 ──
  const staticRoutes = [
    { route: '/', label: 'intro' },
    { route: '/planner/furacao', label: 'landing-sem-cupom' },
    { route: '/obrigado', label: 'obrigado' },
    { route: '/termos-de-uso', label: 'termos' },
    { route: '/politica-de-privacidade', label: 'privacidade' },
    { route: '/politica-de-reembolso', label: 'reembolso' },
  ];

  for (const vp of VIEWPORTS) {
    console.log(`\n📐 Viewport ${vp.name}px — telas estáticas`);
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    watchErrors(page, `static@${vp.name}`);
    for (const { route, label } of staticRoutes) {
      await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 20000 });
      await axeScan(page, `${label}@${vp.name}`);
      if (vp.name === '320' || vp.name === '768') await shot(page, `${label}-${vp.name}`);
    }

    // Q1 (após clicar em começar)
    await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 20000 });
    await page.locator('button', { hasText: 'Descobrir meu padrão' }).click();
    await page.waitForTimeout(600);
    await axeScan(page, `q1@${vp.name}`);
    if (vp.name === '320') await shot(page, `q1-${vp.name}`);

    await ctx.close();
  }

  // ── 2. Fluxo completo do quiz (marco 2 + resultado) em 320 e 1280 ──
  for (const vp of [VIEWPORTS[0], VIEWPORTS[3]]) {
    console.log(`\n🧭 Viewport ${vp.name}px — fluxo completo do quiz (clique)`);
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    watchErrors(page, `fluxo@${vp.name}`);
    await runQuizFlow(page, vp.name, { scanMilestone: true, scanResult: true });

    // ── 2b. Landing com cupom VÁLIDO (sessão gerada pelo próprio fluxo) ──
    await page.goto(BASE + '/planner/furacao', { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(800);
    const countdownVisible = await page.locator('[role="timer"]').count();
    console.log(`  cupom válido: countdown ${countdownVisible ? 'visível ✅' : 'AUSENTE ❌'}`);
    await axeScan(page, `landing-cupom-valido@${vp.name}`);
    await shot(page, `landing-cupom-valido-${vp.name}`);

    // ── 2c. Landing com cupom EXPIRADO (timestamp no passado) ──
    await page.evaluate(() => {
      const past = Date.now() - 1000;
      localStorage.setItem(
        'quizCouponSession',
        JSON.stringify({ couponCode: 'QUIZ24H', createdAt: past - 86400000, expiresAt: past })
      );
    });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const expiredMsg = await page.getByText('Oferta com cupom expirou').count();
    console.log(`  cupom expirado: mensagem ${expiredMsg ? 'visível ✅' : 'AUSENTE ❌'}`);
    await axeScan(page, `landing-cupom-expirado@${vp.name}`);
    await shot(page, `landing-cupom-expirado-${vp.name}`);

    await ctx.close();
  }

  // ── 3. Teclado end-to-end (1280px): intro → 15 perguntas → marcos → resultado, só com teclas ──
  console.log('\n⌨️  Teclado end-to-end (1280px)');
  let keyboardOk = false;
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    watchErrors(page, 'teclado@1280');
    await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 20000 });

    // Tab até o botão de início, Enter para começar
    let started = false;
    for (let i = 0; i < 8 && !started; i++) {
      await page.keyboard.press('Tab');
      const txt = await page.evaluate(() => (document.activeElement && document.activeElement.textContent) || '');
      if (txt.includes('Descobrir meu padrão')) {
        await page.keyboard.press('Enter');
        started = true;
      }
    }
    if (!started) throw new Error('teclado: não alcançou o botão de início via Tab');
    await page.waitForTimeout(700);

    for (let qi = 0; qi < 15; qi++) {
      // autofocus (KAN-18) deixa o foco na primeira opção; Space seleciona
      await page.waitForTimeout(400);
      const tag = await page.evaluate(() => (document.activeElement && document.activeElement.tagName) || '');
      if (tag !== 'INPUT') {
        // fallback: 1 Tab leva ao grupo de rádios
        await page.keyboard.press('Tab');
      }
      await page.keyboard.press('Space');
      await page.waitForTimeout(1400); // microvalidação + next auto-focado (KAN-18)
      await page.keyboard.press('Enter'); // "Próxima pergunta" (focado automaticamente)
      await page.waitForTimeout(500);

      if (qi === 4 || qi === 9) {
        // Marco: botão de continuar não é auto-focado — Tab até ele
        let dismissed = false;
        for (let t = 0; t < 6 && !dismissed; t++) {
          await page.keyboard.press('Tab');
          const txt = await page.evaluate(() => (document.activeElement && document.activeElement.textContent) || '');
          if (txt.includes('Continuar') || txt.includes('Desbloquear')) {
            await page.keyboard.press('Enter');
            dismissed = true;
          }
        }
        if (!dismissed) throw new Error(`teclado: marco após Q${qi + 1} não alcançado via Tab`);
        await page.waitForTimeout(500);
      }
    }

    try {
      await page.locator('#result-cta').waitFor({ state: 'visible', timeout: 15000 });
      keyboardOk = true;
      await shot(page, 'teclado-resultado-1280');
      console.log('  resultado alcançado só com teclado ✅');
    } catch (e) {
      console.log('  resultado NÃO alcançado via teclado ❌');
    }
    await ctx.close();
  }

  await browser.close();

  // ── Relatório ──
  const totals = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  axeResults.forEach((r) =>
    r.violations.forEach((v) => {
      if (totals[v.impact] !== undefined) totals[v.impact]++;
    })
  );
  const out = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE,
    tags: TAGS,
    totals,
    keyboardEndToEnd: keyboardOk,
    pageErrors,
    scans: axeResults,
  };
  fs.writeFileSync(REPORT_JSON, JSON.stringify(out, null, 2), 'utf-8');

  console.log('\n' + '='.repeat(60));
  console.log(`  🔴 Critical: ${totals.critical} | 🟠 Serious: ${totals.serious} | 🟡 Moderate: ${totals.moderate} | ⚪ Minor: ${totals.minor}`);
  console.log(`  ⌨️  Teclado end-to-end: ${keyboardOk ? 'OK' : 'FALHOU'}`);
  console.log(`  🧨 Erros de página/console: ${pageErrors.length}`);
  console.log(`  📄 JSON: ${REPORT_JSON}`);
  console.log(`  🖼️  Screenshots: ${SHOT_DIR}`);

  if (totals.critical > 0 || totals.serious > 0 || !keyboardOk) process.exit(1);
}

main().catch((err) => {
  console.error('\n❌ Erro durante a auditoria:', err.message);
  process.exit(1);
});
