# Santonis-v2 — Site Statique Conciergerie

Version statique moderne, élégante et 100 % autonome du site de la conciergerie **Santonis** (Mandy à Corme-Royal, Charente-Maritime).

Conçu en **HTML5 sémantique, CSS3 moderne et JavaScript Vanilla**, sans aucune dépendance serveur, sans PHP et sans étape de compilation (aucun besoin de Node.js, npm, Webpack ou WordPress). Le site s'ouvre directement en double-cliquant sur `index.html`.

---

## 🗂 Arborescence du projet

```text
Santonis-v2/
├── index.html                   ← Page d'accueil / Landing page (aperçu de toutes les sections)
├── pages/                       ← Pages dédiées pour chaque section et guide
│   ├── accompagnement.html      ← Formules : Gestion complète & Prestations à la carte
│   ├── services.html            ← Détail des 6 prestations de conciergerie
│   ├── presentation.html        ← Présentation de Mandy & histoire de Santonis
│   ├── attentions-locales.html  ← Le panier d'accueil garni de produits du terroir
│   ├── methode.html             ← Méthode en 3 étapes (contact, devis, passation)
│   ├── secteur.html             ← Secteur géographique (Corme-Royal, Saintes, Royan, Rochefort)
│   ├── guides.html              ← Index des carnets de voyage de Charente-Maritime
│   ├── guide-saintes.html       ← Escapade à Saintes au fil de la Charente
│   ├── guide-royan.html         ← Escapade à Royan entre plage et architecture
│   ├── guide-rochefort.html     ← Escapade maritime à Rochefort et l'Arsenal
│   ├── guide-talmont.html       ← Escapade à Talmont-sur-Gironde
│   ├── guide-mornac.html        ← Escapade ostréicole à Mornac-sur-Seudre
│   ├── guide-brouage.html       ← Escapade historique et naturelle à Brouage
│   ├── faq.html                 ← Foire aux questions complète (propriétaires & voyageurs)
│   └── contact.html             ← Page de contact & formulaire de devis interactif
├── images/                      ← Toutes les ressources graphiques organisées par section
│   ├── logo/                    ← Logos Santonis et favicon SVG
│   ├── accueil/                 ← Photo d'ambiance du Hero d'accueil
│   ├── accompagnement/          ← Photos illustrant les formules
│   ├── services/                ← Photos des 3 prestations phares
│   ├── mandy/                   ← Espace réservé pour les futurs portraits de Mandy
│   ├── attentions-locales/      ← Photo du panier de bienvenue
│   ├── guides/                  ← Photos des 6 villes et guides de voyage
│   └── icones/                  ← Pictogrammes vectoriels SVG d'origine
├── css/
│   ├── style.css                ← Styles principaux, variables :root en tête et responsive
│   └── animations.css           ← Effets d'apparition progressifs et respect de prefers-reduced-motion
├── js/
│   ├── layout.js                ← En-tête (menu burger) et pied de page partagés en un lieu unique
│   └── main.js                  ← Apparitions au défilement, header sticky et formulaire
├── fonts/                       ← Polices locales DM Sans et Fraunces (avec licences OFL)
├── README.md                    ← Présentation technique du projet
└── GUIDE-MODIFICATIONS.md       ← Guide pas-à-pas avec exemples de prompts pour Antigravity
```

---

## 🎨 Identité Visuelle & Typographies

- **Vert forêt profond (`--ink: #243e37;`)** : texte principal, boutons et fonds d'en-têtes.
- **Ivoire chaud (`--paper: #f8f6ef;`)** : fond général reposant et doux.
- **Sable charentais (`--sand: #eae5d8;`)** : fonds de contraste pour les sections clés.
- **Cuivre or (`--accent: #a17e51;`)** : puces, accents et détails élégants.
- **Polices hébergées localement** :
  - *DM Sans* pour le texte courant (lisibilité et modernité).
  - *Fraunces* pour les grands titres éditoriaux de charme.

---

## 📐 Règles de nommage

- Noms de fichiers et dossiers toujours en **minuscules**, **sans espaces**, **sans accents**.
- Séparateur de mots : le tiret simple `-` (ex : `mon-image.jpg`, `ma-page.html`).
- Chemins relatifs stricts (`../` depuis le dossier `pages/`, `./` depuis la racine).

---

## 🛠 Prochaine étape : Déploiement en ligne

Cette version V1 est optimisée pour une consultation locale. Lors de la phase de mise en ligne :
- Le formulaire de contact dans `pages/contact.html` et sur `index.html` pourra être relié à un service d'envoi d'e-mails (Formspree, EmailJS, script PHP ou webhook SMTP).
- Un fichier de configuration serveur (`.htaccess` ou configuration Nginx/Vercel/Netlify) pourra être ajouté pour les redirections HTTPS et les en-têtes de cache.
