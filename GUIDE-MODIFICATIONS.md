# 📖 Guide de modification du site Santonis (pour Antigravity)

Bienvenue dans le guide de gestion de votre site web **Santonis** ! Ce document a été conçu spécialement pour vous permettre de modifier, faire évoluer et enrichir votre site très simplement en dialoguant avec l'assistant **Antigravity**, sans aucune connaissance technique préalable.

---

## 🚀 Règle d'or : Comment tester votre site en local ?

Votre site est **100 % autonome et statique**. Il ne nécessite aucun serveur, aucun terminal, ni aucune installation de logiciel complexe.

👉 **Pour voir le site :**
1. Rendez-vous dans votre dossier `Santonis-v2`.
2. **Double-cliquez simplement sur le fichier `index.html`**.
3. Le site s'ouvre immédiatement dans votre navigateur préféré (Chrome, Edge, Safari, Firefox).
4. Dès que vous demandez une modification à Antigravity, **actualisez simplement la page (touche F5)** dans votre navigateur pour constater le résultat !

---

## 💬 Exemples de demandes (Prompts) à formuler à Antigravity

Vous pouvez copier-coller ou adapter ces phrases directement dans votre conversation avec Antigravity.

---

### 1. Modifier un texte

> **Exemple de prompt :**
> *"Dans la page de présentation (pages/presentation.html), remplace le paragraphe qui commence par 'Moi, c’est Mandy' par le texte suivant : [Votre nouveau texte]"*

> **Autre exemple :**
> *"Sur la page d'accueil (index.html), modifie la phrase d'accroche sous le titre principal par : 'Conciergerie privée pour résidences de charme en Charente-Maritime'."*

---

### 2. Ajouter ou changer une image

Toutes les images du site sont classées dans le dossier `images/`.

**Étape préalable :**
Déposez votre nouveau fichier image (au format `.jpg`, `.png` ou `.webp`, avec un nom en minuscules sans accents ni espaces, ex : `mandy-portrait.jpg`) dans le sous-dossier correspondant (ex : `images/mandy/` ou `images/accueil/`).

> **Exemple de prompt :**
> *"J'ai déposé une photo nommée `portrait-mandy.jpg` dans le dossier `images/mandy/`. Peux-tu l'ajouter sur la page `pages/presentation.html` à la place du logo carré, avec la légende 'Mandy, votre interlocutrice dédiée' ?"*

> **Autre exemple :**
> *"Remplace la photo principale du guide de Saintes (`pages/guide-saintes.html`) par l'image `saintes-quais.jpg` que je viens de placer dans `images/guides/`."*

---

### 3. Modifier les coordonnées de contact (Téléphone, E-mail, Adresse)

Les coordonnées du site (notamment dans le pied de page et sur la page Contact) sont centralisées.

> **Exemple de prompt :**
> *"Peux-tu mettre à jour mes coordonnées sur tout le site avec mon vrai numéro de téléphone : 06 12 34 56 78 et mon adresse e-mail : contact@santonis-conciergerie.fr ?"*

*(Antigravity mettra à jour à la fois le fichier `js/layout.js` pour le pied de page automatique et la page `pages/contact.html`).*

---

### 4. Modifier le menu de navigation ou le pied de page (Footer)

Le menu du haut et le footer du bas sont définis à **un seul endroit** dans le fichier `js/layout.js`. Lorsque vous modifiez ce fichier, la modification s'applique instantanément à **toutes les pages** du site.

> **Exemple de prompt pour ajouter une page au menu :**
> *"J'ai créé une nouvelle page `pages/tarifs.html`. Peux-tu l'ajouter dans le menu de navigation dans `js/layout.js`, juste après 'Nos offres' avec l'intitulé 'Tarifs' ?"*

> **Exemple pour modifier le footer :**
> *"Dans le footer (`js/layout.js`), modifie la phrase de description pour indiquer : 'Conciergerie haut de gamme à Corme-Royal et sur la côte charentaise'."*

---

### 5. Changer les couleurs du site ou la typographie

Toutes les couleurs et les polices sont rangées tout en haut du fichier `css/style.css` sous forme de variables faciles à lire.

> **Exemple de prompt pour changer une couleur :**
> *"Dans `css/style.css`, je voudrais remplacer la couleur cuivrée d'accentuation `--accent` par un bleu océan plus doux : `#3b6e8c`."*

> **Autre exemple :**
> *"Peux-tu éclaircir légèrement le fond général du site `--paper` pour qu'il soit un blanc un peu plus lumineux ?"*

---

### 6. Ajouter une question à la Foire aux Questions (FAQ)

> **Exemple de prompt :**
> *"Dans la page FAQ (`pages/faq.html`), ajoute une nouvelle question dans la partie propriétaires : 'Proposez-vous un service de blanchisserie écologique ?' avec comme réponse : 'Oui, nous sélectionnons des partenaires locaux privilégiant des produits respectueux de l’environnement.'."*

---

## 📁 Rappel des règles de nommage des fichiers

Pour que le site fonctionne toujours de manière impeccable :
1. **Toujours des minuscules** : `ma-photo.jpg` (pas `Ma Photo.JPG`).
2. **Pas d'accents** : `accueil.jpg` (pas `accuèil.jpg`).
3. **Pas d'espaces** : utilisez des tirets du 6 `-` pour séparer les mots (ex : `vue-estuaire.jpg`).

---

## 💡 Besoin d'aide pour toute autre modification ?
Ouvrez simplement Antigravity et dites-lui ce que vous souhaitez accomplir en langage naturel : il s'occupera d'adapter le code proprement en préservant le design et la fluidité de votre site !
