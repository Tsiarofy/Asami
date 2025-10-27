# Asami
<<<<<<< HEAD

**Asami** est une application mobile développée avec [Expo](https://expo.dev/) et React Native, conçue pour répondre au besoin d'un groupe de chorale souhaitant faciliter la gestion et l'accès à leurs partitions de chansons.

## Objectif

Ce projet a été créé pour permettre à une chorale de :
- Centraliser les partitions et paroles de chansons
- Rechercher rapidement un titre ou une partition
- Ajouter ou supprimer facilement des chansons via un espace administrateur
- Accéder aux partitions depuis un smartphone, une tablette ou le web
- Bénéficier d'une interface moderne avec gestion du thème clair/sombre

## Fonctionnalités

- 🔍 Recherche de chansons par titre
- 📂 Catégorisation des chansons (par table SQLite)
- 👁️ Affichage des paroles
- ➕ Ajout de nouvelles chansons via un espace admin sécurisé
- 🗑️ Suppression de chansons existantes
- 🎨 Thème clair/sombre personnalisable
- 📱 Compatible Android, iOS et Web

## Installation

1. **Cloner le dépôt :**
   ```sh
   git clone https://github.com/Tsiarofy/asami.git
   cd asami
   ```

2. **Installer les dépendances :**
   ```sh
   npm install
   ```

3. **Lancer l’application :**
   ```sh
   npm start
   ```
   Ou pour une plateforme spécifique :
   ```sh
   npm run android
   npm run ios
   npm run web
   ```

## Structure du projet

- `app/` : Pages principales (accueil, admin, ajout, suppression, affichage des paroles)
- `component/` : Composants réutilisables (boutons, cartes, barre de recherche, etc.)
- `constant/` : Fichiers de constantes (couleurs, ombres, opacités)
- `configuration/` : Gestion de la base de données SQLite
- `context/` : Contexte global pour le thème
- `assets/` : Images et polices

## Technologies

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [Expo Router](https://expo.github.io/router/docs/)
- [React Navigation](https://reactnavigation.org/)

## Scripts utiles

- `npm start` : Démarre le projet Expo
- `npm run android` : Lance sur un appareil Android
- `npm run ios` : Lance sur un simulateur iOS
- `npm run web` : Lance la version web
- `npm run lint` : Lint le code

## Personnalisation

- Les couleurs et thèmes sont configurables dans `constant/color.ts` et `context/themeContext.tsx`.
- Les catégories de chansons sont gérées via des tables SQLite (voir `configuration/openDatabase.tsx`).

## Auteur

- [Tsiarofy](https://github.com/Tsiarofy)


## Confidentialité des données

> **Note** : La base de données `song.db` fournie dans ce dépôt contient uniquement des données fictives. Les données réelles de la chorale ne sont pas exposées afin de préserver leur confidentialité.

## Licence

Ce projet utilise la licence MIT. Les polices Roboto sont sous licence SIL Open Font License (voir `assets/fonts/OFL.txt`).