# Speakora — rapport de livraison

Date : 29 septembre 2026. Éditeur : MORA Shawiri. Slogan : « Apprenez. Pratiquez. Progressez. »

## Accès

- Landing Page : https://speakora.morashawiri.com/
- Application : https://speakora.morashawiri.com/app
- Secours public Vercel : https://speakora-nu.vercel.app/
- Application de secours : https://speakora-nu.vercel.app/app
- Page de capture externe : https://morashawiri.com/acceder-a-speakora/

**URL À METTRE DANS LA REDIRECTION FLUENT FORMS :**

https://speakora.morashawiri.com/app

Le formulaire WordPress n’a pas été modifié. Tous les CTA d’accès de la Landing Page pointent exactement vers la page de capture imposée. L’application ne conditionne pas techniquement son accès au formulaire.

## Architecture et organisation

Code dans `03 Codes/`, captures dans `04 Captures/`, rapports dans `05 Rapports/`. Les références et logos d’origine sont conservés. Un checkpoint Git initial a été créé avant le développement (`720ac4a`).

Vite + TypeScript, HTML statique indexable pour la Landing Page et application cliente autonome à `/app`. Aucun framework client lourd ni serveur applicatif nécessaire. Le choix privilégie la rapidité, un précache complet et une future intégration Capacitor. Une police Manrope locale et les logos officiels évitent les dépendances externes pour le rendu.

Le contenu est réparti dans cinq fichiers JSON, avec IDs stables et types TypeScript. Les règles de progression, les utilitaires, l’audio, le cache et l’interface sont séparés. Le README explique l’ajout de contenus et les commandes de développement.

## Fonctionnalités livrées

- Page publique responsive : présentation, fonctionnalités, niveaux, fonctionnement, hors connexion, installation conditionnelle, publics, FAQ, éditeur et coordonnées réelles.
- Application française d’apprentissage de l’anglais : A1, A2, B1, B2, C1 ; 15 leçons ; 82 exercices.
- QCM, phrases à compléter, écoute, reconstruction de phrases, aide pédagogique et explication spécifique pour chaque réponse.
- Scores, étoiles, meilleurs résultats, XP, série quotidienne, progression générale et niveaux successifs.
- Validation à 60 %, étoiles à 60/75/90 %. Les leçons précédentes doivent être validées avant de débloquer la suite.
- XP plafonnés au meilleur résultat : 10 par meilleure réponse correcte et 20 pour le sans-faute. Une amélioration accorde seulement la différence. Plafond V1 : 1 120 XP.
- Une journée compte après une leçon terminée ; aucune série créditée à l’ouverture. Calcul en dates locales.
- Persistance locale, reprise d’une leçon en pause dans le même onglet, statistiques, thèmes clair/sombre, effets sonores désactivables.
- Export JSON, import limité à 1 Mo avec validation de schéma, scores, dates et ordre de progression ; confirmation avant remplacement et réinitialisation.
- Stockage défaillant signalé à l’utilisateur. Les données invalides ne sont pas silencieusement acceptées.
- Anglais privilégié pour la synthèse vocale, préférence aux voix locales, transcription accessible en cas d’indisponibilité.

## PWA et hors connexion

Manifest avec nom, icônes PNG 192/512 dérivées du favicon fourni, thème, `standalone`, lancement `/app`. Le bouton d’installation apparaît uniquement lorsque le navigateur émet `beforeinstallprompt`. Des instructions sont présentes dans les paramètres.

Le service worker précache les deux pages, les bundles pédagogiques, la police et les ressources de marque. Le cache est versionné par empreinte des ressources et de l’implémentation du worker. Une mise à jour attend l’action de l’utilisateur et ne s’active pas au milieu d’un exercice.

Une correction spécifique normalise les réponses HTML redirigées par Vercel avant de les stocker : les URL propres continuent ainsi de fonctionner hors connexion.

**Vérification réelle sur le domaine public :** premier chargement en ligne, fermeture du processus navigateur, relance hors réseau, ouverture d’une leçon, exercice complet, sauvegarde de 70 XP, seconde fermeture et nouvelle relance toujours hors réseau avec les points conservés. Voir `offline-restart.json`.

Chromium ne signale aucune erreur de manifest, d’installabilité ou de navigateur dans `pwa-installability.json`. Cela confirme les critères techniques testés ; une installation manuelle sur appareil Android physique n’a pas été réalisée.

## SEO, performance et accessibilité

HTML public indexable, title, description, canonical, Open Graph, image officielle, Twitter Card, robots.txt et sitemap. Données structurées Organization et WebApplication sans avis ni statistiques inventés. L’application porte `noindex,follow` ; les exercices ne créent pas de pages indexables.

La Landing Page exprime naturellement les usages de l’apprentissage de l’anglais et le contexte de Moroni/Comores. Les niveaux ne sont jamais présentés comme une certification officielle. La FAQPage n’a pas été ajoutée : les réponses sont présentes dans le HTML, sans promettre un résultat enrichi.

La version compilée est statique ; le JS applicatif compressé est d’environ 16,5 Ko, auquel s’ajoutent environ 2,4 Ko partagés et 9,9 Ko de CSS compressé. La police locale pèse environ 24,8 Ko. Aucun appel pédagogique vers un service tiers n’est nécessaire.

Audit Lighthouse 13.5.0 mobile sur le domaine de production : **performance 84/100, accessibilité 100/100, bonnes pratiques 100/100, SEO 100/100**. LCP 1,5 s ; CLS 0 ; TBT 650 ms. Mesure de laboratoire isolée, sans avertissement, conservée dans `lighthouse-mobile-isolated.json`. Le TBT reste un axe d’amélioration ; ces valeurs ne sont pas des Core Web Vitals mesurés chez de vrais utilisateurs. Une première mesure simultanée aux tests donnait 60/100 avec un avertissement de processeur lent ; elle est conservée dans `lighthouse-mobile.json` pour transparence. Son processus CLI a rencontré une erreur de nettoyage temporaire Windows après avoir écrit le rapport ; la mesure isolée via navigateur contrôlé s’est terminée correctement.

Navigation clavier, focus visible, intitulés accessibles, feedback textuel, réduction des animations, contrastes corrigés après audit axe-core. Aucun problème détecté par l’audit automatisé WCAG A/AA ciblé sur la page publique et le tableau de bord clair/sombre. Cet audit ne remplace pas un audit humain complet avec lecteur d’écran.

## Tests et preuves

- 9 tests unitaires : contenu, IDs, XP plafonnés, scores, étoiles, verrouillage, dates, imports malformés et persistance.
- 8 scénarios navigateur sur le domaine public : SEO/CTA/menu/images/responsive ; succès/échec/révision/thème ; complétion des 15 leçons ; pause/reprise ; import/export/reset/audio de secours ; hors connexion ; clavier/mobile ; accessibilité.
- Largeurs contrôlées : 320, 360, 390, 768 et 1440 px, sans défilement horizontal sur les écrans testés.
- HTTPS, `/`, `/app`, manifest, service worker, robots et sitemap contrôlés en HTTP 200 sur le domaine personnalisé et le domaine Vercel public de secours.
- Dépendances auditées : aucun problème signalé après mise à jour de Sharp.

Les résultats machine sont dans `browser-results.json`, `http-production.json`, `offline-restart.json` et `pwa-installability.json`. Les tests utilisent Chromium automatisé, pas un appareil Android physique. La qualité sonore réelle dépend des voix et haut-parleurs de l’appareil ; le mécanisme de secours est testé.

## GitHub et Vercel

Dépôt : https://github.com/rmshawiri/Speakora

Branche : `main`. Commits intermédiaires et vérification du SHA distant effectués. Les fichiers de comptes, `.env`, `.local`, `.vercel` et dépendances sont exclus de Git. Les jetons ne sont pas copiés dans le code ou les rapports. Un contrôle des fichiers suivis a été exécuté avant publication.

Projet Vercel : `speakora`, équipe `EQ Shawiri`. Le compte utilisé est celui des informations locales fournies ; le plugin connecté pointait vers un autre compte. Publication des fichiers statiques compilés via l’API Vercel avec référence au commit source. L’état READY ne suffit pas à la validation : les URL ont été ouvertes et testées en production.

Domaine personnalisé : `speakora.morashawiri.com`. CNAME configuré par le propriétaire vers `1408b1877621425f.vercel-dns-017.com`. Vercel indique `misconfigured: false`. HTTPS et accès public vérifiés.

Le lien `speakora-eq-shawiri.vercel.app` est protégé par la connexion Vercel : utiliser `speakora-nu.vercel.app` comme secours public. La protection des prévisualisations n’a pas été désactivée.

Cette livraison utilise un déploiement statique piloté par API. Le push GitHub n’est pas une preuve de déploiement automatique. Pour activer une intégration Git continue ultérieurement, sélectionner le dépôt et `03 Codes` comme Root Directory, commande `npm run build`, sortie `dist` ; le README décrit ce paramétrage.

Le fichier `03 Etat livraison.json` accompagne ce rapport avec le commit applicatif déployé et l’identifiant de la livraison. Le dernier commit Git peut inclure uniquement des rapports, tests et captures supplémentaires ; le commit applicatif est identifié séparément.

**Commit applicatif final vérifié :** `30ed1f7a30a46bbc750d2baa6ca376741cf1c772`.

**Déploiement final READY :** `dpl_GcEWUt62MFdwPjMFUxQnepTofkQz`. Les huit tests navigateur et le redémarrage hors ligne ont été rejoués après cette publication. Le bouton de validation reste fixe en bas de l’écran pendant une leçon mobile.

## Captures et campagne

- `04 Captures/Sur PC/` : page publique, parcours, exercice, correction, thème sombre et paramètres, avec captures plein écran complémentaires.
- `04 Captures/Sur Mobile/` : mêmes écrans en 390 × 844 px, captures complètes et vues écran.
- `04 Captures/Affiches campagne/` : deux affiches PNG 1080 × 1080, avec sources HTML autonomes. Composition à partir du logo officiel et d’une capture réelle d’exercice, sans fonctionnalités fictives.

Le dossier d’origine `Affiche Campagne` est conservé ; les livrables utilisent le chemin demandé `Affiches campagne`.

## Limites et suites recommandées

1. La V1 propose un parcours d’entraînement de 82 exercices, pas une formation CECRL exhaustive ni une certification.
2. La progression est liée au navigateur et à l’origine du site. Utiliser toujours le domaine personnalisé ; pour changer d’appareil ou de domaine, exporter puis importer la sauvegarde.
3. Sans export, la suppression des données du navigateur peut effacer les résultats. Il n’existe pas encore de synchronisation cloud ni de compte.
4. Le cache nécessite une première ouverture en ligne ; sa conservation dépend aussi de l’espace de stockage accordé par le navigateur.
5. L’audio hors ligne dépend des voix locales. La transcription garantit la continuité des activités.
6. Une recette sur un téléphone Android physique reste recommandée pour l’installation, les voix, le clavier et le confort tactile ; les formats mobiles ont été émulés et testés.
7. Enrichir progressivement les leçons après validation pédagogique, puis étudier la révision des erreurs, Capacitor et une synchronisation multi-appareils si nécessaire.

La seule configuration marketing à effectuer dans WordPress est de coller l’URL de l’application dans la redirection Fluent Forms.
