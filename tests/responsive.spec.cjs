const { test, expect } = require('@playwright/test');

const routes = [
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

test.describe('Contrôles mobiles', () => {
  test.beforeEach(async ({ page }) => {
    test.skip((page.viewportSize()?.width || 1200) > 900,
      'Ces contrôles ciblent les viewports mobiles et tablettes');
  });

  for (const route of routes) {
    test(`aucun débordement horizontal sur ${route}`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth
      }));
      expect(dimensions.content, `Débordement sur ${route}: ${JSON.stringify(dimensions)}`)
        .toBeLessThanOrEqual(dimensions.viewport + 1);
    });
  }

  test('le menu burger s’ouvre, se ferme et libère le défilement', async ({ page }) => {
    await page.goto('/');
    const burger = page.locator('#burger-button');
    const drawer = page.locator('#mobile-drawer');

    await expect(burger).toBeVisible();
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
    await burger.click();
    await expect(burger).toHaveAttribute('aria-expanded', 'true');
    await expect(drawer).toHaveClass(/is-open/);
    await expect(drawer).toHaveAttribute('aria-hidden', 'false');
    expect(await page.locator('body').evaluate(el => getComputedStyle(el).overflow))
      .toBe('hidden');

    await page.keyboard.press('Escape');
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
    await expect(drawer).not.toHaveClass(/is-open/);
    await expect(drawer).toHaveAttribute('aria-hidden', 'true');
    await expect(burger).toBeFocused();
    expect(await page.locator('body').evaluate(el => getComputedStyle(el).overflow))
      .not.toBe('hidden');
  });

  test('les liens de navigation mobile ferment le menu', async ({ page }) => {
    await page.goto('/');
    await page.locator('#burger-button').click();
    await page.locator('#mobile-drawer .nav-mobile-link').first().click();
    await expect(page.locator('#mobile-drawer')).not.toHaveClass(/is-open/);
    await expect(page.locator('#burger-button')).toHaveAttribute('aria-expanded', 'false');
  });

  for (const route of routes.filter(path => path.includes('/guide-') && !path.endsWith('/guides.html'))) {
    test(`le lien de retour du guide reste visible sur ${route}`, async ({ page }) => {
      await page.goto(route);
      const backLink = page.locator('.guide-back-link');
      await expect(backLink).toBeVisible();
      const box = await backLink.boundingBox();
      expect(box).not.toBeNull();
      expect(box.y, 'Le lien de retour est trop haut ou masqué par le header')
        .toBeGreaterThan(70);
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width + 1);
    });
  }

  test('les images visibles de chaque page se chargent', async ({ page }) => {
    for (const route of routes) {
      await page.goto(route);
      const broken = await page.locator('img').evaluateAll(async images => {
        images.forEach(img => { img.loading = 'eager'; });
        await Promise.all(images.map(img => img.decode().catch(() => null)));
        return images.filter(img => img.naturalWidth === 0)
          .map(img => img.getAttribute('src'));
      });
      expect(broken, `Images non chargées sur ${route}`).toEqual([]);
    }
  });
});
