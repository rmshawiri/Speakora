# Speakora — rapport de correction V1.1

Révision du 29 septembre 2026, réalisée à partir des demandes V1.1 et des captures CAP_R01, CAP_R02 et du raccourci installé. Ce rapport complète et remplace les constats V1 devenus obsolètes, notamment l’absence de formulaire SMTP et l’ancien jeu de captures.

## Livraison et adresses

- Landing Page : https://speakora.morashawiri.com/
- Contact : https://speakora.morashawiri.com/#contact
- Application : https://speakora.morashawiri.com/app
- Accès WordPress conservé : https://morashawiri.com/acceder-a-speakora/
- Adresse Vercel publique de secours : https://speakora-nu.vercel.app/
- Dépôt : https://github.com/rmshawiri/Speakora, branche `main`.
- Référence du déploiement et du commit applicatif : `03 Etat livraison.json`.

## 1. Formulaire de contact réellement connecté

Une section Contact est intégrée à la Landing Page, avec son entrée de navigation, les coordonnées officielles, le nom, l’e-mail, le sujet et le message. Elle reste distincte de la page de capture WordPress. Tous les CTA d’accès conservent leur destination officielle.

Le formulaire transmet à une fonction Node Vercel `/api/contact`, puis à la messagerie SMTP fournie. Les huit variables nécessaires sont chiffrées et limitées à la production. Aucun mot de passe n’est inclus dans le client ni dans Git. Le destinataire et l’expéditeur sont fixés côté serveur ; le visiteur est placé en Reply-To. Le message est envoyé en HTML avec une version texte de secours.

Contrôles appliqués : validation serveur, limites de taille, sujets autorisés, refus des injections d’en-têtes, contrôle de l’origine, jeton signé expirant, piège anti-robot, déduplication et limitation des tentatives. La limitation et la déduplication sont locales à chaque instance, pas distribuées ; une règle Vercel Firewall supplémentaire serait appropriée en cas de trafic abusif important.

En cas d’erreur ou de connexion absente, le texte reste dans le formulaire ouvert. Aucun envoi n’est mis en attente silencieusement. Le bouton est désactivé pendant l’envoi et le retour est annoncé aux technologies d’assistance. Le succès exige une acceptation SMTP.

**Vérification réelle :** authentification SMTP et TLS validés, puis un unique e-mail de test envoyé depuis le formulaire public après autorisation explicite. Réponse HTTP 200 et acceptation SMTP confirmées. La réception de ce premier test a été confirmée par l’utilisateur. Référence du message : `SPEAKORA-V11-CONTACT-20260929`. Preuves dans `contact-production-v11.json`.

## 2. Logo officiel et intégration

Le faux assemblage icône + texte HTML a été remplacé par le fichier horizontal officiel, dans la barre latérale desktop et le nouvel en-tête mobile. La Landing Page et son aperçu utilisent également ce fichier. La PWA charge la même interface corrigée.

Les logos sont conservés sans détourage : leur fond blanc est intégré dans un support clair arrondi, y compris en thème sombre. Aucune recréation, recoloration, déformation ni suppression de détails. Le fichier horizontal publié est identique au fichier fourni. Les favicons et icônes 48/192/512 px sont dérivés uniquement du favicon officiel. L’icône du raccourci déjà installé a été extraite et contrôlée visuellement : il s’agit bien du symbole officiel.

## 3. Nom et vérification PWA

`name`, `short_name` et le titre de la page applicative sont **Speakora**. Le slogan reste utilisé dans les zones éditoriales, sans allonger le nom installé.

Une installation réelle de la production a été effectuée dans un profil Chromium isolé : installation réussie, lancement en fenêtre autonome confirmé par `display-mode: standalone`, titre **Speakora**, logo officiel et aucune erreur d’installabilité. Cette installation de test a ensuite été désinstallée de son seul profil isolé. Preuves dans `pwa-installed-v11.json`.

Le raccourci Chrome existant sur le bureau de cet ordinateur a été renommé **Speakora.lnk**, en préservant sa cible, son profil et son identifiant d’application. Aucune donnée de progression n’a été effacée. Preuve dans `desktop-shortcut-v11.json`.

Sur d’autres appareils déjà équipés de l’ancienne version, le navigateur peut différer l’actualisation du nom. Fermer puis rouvrir l’application et accepter la mise à jour proposée. Le comportement d’installation Android/iOS n’a pas été vérifié sur des appareils physiques pendant cette révision.

## 4. Mode sombre et mobile

Harmonisation des teintes de navigation, XP, série, calendrier, leçons validées, catégories, étoiles, avertissements, actions secondaires et boutons sensibles. Supports du logo adaptés au sombre, contours de focus visibles, cartes et panneaux cohérents. Les réponses correctes et incorrectes gardent leur distinction et leur lisibilité.

L’en-tête mobile porte désormais le vrai logo. L’écran de résultat a été compacté pour rendre visibles le score, les XP et le bouton de poursuite dans un écran 390 × 844. La typographie des questions évite les guillemets français isolés en début de ligne. Le moteur, les contenus pédagogiques et le format des sauvegardes restent compatibles avec V1.

## 5. Captures retenues : cinq seulement

Les seize anciennes captures répétitives ont été remplacées par cette sélection de cinq écrans issus de la production. Aucune longue capture mobile intégrale :

| Fichier sous `04 Captures` | Choix |
|---|---|
| `Sur PC/01-landing.png` | Première vue représentative, proposition de valeur et CTA |
| `Sur PC/02-parcours-sombre.png` | Écran principal, logo officiel et cohérence sombre |
| `Sur PC/03-contact.png` | Nouvelle section Contact, cadrée sur son contenu |
| `Sur Mobile/01-lecon.png` | Exercice réel et action accessible |
| `Sur Mobile/02-resultat.png` | Score, XP et poursuite du parcours |

## 6. Deux nouvelles affiches premium

Dans `04 Captures/Affiches campagne/` :

- `01-apprendre.png` : « L’anglais ouvre des portes. Osez. »
- `02-hors-connexion.png` : « Moins de réseau. Toujours plus d’élan. »

Format vérifié : **1080 × 1080 px**. Direction artistique violette, fonds profonds, halo et trame discrets, hiérarchie typographique renforcée, accent chaud sur l’appel à l’action, logo officiel sur support clair et captures réelles de l’application. Les conditions du hors-ligne et l’absence de certification sont indiquées sans promesse de fonctionnalité inexistante. Les versions HTML autonomes sont conservées pour modifier les compositions.

## 7. Vérifications

- Compilation TypeScript et build Vite réussis ; 18 tests unitaires du moteur, du serveur et du modèle HTML réussis.
- **11 tests navigateur réussis** dans la suite finale sur l’alias public du même déploiement de production : branding desktop/mobile, manifest, formulaire en succès simulé et erreurs, accessibilité, thèmes, clavier, largeurs 320–1440 px, 15 leçons complètes, 82 exercices, plafonnement à 1 120 XP, pause, import/export, audio alternatif et hors-ligne.
- Audit automatique WCAG A/AA sans violation détectée sur Landing Page, application, paramètres, progression et réponses en thème sombre. Cet audit automatique ne remplace pas un audit humain exhaustif.
- Contrôle réel des refus API : jeton absent, champs invalides, piège anti-robot et origine étrangère ; aucune de ces requêtes n’envoie d’e-mail.
- Hors-ligne : fermeture du processus navigateur, redémarrage sans réseau, leçon terminée avec 70 XP, second redémarrage toujours hors ligne avec progression conservée.
- PWA : installation et lancement autonome réels ; aucune erreur de manifest ni d’installabilité, zéro erreur JavaScript lors du contrôle dédié.
- HTTP : les six ressources contrôlées sur chacun des deux domaines publics répondent 200, avec HTTPS et en-têtes de sécurité.
- Secrets : fichiers de comptes exclus et scan des fichiers suivis incluant jetons GitHub/Vercel et mot de passe SMTP.

Plusieurs passes sur le domaine personnalisé ont rencontré des délais réseau intermittents avant le chargement des pages ; leurs échecs sont conservés dans `browser-network-retry-v11.json`. Les deux adresses IPv4 Vercel du domaine et les deux de l’alias ont ensuite répondu HTTP 200 lors d’un contrôle TLS direct. La suite complète finale utilise l’alias Vercel public, qui sert le même déploiement. Le formulaire réel, l’installation PWA et le hors-ligne après redémarrage sont également vérifiés sur le domaine officiel. Le contrôle dédié `canonical-smoke-v11.json` vérifie ses images, ses CTA, son formulaire et son affichage mobile ; les délais d’une précédente passe restent visibles dans `browser-canonical-landing-v11.json`. Le test d’images a aussi été corrigé pour faire défiler les images chargées à la demande avant de vérifier leur décodage. Les preuves de la dernière passe sont enregistrées dans `browser-results.json`, `http-production.json`, `offline-restart.json`, `pwa-installability.json` et les rapports V1.1 cités plus haut.

Les rapports Lighthouse antérieurs restent des mesures historiques de V1 ; ils ne sont pas présentés comme des mesures V1.1.

## 8. Maintenance

La V1.1 nécessite le déploiement des sources et de la fonction `api/contact.js`, avec Nodemailer et les variables SMTP. Un simple envoi de `dist` ne suffit plus. Le README décrit cette configuration et les scripts reproductibles. Le service worker ne stocke jamais l’API de contact. Les données pédagogiques demeurent locales et aucune synchronisation de progression n’a été ajoutée.

## 9. Complément : e-mail HTML premium

À la demande de l’utilisateur après réception du premier test, ajout d’un modèle e-mail à tableaux, entièrement stylé en ligne. En-tête dégradé #6D5CFF → #A855F7 avec fond violet uni de repli ; nom Speakora, slogan, titre demandé ; carte nom/e-mail/sujet/date ; message dans un bloc distinct ; mention de provenance et signature MORA Shawiri. Toutes les couleurs officielles demandées sont présentes.

L’expéditeur est « Speakora — MORA Shawiri », avec l’adresse d’envoi officielle configurée. Le sujet reste `[Speakora] {Sujet}`. La date est calculée côté serveur dans le fuseau Indian/Comoro. Les champs visiteurs sont échappés pour empêcher l’injection HTML ; les retours à la ligne sont conservés. Le MIME contient `text/plain` et `text/html`. Aucun JavaScript, CSS distant, police distante ou image distante.

Rendu navigateur vérifié à 760 px et 390 px ; essai à 320 px avec une chaîne de 5 000 caractères sans débordement. Les tableaux, attributs bgcolor, styles inline et encadrement conditionnel MSO visent Gmail et Outlook. Les clients Outlook classiques peuvent remplacer le dégradé par le fond violet uni et afficher les angles droits. Aucun test visuel natif Gmail/Outlook n’a été effectué : les PNG sont des aperçus du HTML, pas des captures de ces messageries. Référence de compatibilité : https://www.caniemail.com/features/css-linear-gradient/ ; format d’expéditeur : https://nodemailer.com/message/addresses.

Le nouveau test réel autorisé utilise la référence `SPEAKORA-V11-HTML-20260929`. Il a été envoyé le 29 septembre 2026 à 17 h 50 (Comores), accepté par SMTP avec une réponse HTTP 200. Son résultat est enregistré dans `contact-html-production-v11.json`. Le dossier `Email V1.1` contient le HTML du même message avec la date renvoyée par le serveur, les aperçus ordinateur/mobile et les contrôles de rendu.

## État final de livraison

Application et serveur HTML : commit `4e230a4ded520bb2344c211e2b51daa45b65c0c0`, déploiement `dpl_4gQQv8mwukWv2WvPLdimnAgXMA1x`, état READY. Les commits de documentation/captures ultérieurs ne modifient pas ce code de production. Audit npm des dépendances de production : zéro vulnérabilité signalée. Le rapport de la suite finale contient 11 réussites et aucun échec.
