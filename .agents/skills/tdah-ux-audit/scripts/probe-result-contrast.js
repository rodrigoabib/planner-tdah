/**
 * probe-result-contrast.js — sonda auxiliar do KAN-133.
 * Completa o quiz e roda axe (só color-contrast) na tela de resultado,
 * imprimindo failureSummary completo (ratio detectado + cores) por nó.
 *
 * Uso: QUIZ_URL=http://localhost:5199 node .agents/skills/tdah-ux-audit/scripts/probe-result-contrast.js
 */
const { chromium } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');

const BASE = process.env.QUIZ_URL || 'http://localhost:5199';

async function answerAndNext(page) {
  await page.locator('label.oc').first().click();
  await page.waitForTimeout(1400);
  const next = page.locator('button', { hasText: 'Próxima pergunta' });
  if (await next.count()) {
    await next.first().click();
    await page.waitForTimeout(400);
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 20000 });
  await page.locator('button', { hasText: 'Descobrir meu padrão' }).click();
  await page.waitForTimeout(500);
  for (let qi = 0; qi < 15; qi++) {
    await answerAndNext(page);
    if (qi === 4) {
      const b = page.locator('button', { hasText: 'Continuar' });
      await b.first().waitFor({ state: 'visible', timeout: 8000 });
      await b.first().click();
      await page.waitForTimeout(450);
    } else if (qi === 9) {
      const b = page.locator('button', { hasText: 'Desbloquear meu perfil' });
      await b.first().waitFor({ state: 'visible', timeout: 8000 });
      await b.first().click();
      await page.waitForTimeout(450);
    }
  }
  await page.locator('#result-cta').waitFor({ state: 'visible', timeout: 15000 });
  await page.waitForTimeout(1500); // garantir fim das animações de entrada

  const r = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
  console.log(`violações: ${r.violations.length} | incomplete: ${r.incomplete.length}`);
  for (const v of r.violations) {
    for (const n of v.nodes) {
      console.log('---');
      console.log('target:', JSON.stringify(n.target));
      console.log('summary:', n.failureSummary);
    }
  }
  await browser.close();
}

main().catch((e) => { console.error(e.message); process.exit(1); });
