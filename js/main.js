/**
 * ==========================================================================
 * SANTONIS — INTERACTIONS JAVASCRIPT (main.js)
 * ==========================================================================
 * 
 * Effets légers, sans dépendance externe :
 * 1. Apparition progressive des éléments au défilement (IntersectionObserver)
 * 2. Header adaptatif au scroll (réduction et ombre portée)
 * 3. Menu burger animé accessible sur mobile
 * 4. Défilement fluide (Smooth Scroll)
 * 5. Validation et simulation du formulaire de contact (100% hors-ligne)
 * ==========================================================================
 */

(function () {
  'use strict';

  /* ========================================================================
     1. GESTION DU HEADER AU DÉFILEMENT (OMBRE ET COMPACITÉ)
     ======================================================================== */
  function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let ticking = false;

    function updateHeader() {
      const scrollY = Math.max(0, window.scrollY || window.pageYOffset);
      header.classList.toggle('is-scrolled', scrollY > 30);

      const localStrip = document.querySelector('.local-strip');
      const drawer = document.getElementById('mobile-drawer');
      const menuOpen = drawer && drawer.classList.contains('is-open');

      // Le header commence à disparaître dès le premier pixel de scroll
      // et se masque entièrement sur une courte distance. En remontant,
      // il réapparaît naturellement en suivant le scroll.
      if (menuOpen) {
        header.style.setProperty('--header-scroll-offset', '0px');
        header.style.setProperty('--header-scroll-opacity', '1');
      } else {
        const headerHeight = header.offsetHeight || 1;
        const hideDistance = Math.max(1, headerHeight * 1.5);
        const progress = Math.min(1, Math.max(0, scrollY / hideDistance));
        header.style.setProperty('--header-scroll-offset', (progress * headerHeight) + 'px');
        header.style.setProperty('--header-scroll-opacity', String(1 - progress));
      }

      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', updateHeader);

    // Contrôle initial au chargement.
    updateHeader();
  }

  /* ========================================================================
     2. GESTION DU MENU BURGER MOBILE
     ======================================================================== */
  function initBurgerMenu() {
    // Délégation d'événement car le header est injecté par layout.js
    document.addEventListener('click', function (event) {
      const burgerBtn = event.target.closest('#burger-button');
      const mobileDrawer = document.getElementById('mobile-drawer');

      if (burgerBtn && mobileDrawer) {
        const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
        const nextState = !isExpanded;

        burgerBtn.setAttribute('aria-expanded', String(nextState));
        burgerBtn.setAttribute('aria-label', nextState ? 'Fermer le menu' : 'Ouvrir le menu de navigation');
        mobileDrawer.setAttribute('aria-hidden', String(!nextState));

        if (nextState) {
          mobileDrawer.classList.add('is-open');
          document.body.style.overflow = 'hidden';
        } else {
          mobileDrawer.classList.remove('is-open');
          document.body.style.overflow = '';
        }
      }

      // Fermeture lors du clic sur un lien du tiroir mobile
      const mobileLink = event.target.closest('.nav-mobile-link');
      if (mobileLink && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
        const burger = document.getElementById('burger-button');
        if (burger) {
          burger.setAttribute('aria-expanded', 'false');
          burger.setAttribute('aria-label', 'Ouvrir le menu de navigation');
        }
        mobileDrawer.classList.remove('is-open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });

    // Fermeture avec la touche Échap
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        const mobileDrawer = document.getElementById('mobile-drawer');
        const burgerBtn = document.getElementById('burger-button');
        if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
          mobileDrawer.classList.remove('is-open');
          mobileDrawer.setAttribute('aria-hidden', 'true');
          if (burgerBtn) {
            burgerBtn.setAttribute('aria-expanded', 'false');
            burgerBtn.focus();
          }
          document.body.style.overflow = '';
        }
      }
    });
  }

  /* ========================================================================
     3. APPARITION PROGRESSIVE AU SCROLL (INTERSECTION OBSERVER)
     ======================================================================== */
  function initScrollReveal() {
    // Respect des préférences utilisateur de réduction de mouvement
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealElements = document.querySelectorAll('.reveal');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el, index) => {
      // Décalage en cascade automatique pour les éléments frères dans une grille
      const parentGrid = el.closest('.offers-grid, .services-featured-grid, .extras-grid, .process-grid, .guides-grid, .towns-list');
      if (parentGrid) {
        const siblings = Array.from(parentGrid.children);
        const elIndex = siblings.indexOf(el);
        if (elIndex >= 0) {
          el.style.setProperty('--delay', `${(elIndex % 3) * 100}ms`);
        }
      }
      observer.observe(el);
    });
  }

  /* ========================================================================
     4. GESTION DU FORMULAIRE DE CONTACT (LOCAL & DÉMONSTRATION)
     ======================================================================== */
  function initContactForm() {
    const contactForm = document.getElementById('santonis-contact-form');
    if (!contactForm) return;

    const alertStatus = document.getElementById('form-status-alert');

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Validation HTML5 native
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      // Vérification du consentement RGPD
      const rgpdCheckbox = contactForm.querySelector('input[name="consent_rgpd"]');
      if (rgpdCheckbox && !rgpdCheckbox.checked) {
        if (alertStatus) {
          alertStatus.className = 'form-status-alert is-error';
          alertStatus.textContent = 'Veuillez cocher la case de consentement pour envoyer votre demande.';
          alertStatus.style.display = 'block';
        }
        rgpdCheckbox.focus();
        return;
      }

      // Simulation d'envoi réussi
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Envoyer';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Envoi en cours…';
      }

      setTimeout(() => {
        if (alertStatus) {
          alertStatus.className = 'form-status-alert is-success';
          alertStatus.innerHTML = '<strong>Merci pour votre message !</strong><br>Votre demande a été simulée avec succès. En phase de production, elle sera directement transmise à la messagerie de Mandy.';
          alertStatus.style.display = 'block';
        }

        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }

        // Faire défiler doucement jusqu'au message de confirmation
        if (alertStatus) {
          alertStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 500);
    });
  }

  /* ========================================================================
     5. BOUTON DE RETOUR EN HAUT (À PARTIR DE L'ACCOMPAGNEMENT)
     ======================================================================== */
  function initBackToTop() {
    const triggerSection = document.querySelector('#accompagnement.section.offers-section');
    if (!triggerSection) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Remonter en haut de page');
    button.setAttribute('title', 'Remonter en haut de page');
    button.innerHTML = '<span aria-hidden="true">↑</span>';
    document.body.appendChild(button);

    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const updateVisibility = () => {
      const triggerTop = triggerSection.getBoundingClientRect().top + window.scrollY;
      button.classList.toggle('is-visible', window.scrollY + window.innerHeight * 0.35 >= triggerTop);
    };

    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    updateVisibility();
  }

  /* ========================================================================
     5. DÉMARRAGE DES SCRIPTS
     ======================================================================== */
  function start() {
    initHeaderScroll();
    initBurgerMenu();
    initScrollReveal();
    initContactForm();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})();
