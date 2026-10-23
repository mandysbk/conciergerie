/**
 * ==========================================================================
 * SANTONIS — GESTION DU HEADER ET DU FOOTER COMMUNS (layout.js)
 * ==========================================================================
 * 
 * CE FICHIER EST LE SEUL ENDROIT OÙ SONT DÉFINIS :
 * 1. Les liens du menu de navigation (en haut)
 * 2. Le pied de page (en bas)
 * 
 * Pourquoi ce fichier ?
 * Pour modifier le menu ou le footer, vous n'avez besoin de modifier QU'ICI.
 * La modification apparaîtra automatiquement sur TOUTES les pages du site !
 * 
 * Il fonctionne 100% hors-ligne et en double-clic direct (file://).
 * ==========================================================================
 */

(function () {
  'use strict';

  /* ========================================================================
     1. CONFIGURATION DU MENU DE NAVIGATION
     Pour ajouter, modifier ou retirer un lien de navigation, modifiez la liste ci-dessous :
     - id     : identifiant unique de la page
     - label  : texte affiché dans le menu
     - url    : chemin relatif depuis la racine du site
     - isCta  : true pour afficher le bouton en style mis en valeur (ex: Contact)
     ======================================================================== */
  const NAV_ITEMS = [
    { id: 'accueil', label: 'Accueil', url: 'index.html' },
    { id: 'accompagnement', label: 'Les offres', url: 'pages/accompagnement.html' },
    { id: 'services', label: 'Les services', url: 'pages/services.html' },
    { id: 'attentions-locales', label: 'Expérience voyageurs', url: 'pages/attentions-locales.html' },
    { id: 'methode', label: 'Méthode', url: 'pages/methode.html' },
    { id: 'secteur', label: 'Secteur', url: 'pages/secteur.html' },
    { id: 'guides', label: 'Guides voyageurs', url: 'pages/guides.html' },
    { id: 'faq', label: 'FAQ', url: 'pages/faq.html' },
    { id: 'contact', label: 'Confier mon bien ↗', url: 'pages/contact.html', isCta: true }
  ];

  /* ========================================================================
     2. CONFIGURATION DES INFORMATIONS DU FOOTER
     Modifiez ici les coordonnées et textes du pied de page.
     ======================================================================== */
  const FOOTER_DATA = {
    baseline: 'Conciergerie locale à Corme-Royal.<br>Accompagnement global et prestations à la carte en Charente-Maritime.',
    phone: '06.29.56.06.80',
    phoneHref: 'tel:0629560680',
    email: 'santonis.conciergerie@outlook.fr',
    commune: 'Corme-Royal (17600) — Rayonnement : Saintes, Royan, Rochefort',
    copyright: '© Santonis · Conciergerie en Charente-Maritime · Tous droits réservés.',
    legalNote: 'Maquette locale Santonis-v2. Informations légales à compléter avant publication.'
  };

  /* ========================================================================
     3. CALCUL AUTOMATIQUE DU CONTEXTE DE LA PAGE COURANTE
     ======================================================================== */
  const body = document.body;
  // Détection de l'emplacement (racine ou dossier /pages/)
  const isInsidePages = body.dataset.dir === 'pages' || window.location.pathname.includes('/pages/');
  const currentPageId = body.dataset.page || 'accueil';
  
  // Préfixe pour remonter à la racine
  const rootPath = isInsidePages ? '../' : './';

  // Fonction pour calculer l'URL exacte d'un lien selon l'emplacement de la page courante
  function resolveUrl(targetUrl) {
    if (isInsidePages) {
      if (targetUrl === 'index.html') {
        return '../index.html';
      }
      if (targetUrl.startsWith('pages/')) {
        return './' + targetUrl.replace('pages/', '');
      }
      return '../' + targetUrl;
    } else {
      return './' + targetUrl;
    }
  }

  /* ========================================================================
     4. GÉNÉRATION DU HEADER
     ======================================================================== */
  function renderHeader() {
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    // Construction des liens desktop
    const desktopLinksHtml = NAV_ITEMS.map(item => {
      const href = resolveUrl(item.url);
      const isActive = item.id === currentPageId;
      const activeClass = isActive ? ' active' : '';
      const ariaCurrent = isActive ? ' aria-current="page"' : '';

      if (item.isCta) {
        return `<a class="nav-cta${activeClass}" href="${href}"${ariaCurrent}>${item.label}</a>`;
      }
      return `<li><a class="nav-link${activeClass}" href="${href}"${ariaCurrent}>${item.label}</a></li>`;
    }).join('');

    // Construction des liens mobile
    const mobileLinksHtml = NAV_ITEMS.map(item => {
      const href = resolveUrl(item.url);
      const isActive = item.id === currentPageId;
      const activeClass = isActive ? ' active' : '';
      const ariaCurrent = isActive ? ' aria-current="page"' : '';

      return `<li><a class="nav-mobile-link${activeClass}" href="${href}"${ariaCurrent}>${item.label}</a></li>`;
    }).join('');

    const logoSrc = `${rootPath}images/logo/logo-santonis-principal.png`;
    const homeUrl = isInsidePages ? '../index.html' : './index.html';

    headerEl.innerHTML = `
      <div class="shell header-container">
        <!-- Logo principal Santonis -->
        <a class="brand" href="${homeUrl}" aria-label="Santonis — Retour à l'accueil">
          <img src="${logoSrc}" alt="Santonis Conciergerie" width="180" height="180">
        </a>

        <!-- Navigation Desktop -->
        <nav class="nav-desktop" aria-label="Navigation principale">
          <ul class="nav-links">
            ${desktopLinksHtml}
          </ul>
        </nav>

        <!-- Bouton Burger Mobile -->
        <button class="burger-btn" id="burger-button" aria-label="Ouvrir le menu de navigation" aria-expanded="false" aria-controls="mobile-drawer">
          <span class="burger-icon" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      <!-- Tiroir mobile plein écran -->
      <div class="nav-mobile-drawer" id="mobile-drawer" aria-hidden="true">
        <ul class="nav-mobile-links">
          ${mobileLinksHtml}
        </ul>
        <div class="nav-mobile-footer">
          <p><strong>Santonis Conciergerie</strong></p>
          <p>${FOOTER_DATA.commune}</p>
        </div>
      </div>
    `;
  }

  /* ========================================================================
     5. GÉNÉRATION DU FOOTER
     ======================================================================== */
  function renderFooter() {
    const footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    const logoSrc = `${rootPath}images/logo/logo-santonis-principal.png`;
    const homeUrl = isInsidePages ? '../index.html' : './index.html';

    footerEl.innerHTML = `
      <div class="shell">
        <div class="footer-top">
          <!-- Colonne 1 : Marque & Description -->
          <div class="footer-brand-col">
            <a class="brand" href="${homeUrl}" aria-label="Santonis — Accueil">
              <img src="${logoSrc}" alt="Santonis Conciergerie" width="150" height="150" loading="lazy">
            </a>
            <p>${FOOTER_DATA.baseline}</p>
          </div>

          <!-- Colonne 2 : Liens rapides -->
          <div class="footer-col">
            <h4>Santonis</h4>
            <ul class="footer-nav-list">
              <li><a href="${resolveUrl('index.html')}">Accueil</a></li>
              <li><a href="${resolveUrl('pages/accompagnement.html')}">Les offres</a></li>
              <li><a href="${resolveUrl('pages/services.html')}">Les services</a></li>
              <li><a href="${resolveUrl('pages/attentions-locales.html')}">Expérience voyageurs</a></li>
            </ul>
          </div>

          <!-- Colonne 3 : Découvrir & Infos -->
          <div class="footer-col">
            <h4>Explorer</h4>
            <ul class="footer-nav-list">
              <li><a href="${resolveUrl('pages/methode.html')}">Notre méthode</a></li>
              <li><a href="${resolveUrl('pages/secteur.html')}">Secteur couvert</a></li>
              <li><a href="${resolveUrl('pages/guides.html')}">Guides voyageurs</a></li>
              <li><a href="${resolveUrl('pages/faq.html')}">Foire aux questions</a></li>
              <li><a href="${resolveUrl('pages/contact.html')}">Demande de devis</a></li>
            </ul>
          </div>

          <!-- Colonne 4 : Coordonnées -->
          <div class="footer-col">
            <h4>Contact</h4>
            <p style="font-size: 14.5px; color: rgba(255,255,255,0.8); line-height: 1.6;">
              ${FOOTER_DATA.commune}<br><br>
              E-mail : <a href="mailto:${FOOTER_DATA.email}">${FOOTER_DATA.email}</a><br>
              Tél : <a href="${FOOTER_DATA.phoneHref}">${FOOTER_DATA.phone}</a>
            </p>
          </div>
        </div>

        <!-- Bas de page : Copyright et mentions légales -->
        <div class="footer-bottom">
          <p>${FOOTER_DATA.copyright}</p>
          <p>${FOOTER_DATA.legalNote}</p>
        </div>
      </div>
    `;
  }

  /* ========================================================================
     6. INITIALISATION
     ======================================================================== */
  function initLayout() {
    renderHeader();
    renderFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
  } else {
    initLayout();
  }

})();
