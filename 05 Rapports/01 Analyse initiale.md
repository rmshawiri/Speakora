# Speakora — analyse initiale

Références examinées : cahier des charges, contenu de la landing page, charte graphique, coordonnées, prototype LinguaFlow et les cinq images officielles. Les noms réels des fichiers priment sur les anciens chemins mentionnés dans certains documents.

Le dossier code est vide et aucun dépôt Git local n'existe au départ. Git et Node.js sont disponibles. Le dépôt distant indiqué est rmshawiri/Speakora. Les informations de comptes sont exclues de Git et ne sont jamais copiées dans les rapports.

## Architecture retenue

Vite + TypeScript, HTML statique pour la landing page, application autonome à /app, CSS partagé, données pédagogiques par niveau. Aucun serveur ni compte nécessaire pour la version locale. Cette architecture fournit du HTML directement indexable, un petit bundle, une mise en cache intégrale et une future intégration Capacitor possible.

Progression versionnée et validée, sauvegarde locale, export/import JSON, moteur pédagogique séparé de l'interface. Une leçon terminée compte comme activité quotidienne. Les XP récompensent uniquement l'amélioration du meilleur résultat de chaque leçon (plafond par leçon), les révisions conservent leur utilité pédagogique sans créer de points infinis.

PWA : manifest, icônes issues du favicon officiel, précache versionné des ressources compilées, activation des mises à jour à la demande. Les voix anglaises locales sont privilégiées ; une transcription reste accessible si l'audio échoue.

## Points à corriger dans le prototype

- Série comptée à l'ouverture, XP illimités, erreurs de stockage silencieuses.
- Données et interface monolithiques, absence de service worker et manifest.
- Leçon verrouillée dépendant seulement de sa voisine sans vérifier son niveau.
- Quelques formulations ambiguës ; les niveaux sont des repères pédagogiques, pas une certification CECRL.

## Parcours et validation

Tous les CTA d'accès de la landing page vont vers https://morashawiri.com/acceder-a-speakora/. L'application /app reste directement accessible. Pas de formulaire WordPress dupliqué.

Tests prévus : moteur (scores, XP, séries, verrouillage, import), parcours navigateur, responsive, clavier, audio de secours, persistance, service worker hors ligne, URL de production, captures réelles et rapport final.
