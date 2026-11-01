const { test, expect } = require('@playwright/test');

const pages = [
  '/',
  '/pages/accompagnement.html',
  '/pages/attentions-locales.html',
  '/pages/contact.html',
  '/pages/faq.html',
  '/pages/guide-brouage.html',
  '/pages/guide-mornac.html',
  '/pages/guide-rochefort.html',
  '/pages/guide-royan.html',
  '/pages/guide-saintes.html',
  '/pages/guide-talmont.html',
  '/pages/guides.html',
  '/pages/methode.html',
  '/pages/secteur.html',
  '/pages/services.html'
];

for (const route of pages) {
  test(`la page ${route} se charge`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response, `Aucune réponse HTTP pour ${route}`).not.toBeNull();
    expect(response.status(), `Statut HTTP de ${route}`).toBe(200);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/.+/);
  });
}

test('la page d’accueil ne déclenche pas d’erreur JavaScript', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
});
