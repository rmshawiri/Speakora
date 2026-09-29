# Speakora

Application d’entraînement à l’anglais par MORA Shawiri. Interface française, activités anglaises, 5 niveaux, 15 leçons et 82 exercices.

## Démarrer

Node.js 24 recommandé. Depuis `03 Codes` :

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview -- --port 4173
npm run test:e2e
```

La page publique est `/`, l’application `/app`. Les CTA d’accès de la page publique pointent exclusivement vers `https://morashawiri.com/acceder-a-speakora/`.

## Organisation

- `src/data/` : contenus JSON par niveau et types des exercices ; IDs stables.
- `src/core/progress.ts` : scores, déblocage, XP, dates locales, import/export validé.
- `src/core/audio.ts` : voix anglaises locales prioritaires, effets optionnels.
- `src/app.ts` : interface et parcours pédagogique.
- `index.html` : contenu public directement indexable.
- `src/styles.css`, `src/learning.css` : charte responsive et thèmes.
- `src/pwa.ts`, `scripts/build-sw.mjs` : installation et cache versionné.
- `tests/`, `e2e/` : tests du moteur, parcours navigateur et accessibilité.

## Règles pédagogiques

Une leçon se valide à 60 %. Étoiles à 60/75/90 %. Toutes les leçons précédentes doivent être validées pour débloquer la suivante. Une leçon terminée (même à retravailler) valide la journée. La série utilise les dates locales et expire après une journée sans activité.

Les XP d’une leçon valent 10 × meilleur nombre de bonnes réponses, avec 20 XP supplémentaires pour un sans-faute. Seule la différence est gagnée lors d’une amélioration. Plafond actuel : 1 120 XP. Une révision sans amélioration donne 0 XP mais conserve son utilité et peut valider la journée.

Les niveaux ne certifient pas le CECRL. La V1 est un parcours d’entraînement, pas une formation complète A1–C1.

## Sauvegarde et sécurité

Progression locale versionnée, validation des scores, dates et ordre des leçons. Sauvegarde JSON limitée à 1 Mo. Import et réinitialisation confirmés. Les chaînes sont échappées avant insertion dans l’interface. Les erreurs de stockage sont visibles. La leçon en cours reste dans `sessionStorage`, les scores terminés dans `localStorage`.

Pas de collecte de progression ni de compte. En V1.1, le formulaire de contact transmet les coordonnées et le message à MORA Shawiri par SMTP sécurisé, uniquement sur soumission. Les fichiers de comptes et `.local` sont exclus de Git. Ne jamais déposer un jeton dans le code, un rapport ou une variable exposée au navigateur.

## PWA et mises à jour

Tester sur le build de production : le serveur de développement n’installe pas le service worker. Celui-ci précache le HTML des deux routes, les données intégrées au bundle, la police locale et les images. Un nouveau cache s’installe atomiquement. Une bannière propose la mise à jour, après la fin ou la pause de la leçon. Les anciens caches Speakora sont supprimés après activation.

L’audio dépend des voix disponibles sur l’appareil ; une transcription accessible permet toujours de continuer. La PWA peut être installée via le navigateur lorsqu’il le permet. Le bouton personnalisé n’apparaît qu’après `beforeinstallprompt`.

## Déploiement Vercel

Importer le dépôt en choisissant `03 Codes` comme Root Directory, `Vite`, build `npm run build`, sortie `dist`. La configuration de réécriture `/app` et les en-têtes sont dans `vercel.json`. Configurer en variables chiffrées de production les huit clés de `.env.example` : SMTP et `CONTACT_FORM_SECRET` (32 octets aléatoires minimum). Aucun préfixe `VITE_` pour ces secrets.

La V1.1 doit déployer les sources avec `api/contact.js`, `server/contact.mjs` et les dépendances Node : une livraison de `dist` seul ne fournit pas le formulaire. Le service worker est généré à chaque build ; il ne met jamais l’API en cache. Si l’origine canonique change, adapter les métadonnées HTML, la liste d’origines autorisées du formulaire, `robots.txt` et `sitemap.xml`.

## Formulaire de contact V1.1

`GET /api/contact` délivre un jeton signé valable une heure. `POST /api/contact` valide l’origine, le type JSON, les tailles, les champs et le piège anti-robot. Destinataire et expéditeur sont fixés côté serveur ; l’adresse du visiteur devient `Reply-To`. L’e-mail contient un modèle HTML avec styles inline et une version texte de secours. Les contenus visiteurs sont échappés ; les sauts de ligne sont préservés. L’expéditeur est « Speakora — MORA Shawiri », le sujet reste `[Speakora] {Sujet}`, la date utilise Indian/Comoro. Les erreurs SMTP restent confidentielles et ne sont jamais présentées comme une réussite. La limitation à trois demandes par IP sur dix minutes et la déduplication sont en mémoire par instance : elles ne constituent pas une protection distribuée. Pour un trafic important, ajouter une règle de limitation dans Vercel Firewall.

`npm run dev` et `npm run preview` servent le client. L’API nécessite Vercel ou `vercel dev` avec les variables privées locales. Les tests de formulaire utilisent un transport simulé pour éviter tout envoi involontaire. L’authentification SMTP se vérifie séparément avec `transporter.verify()` sans envoyer de message.

## Visuels V1.1

`node scripts/capture.mjs` génère cinq captures stratégiques depuis la production (origine remplaçable avec `TEST_BASE_URL`). `node scripts/posters.mjs` crée deux affiches 1080 × 1080 avec les logos officiels et ces captures. Les images du logo horizontal sont conservées telles quelles sur un support blanc, sans détourage ni déformation. `name`, `short_name` et le titre de l’outil sont `Speakora`. Un ancien raccourci peut attendre la mise à jour du navigateur ; exporter sa progression avant toute désinstallation qui effacerait les données.

## Ajouter du contenu

Ajouter une leçon dans le JSON de niveau, avec un ID unique, une catégorie, un conseil et plusieurs exercices typés. Écrire une explication précise pour chaque réponse. Pour un type supplémentaire, étendre l’union `Exercise`, le rendu et la vérification dans `app.ts`, puis les tests. Conserver les IDs existants pour préserver les sauvegardes. Une modification incompatible du nombre d’exercices exige une migration du format de progression.

Une future intégration Capacitor pourra embarquer `dist` ; les règles métier et données sont indépendantes de l’hébergement.
