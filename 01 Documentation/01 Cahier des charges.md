# CAHIER DES CHARGES — SPEAKORA

**Nom du projet :** Speakora  
**Slogan :** *Apprenez. Pratiquez. Progressez.*  
**Éditeur :** MORA Shawiri  
**Type de produit :** Application web progressive d’apprentissage de l’anglais  
**Déploiement prévu :** Vercel  
**Sous-domaine prévu :** `speakora.morashawiri.com`  
**Approche :** Responsive, mobile-first, PWA et offline-first  
**Document de référence initial :** `LinguaFlow.html`

---

# 1. Présentation du projet

Speakora est une application web interactive destinée à faciliter l’apprentissage progressif de l’anglais.

L’objectif est de proposer une expérience simple, moderne, motivante et accessible aussi bien sur ordinateur que sur smartphone.

Speakora devra permettre à l’utilisateur d’apprendre et de pratiquer l’anglais à travers différents niveaux, leçons et exercices interactifs tout en suivant sa progression.

L’application devra privilégier une expérience ludique inspirée des plateformes modernes d’apprentissage :

- progression par niveaux ;
- exercices courts et interactifs ;
- expérience utilisateur fluide ;
- gamification ;
- suivi de progression ;
- utilisation possible hors connexion ;
- interface adaptée aux smartphones ;
- fonctionnement sans installation obligatoire ;
- possibilité d’installation comme PWA.

Speakora sera développé à partir des bonnes idées fonctionnelles présentes dans le fichier d’inspiration `LinguaFlow.html`, sans simplement reproduire celui-ci.

---

# 2. Identité du produit

## 2.1 Nom

**Speakora**

Le nom LinguaFlow utilisé dans le prototype initial ne devra plus apparaître dans l’application finale.

---

## 2.2 Slogan

**Apprenez. Pratiquez. Progressez.**

Le slogan pourra apparaître notamment :

- sur la Landing Page ;
- sur l’écran d’accueil ;
- dans certains supports marketing ;
- dans les affiches de campagne.

---

## 2.3 Signature

Lorsque nécessaire, la marque pourra être présentée sous la forme :

**Speakora — par MORA Shawiri**

La présence de MORA Shawiri doit rester discrète et ne pas surcharger l’identité principale de Speakora.

---

# 3. Objectifs du projet

Speakora doit permettre de :

1. apprendre l’anglais progressivement ;
2. pratiquer régulièrement grâce à des exercices interactifs ;
3. suivre la progression de l’apprenant ;
4. encourager une utilisation quotidienne ;
5. proposer différents niveaux de difficulté ;
6. permettre une utilisation sur mobile et ordinateur ;
7. permettre l’utilisation des fonctions principales même sans connexion Internet ;
8. conserver localement la progression de l’utilisateur ;
9. offrir une expérience moderne et agréable ;
10. préparer une évolution future vers une véritable application Android.

---

# 4. Public cible

Speakora pourra être utilisé notamment par :

- les grands débutants ;
- les élèves ;
- les étudiants ;
- les professionnels ;
- les personnes souhaitant améliorer leur anglais ;
- les personnes préparant un voyage ;
- les personnes souhaitant pratiquer régulièrement ;
- les utilisateurs disposant d’une connexion Internet limitée ou irrégulière.

La conception doit rester suffisamment simple pour être comprise sans connaissances techniques.

---

# 5. Langue de l’interface

La langue principale de l’interface sera :

**Français**

La langue étudiée sera :

**Anglais**

Les instructions pédagogiques, menus, messages et explications devront être rédigés dans un français clair.

Les phrases, mots et exercices d’apprentissage utiliseront l’anglais selon le niveau concerné.

---

# 6. Référence fonctionnelle existante

Le fichier :

`LinguaFlow.html`

sera conservé dans :

`01 Documentation/`

et servira exclusivement de référence fonctionnelle et visuelle.

Le prototype comprend actuellement notamment :

- 5 niveaux ;
- 15 leçons ;
- 82 exercices ;
- système de progression ;
- XP ;
- série de jours ;
- scores ;
- étoiles ;
- verrouillage progressif ;
- exercices d’écoute ;
- QCM ;
- phrases à compléter ;
- remise de mots dans le bon ordre ;
- thème clair/sombre ;
- effets sonores ;
- confettis ;
- sauvegarde locale.

Ces éléments constituent une base de réflexion pour Speakora mais pourront être améliorés, corrigés ou réorganisés.

---

# 7. Structure pédagogique

## 7.1 Niveaux

La première version devra conserver une progression basée sur les niveaux :

- **A1 — Très débutant**
- **A2 — Débutant**
- **B1 — Intermédiaire**
- **B2 — Intermédiaire avancé**
- **C1 — Avancé**

L’architecture devra cependant permettre l’ajout futur d’autres niveaux, leçons ou contenus sans refonte majeure.

---

# 8. Organisation des apprentissages

La hiérarchie pédagogique sera :

**Niveau → Leçon → Exercices → Résultat**

Chaque niveau pourra contenir plusieurs leçons.

Chaque leçon devra contenir plusieurs exercices de types différents.

---

# 9. Types d’exercices

Speakora devra prendre en charge au minimum :

## 9.1 Choix multiple

Exemple :

> Comment dit-on « Bonjour » ?

L’utilisateur sélectionne une réponse parmi plusieurs propositions.

---

## 9.2 Phrase à compléter

Exemple :

> I ___ John.

L’utilisateur choisit le mot correct.

---

## 9.3 Compréhension orale

L’utilisateur écoute un mot ou une phrase en anglais puis choisit la réponse correspondante.

La lecture pourra utiliser les capacités vocales disponibles sur l’appareil ou le navigateur.

---

## 9.4 Remise en ordre

Plusieurs mots sont affichés dans un ordre aléatoire.

L’utilisateur doit les sélectionner afin de reconstruire correctement la phrase.

---

# 10. Évolutions pédagogiques souhaitées

L’architecture devra permettre ultérieurement d’ajouter :

- exercices de prononciation ;
- reconnaissance vocale ;
- dictées ;
- traduction ;
- vocabulaire illustré ;
- dialogues ;
- compréhension de textes ;
- fiches grammaticales ;
- révision des erreurs ;
- exercices personnalisés ;
- objectifs quotidiens ;
- vocabulaire thématique.

Ces fonctionnalités ne sont pas nécessairement obligatoires dans la première version.

---

# 11. Déblocage progressif

Les contenus ne devront pas obligatoirement être tous accessibles immédiatement.

Une logique de progression devra être utilisée.

Exemple :

- première leçon accessible ;
- leçon suivante débloquée après validation de la précédente ;
- niveau suivant débloqué après réalisation d’un nombre défini de leçons du niveau précédent.

Les règles devront rester faciles à ajuster dans le code.

---

# 12. Validation d’une leçon

Une leçon devra être considérée comme validée à partir d’un seuil défini.

Valeur initiale recommandée :

**60 % de bonnes réponses minimum.**

Si l’utilisateur échoue :

- son score est affiché ;
- il peut recommencer la leçon ;
- il peut retourner à la liste des leçons.

---

# 13. Score et résultats

Après chaque leçon, afficher notamment :

- score en pourcentage ;
- nombre de bonnes réponses ;
- nombre total d’exercices ;
- étoiles obtenues ;
- XP gagnés ;
- indication « validé » ou « à recommencer ».

Une représentation graphique du résultat pourra être utilisée.

---

# 14. Système d’étoiles

Proposition :

- **60 à 74 % :** ★
- **75 à 89 % :** ★★
- **90 à 100 % :** ★★★

Les seuils devront pouvoir être modifiés facilement.

---

# 15. XP

Speakora utilisera un système de points d’expérience.

Exemple :

**+10 XP par bonne réponse.**

Un bonus pourra être accordé lorsqu’une leçon est terminée sans erreur.

Toutefois, contrairement au prototype de référence, il faudra empêcher l’exploitation du système en répétant indéfiniment une leçon très simple pour générer un nombre illimité de XP.

Une distinction pourra être faite entre :

- première réussite ;
- révision ;
- répétitions ultérieures.

---

# 16. Série de jours

Speakora disposera d’un système de série quotidienne.

Exemple :

🔥 **7 jours de suite**

Une journée ne devra pas être comptabilisée simplement parce que l’utilisateur a ouvert l’application.

La série devra être validée après une véritable activité pédagogique, par exemple :

- terminer une leçon ;
- valider un exercice quotidien ;
- réaliser un minimum d’activités défini.

---

# 17. Progression

L’utilisateur devra voir clairement :

- ses XP ;
- sa série actuelle ;
- le nombre de leçons terminées ;
- son pourcentage de progression ;
- ses meilleurs scores ;
- les niveaux disponibles ;
- les niveaux verrouillés.

---

# 18. Accueil de l’application

La page principale de Speakora devra présenter :

- logo Speakora ;
- slogan ;
- progression générale ;
- XP ;
- série quotidienne ;
- niveaux disponibles ;
- niveau actuellement atteint ;
- appel à l’action principal.

Exemple :

**Continuer mon apprentissage**

Lorsque l’utilisateur possède déjà une progression, l’application pourra automatiquement lui proposer la prochaine leçon pertinente.

---

# 19. Expérience utilisateur

L’expérience devra être :

- intuitive ;
- fluide ;
- motivante ;
- moderne ;
- rapide ;
- visuelle ;
- adaptée aux écrans tactiles.

Les actions importantes devront rester faciles à atteindre avec le pouce sur smartphone.

---

# 20. Responsive Design

Speakora devra être entièrement responsive.

Les interfaces devront être testées au minimum sur :

- smartphone Android ;
- petit smartphone ;
- tablette ;
- ordinateur portable ;
- ordinateur de bureau.

Aucun élément ne devra :

- dépasser de l’écran ;
- être illisible ;
- nécessiter un zoom manuel ;
- provoquer un défilement horizontal injustifié.

---

# 21. Design

Le design devra être :

- moderne ;
- premium ;
- jeune ;
- éducatif ;
- dynamique ;
- rassurant.

Le projet pourra conserver certaines idées du prototype LinguaFlow :

- cartes arrondies ;
- dégradés ;
- animations légères ;
- couleurs par niveau ;
- statistiques sous forme de badges ;
- progression visuelle ;
- retours immédiats après réponse.

Toutefois, l’identité finale devra appartenir à Speakora.

---

# 22. Logo et favicon

Le logo officiel sera placé dans :

`02 Logo & Icône/`

Le favicon sera également placé dans ce dossier.

Ils devront être utilisés correctement dans :

- navigateur ;
- Landing Page ;
- application ;
- PWA ;
- manifest ;
- éventuelle version Android.

---

# 23. Thèmes clair et sombre

Speakora devra disposer de :

- thème clair ;
- thème sombre.

Le choix de l’utilisateur devra être enregistré localement.

---

# 24. Mode hors connexion

Le mode hors connexion est une exigence importante de Speakora.

Speakora devra adopter une architecture :

**Offline-first**

Une fois que l’utilisateur aura ouvert l’application avec Internet et que les ressources nécessaires auront été mises en cache, il devra pouvoir continuer à utiliser les principales fonctions pédagogiques sans connexion.

---

# 25. PWA

Speakora devra être transformé en Progressive Web App.

La PWA devra notamment disposer de :

- `manifest`;
- service worker ;
- cache des ressources essentielles ;
- icônes adaptées ;
- nom Speakora ;
- thème ;
- écran installable.

L’utilisateur pourra ainsi ajouter Speakora sur l’écran d’accueil de son téléphone.

---

# 26. Comportement hors ligne

Sans connexion Internet, les fonctions principales suivantes devront rester accessibles :

- ouverture de l’application déjà installée/cachée ;
- niveaux ;
- leçons ;
- exercices ;
- scores ;
- XP ;
- progression ;
- historique local ;
- thème ;
- ressources pédagogiques intégrées.

Une première visite avec Internet sera nécessaire pour charger l’application.

---

# 27. Ressources externes

Les dépendances essentielles ne devront pas dépendre obligatoirement d’un service externe.

Par exemple, les polices importantes pourront être hébergées localement dans le projet plutôt que chargées uniquement depuis Google Fonts.

L’objectif est d’éviter qu’une perte de connexion dégrade l’interface principale.

---

# 28. Stockage local

La première version pourra conserver la progression localement.

Technologies possibles :

- localStorage ;
- IndexedDB ;
- ou combinaison des deux selon les besoins.

Les données pourront contenir notamment :

- progression ;
- scores ;
- XP ;
- série ;
- paramètres ;
- thème ;
- statistiques.

---

# 29. Export de la progression

Speakora devra idéalement permettre :

**Exporter ma progression**

Le système générera une sauvegarde locale au format :

`.json`

---

# 30. Import de progression

Une fonction :

**Importer une sauvegarde**

permettra de restaurer une progression précédemment exportée.

Des contrôles devront vérifier la validité du fichier avant import.

---

# 31. Réinitialisation

Une fonction permettant de réinitialiser la progression devra être proposée.

Une confirmation devra être demandée afin d’éviter une suppression accidentelle.

---

# 32. Synchronisation en ligne

Pour la première version, un compte utilisateur en ligne n’est pas obligatoire.

Speakora devra cependant être conçu afin de pouvoir intégrer ultérieurement :

- Supabase ;
- comptes utilisateurs ;
- connexion ;
- synchronisation multi-appareils ;
- sauvegarde cloud ;
- statistiques centralisées.

---

# 33. Audio

Les exercices audio devront utiliser une prononciation anglaise adaptée.

Lorsque cela est possible, Speakora pourra utiliser la synthèse vocale disponible dans le navigateur.

Une solution de secours devra être prévue si la synthèse vocale n’est pas disponible.

---

# 34. Sons

Des sons courts pourront accompagner :

- bonne réponse ;
- mauvaise réponse ;
- réussite d’une leçon ;
- déblocage.

Ils devront rester :

- discrets ;
- rapides ;
- non agressifs.

Une option de désactivation pourra être prévue ultérieurement.

---

# 35. Animations

Speakora pourra utiliser des animations légères :

- progression ;
- apparition des cartes ;
- succès ;
- erreurs ;
- étoiles ;
- confettis ;
- déblocage.

Les animations ne devront jamais ralentir l’application.

---

# 36. Accessibilité

L’interface devra respecter les bonnes pratiques suivantes :

- contraste suffisant ;
- textes lisibles ;
- boutons suffisamment grands ;
- focus visible ;
- navigation clavier lorsque possible ;
- labels compréhensibles ;
- absence de dépendance exclusive à une couleur.

---

# 37. Landing Page

Une Landing Page publique devra présenter Speakora avant l’entrée dans l’application.

Son contenu détaillé sera stocké dans :

`01 Documentation/03 Contenu Landing Page.md`

La Landing Page devra présenter notamment :

- marque Speakora ;
- slogan ;
- problème auquel Speakora répond ;
- bénéfices ;
- fonctionnement ;
- niveaux ;
- fonctionnalités ;
- mode hors ligne ;
- captures ;
- appel à l’action.

CTA principal possible :

**Commencer à apprendre**

---

# 38. Accès à l’application

L’application pourra être accessible directement depuis :

`speakora.morashawiri.com`

La Landing Page et l’application pourront être intégrées au même projet avec une navigation adaptée.

---

# 39. Déploiement

Le projet sera hébergé sur :

**Vercel**

Workflow souhaité :

1. développement ;
2. tests ;
3. commit Git ;
4. push GitHub ;
5. déploiement Vercel ;
6. vérification en production ;
7. rapport.

---

# 40. GitHub

Le code source devra être versionné avec Git.

Le dépôt devra contenir uniquement les éléments nécessaires au projet.

Des commits réguliers devront être réalisés pendant le développement.

Exemples :

- `feat: create Speakora landing page`
- `feat: add offline learning mode`
- `feat: add progress tracking`
- `fix: correct mobile navigation`
- `docs: add final deployment report`

---

# 41. Informations sensibles

Les informations suivantes ne devront jamais apparaître directement dans un dépôt GitHub public :

- mots de passe ;
- clés API ;
- identifiants SMTP ;
- tokens ;
- secrets Vercel ;
- clés Supabase privées.

Ces informations seront conservées dans :

`01 Documentation/01 Informations techniques.txt`

uniquement dans l’environnement local lorsque nécessaire.

Dans le projet déployé, les secrets devront utiliser les variables d’environnement de Vercel.

---

# 42. SMTP

Des informations SMTP sont prévues dans la documentation technique.

Aucun usage spécifique obligatoire du SMTP n’est défini pour le moteur pédagogique initial.

Le SMTP pourra notamment servir ultérieurement à :

- formulaire de contact ;
- messages de support ;
- notifications ;
- récupération de compte ;
- autres fonctionnalités nécessitant l’envoi d’e-mails.

---

# 43. Sécurité

Les règles suivantes devront être appliquées :

- aucun secret dans le code client ;
- validation des données importées ;
- échappement des contenus injectés dans le DOM ;
- dépendances limitées ;
- HTTPS via Vercel ;
- protection des éventuelles API futures ;
- pas de mot de passe stocké en clair.

---

# 44. Performance

Speakora devra charger rapidement, notamment sur les connexions mobiles.

Objectifs :

- JavaScript maîtrisé ;
- images optimisées ;
- ressources compressées ;
- lazy loading lorsque pertinent ;
- cache PWA ;
- limitation des dépendances inutiles.

---

# 45. SEO

La Landing Page devra disposer au minimum de :

- title ;
- meta description ;
- Open Graph ;
- favicon ;
- canonical ;
- données structurées lorsque pertinent.

L’application pédagogique interne n’a pas besoin d’indexer chaque écran d’exercice.

---

# 46. Installation Android future

L’architecture devra permettre une transformation future en application Android.

Solutions envisageables :

- PWA installable ;
- Trusted Web Activity ;
- Capacitor ;
- autre solution adaptée.

Cette évolution ne devra pas nécessiter une reconstruction totale de Speakora.

---

# 47. Captures

Le dossier :

`04 Captures/`

contiendra :

### Affiches campagne
Visuels carrés et premium destinés notamment aux campagnes marketing.

### Sur Mobile
Captures réelles du fonctionnement de Speakora sur smartphone.

### Sur PC
Captures réelles de Speakora sur ordinateur.

---

# 48. Affiches de campagne

Les affiches devront être :

- carrées ;
- premium ;
- modernes ;
- cohérentes avec l’identité Speakora ;
- lisibles sur smartphone ;
- adaptées aux réseaux sociaux.

Dimensions recommandées :

**1080 × 1080 px**

Elles pourront présenter différentes fonctionnalités de Speakora.

---

# 49. Rapports

Les rapports seront placés dans :

`05 Rapports/`

Ils pourront inclure notamment :

- rapport de développement ;
- rapport de tests ;
- rapport responsive ;
- rapport PWA/offline ;
- rapport de déploiement ;
- rapport final.

---

# 50. Structure documentaire du projet

```text
Speakora/
│
├── 01 Documentation/
│   ├── 01 Informations techniques.txt
│   ├── 02 Cahier des charges.md
│   ├── 03 Contenu Landing Page.md
│   ├── 04 Coordonnées.txt
│   └── LinguaFlow.html
│
├── 02 Logo & Icône/
│   ├── Logo Speakora
│   └── Favicon Speakora
│
├── 03 Codes/
│
├── 04 Captures/
│   ├── Affiches campagne/
│   ├── Sur Mobile/
│   └── Sur PC/
│
└── 05 Rapports/
```

---

# 51. Tests fonctionnels

Les tests devront vérifier notamment :

- ouverture de l’application ;
- accès aux niveaux ;
- accès aux leçons ;
- verrouillage/déverrouillage ;
- QCM ;
- exercices à compléter ;
- exercices audio ;
- remise en ordre ;
- bonnes réponses ;
- mauvaises réponses ;
- calcul des scores ;
- XP ;
- étoiles ;
- progression ;
- série de jours ;
- thème sombre ;
- sauvegarde locale ;
- export JSON ;
- import JSON ;
- réinitialisation.

---

# 52. Tests hors connexion

Les tests devront comprendre :

1. ouverture avec Internet ;
2. installation/mise en cache ;
3. fermeture du navigateur ;
4. désactivation du Wi-Fi et des données mobiles ;
5. réouverture de Speakora ;
6. lancement d’une leçon ;
7. réalisation des exercices ;
8. sauvegarde de la progression ;
9. fermeture ;
10. nouvelle ouverture toujours hors connexion.

Le résultat attendu est que les fonctionnalités essentielles restent utilisables.

---

# 53. Tests responsive

Des contrôles devront être réalisés sur les principaux écrans :

- Landing Page ;
- accueil ;
- liste des niveaux ;
- liste des leçons ;
- exercice ;
- écran de résultat ;
- paramètres éventuels.

---

# 54. Compatibilité navigateur

Speakora devra fonctionner correctement sur les versions modernes de :

- Google Chrome ;
- Microsoft Edge ;
- navigateurs Android basés sur Chromium.

Une compatibilité raisonnable avec Firefox pourra également être recherchée.

---

# 55. Contenu pédagogique

Les contenus actuels du prototype pourront servir de base.

Cependant, Speakora ne devra pas rester limité à seulement quelques exercices par niveau.

L’architecture devra faciliter l’ajout progressif de dizaines puis de centaines d’exercices.

Le contenu devra être vérifié afin d’éviter :

- erreurs grammaticales ;
- mauvaises traductions ;
- ambiguïtés ;
- réponses multiples potentiellement correctes ;
- progression pédagogique incohérente.

---

# 56. Positionnement des niveaux

Les mentions A1, A2, B1, B2 et C1 devront être utilisées comme organisation pédagogique.

Tant que Speakora ne dispose pas d’un programme suffisamment complet, il ne faudra pas présenter la simple réalisation de quelques leçons comme une certification officielle d’un niveau CECRL.

Speakora est un outil d’apprentissage et de pratique.

---

# 57. Évolutivité

Speakora devra être pensé comme un produit évolutif.

Fonctionnalités futures possibles :

- comptes utilisateurs ;
- Supabase ;
- synchronisation cloud ;
- statistiques avancées ;
- notifications ;
- objectifs quotidiens ;
- calendrier de pratique ;
- badges ;
- classement ;
- reconnaissance vocale ;
- IA conversationnelle ;
- chatbot d’apprentissage ;
- cours premium ;
- abonnement ;
- certificats ;
- plusieurs langues ;
- application Android ;
- application iOS.

---

# 58. Principes de développement

Le développement devra respecter les principes suivants :

**Ne pas recommencer inutilement ce qui fonctionne.**

Le fichier LinguaFlow doit être étudié afin d’identifier et de conserver les bonnes idées.

Cependant, Speakora devra disposer :

- de sa propre identité ;
- de son propre code final ;
- d’une structure maintenable ;
- d’un véritable mode offline ;
- d’une architecture évolutive.

---

# 59. Priorités de la première version

Priorité 1 :

**Stabilité**

Priorité 2 :

**Expérience pédagogique**

Priorité 3 :

**Mobile**

Priorité 4 :

**Mode hors connexion**

Priorité 5 :

**Progression utilisateur**

Priorité 6 :

**Design premium**

Priorité 7 :

**Facilité d’évolution**

---

# 60. Critères de validation finale

Speakora pourra être considéré comme prêt pour sa première mise en production lorsque :

- l’identité Speakora est correctement intégrée ;
- aucun élément LinguaFlow destiné uniquement à l’inspiration ne subsiste visiblement ;
- la Landing Page est terminée ;
- les niveaux et leçons fonctionnent ;
- les exercices fonctionnent ;
- les scores sont fiables ;
- XP et progression sont fiables ;
- le système de série est fiable ;
- le responsive est validé ;
- la PWA est installable ;
- le fonctionnement hors connexion est validé ;
- les données locales persistent ;
- l’export/import fonctionne si intégré à cette version ;
- aucun secret n’est exposé ;
- GitHub est à jour ;
- Vercel est déployé ;
- `speakora.morashawiri.com` fonctionne ;
- les tests finaux sont réussis ;
- le rapport final est rédigé.

---

# 61. Résultat attendu

Le résultat final recherché est une application d’apprentissage de l’anglais moderne, rapide et agréable qui puisse être utilisée :

**sur le Web, sur mobile, sur ordinateur et, après une première installation/visite, même avec une connexion Internet absente ou instable.**

Speakora devra donner à l’utilisateur l’impression d’utiliser une véritable application plutôt qu’un simple site Internet.

---

# SPEAKORA

**Apprenez. Pratiquez. Progressez.**

*Un produit MORA Shawiri.*