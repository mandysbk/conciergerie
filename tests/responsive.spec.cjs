const { test, expect } = require('@playwright/test');

test('la page d’accueil reste dans la largeur de l’écran', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1);
});

test('le menu principal reste accessible sur mobile', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toBeVisible();
  const menu = page.locator('header nav, .mobile-menu, #mobile-menu').first();
  await expect(menu).toBeAttached();
});
