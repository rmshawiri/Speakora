# Speakora — rapport de correction V1.1

Livraison du 29 septembre 2026. Ce rapport remplace les constats V1 devenus obsolètes. L’e-mail admin approuvé est conservé sans modification ; la confirmation visiteur est un modèle séparé.

## Production et Git

- Site : https://speakora.morashawiri.com/
- Application : https://speakora.morashawiri.com/app
- Contact : https://speakora.morashawiri.com/#contact
- Accès WordPress conservé : https://morashawiri.com/acceder-a-speakora/
- Secours public : https://speakora-nu.vercel.app/
- GitHub : https://github.com/rmshawiri/Speakora, branche `main`.
- Commit applicatif final poussé : `9d655d7027e11f279b98640add6b94d9818095e9` — `feat: complete visitor confirmation and production verification`.
- Déploiement Vercel : `dpl_XPomrWHB2f9RAgrxswiNKjLGn4JT`, état **READY**, associé aux deux domaines publics ci-dessus.
- URL technique : https://speakora-7j8wpog8t-eq-shawiri.vercel.app (protection Vercel conservée).

Les preuves et visuels sont enregistrés dans un commit documentaire suivant ce commit applicatif. Son identifiant est donné dans le récapitulatif final et dans l’historique Git. Aucun changement applicatif n’est intervenu après le déploiement vérifié.

## Formulaire et deux e-mails

Le formulaire public utilise une fonction Node Vercel et le SMTP configuré côté serveur. Les secrets restent privés. Validation, limites de taille, liste de sujets autorisés, contrôle d’origine, jeton signé, piège anti-robot, limitation et déduplication sont actifs. Le bouton est désactivé pendant l’envoi ; les retours sont annoncés aux technologies d’assistance.

Le succès nécessite l’acceptation SMTP du mail admin. Un refus admin retourne 502 : aucune confirmation visiteur n’est envoyée et le texte reste dans le formulaire. Si seul l’accusé de réception échoue, l’écran confirme la transmission de la demande mais signale clairement l’échec de la confirmation, sans inviter à renvoyer le formulaire. Hors ligne, une erreur explicite conserve le texte ; aucun envoi différé silencieux.

**Admin :** modèle centré validé inchangé, objet `[Speakora] {Sujet}`, expéditeur « Speakora — MORA Shawiri », Reply-To du visiteur. Son intégrité est contrôlée contre le commit approuvé `9ae4b36` dans `admin-template-validation.json`.

**Visiteur :** nouveau modèle HTML premium, largeur 640 px, en-tête violet/mauve centré, remerciement, confirmation, rappel du sujet, date, réponse dès que possible et signature Speakora / MORA Shawiri. Objet : « Nous avons bien reçu votre message — Speakora ». Reply-To officiel. Le contenu libre du visiteur n’est pas réexpédié dans cet accusé de réception. HTML à tableaux, styles inline, version texte, sans JavaScript ni CSS externe, avec solution de repli Outlook.

**Test réel autorisé :** une seule soumission sur le domaine canonique, le 29 septembre à 23:39 aux Comores (20:39 UTC). HTTP 200 ; **les deux messages ont été acceptés par le SMTP**. L’adresse officielle `contact@morashawiri.com` a servi de visiteur de test : elle reçoit donc le mail admin et l’accusé visiteur. Le succès affiché confirme l’envoi de la confirmation. Preuve : `contact-dual-production-v11.json`, référence `SPEAKORA-V11-DEUX-EMAILS-20260929`.

Les aperçus `Email V1.1/email-utilisateur-ordinateur.png`, `email-utilisateur-mobile.png` et le HTML utilisent la date de cet envoi réel. Ils sont des rendus Chromium du modèle, pas des captures d’une boîte de réception. Aucun débordement à 760, 390 et 320 px. La réception en boîte et le rendu natif Gmail/Outlook de ce dernier test n’ont pas été vérifiés indépendamment ; l’utilisateur avait confirmé le mail admin précédent.

## Identité, PWA et présentation

- Logos officiels conservés, proportions d’origine, sans recréation ni détourage approximatif. Support blanc net en mode sombre ; intégration dans la barre latérale, l’en-tête mobile et la landing.
- Favicon et icônes 192/512 issus du visuel officiel ; manifest, `name`, `short_name` et titre de l’outil : **Speakora**.
- Installation réelle Chromium dans un profil isolé, lancement en fenêtre autonome et titre Speakora vérifiés sur la production. Le raccourci Windows existant a également été renommé **Speakora**, sans suppression de progression ; son icône officielle a été inspectée. Preuves : `pwa-installed-v11.json`, `desktop-shortcut-v11.json`, `brand-assets-v11.json`.
- Mode sombre de l’application : navigation, réglages, champs, cartes, boutons, textes, états correct/incorrect et branding contrôlés. La landing et son formulaire gardent la présentation claire de leur charte.
- Résultat mobile compact, actions visibles, espaces et alignements ajustés ; navigation clavier et absence de débordement contrôlées de 320 à 1440 px.

## Hors ligne et progression

Après un premier chargement connecté, fermeture complète du navigateur puis redémarrage hors ligne : l’application s’ouvre, une leçon complète peut être terminée et les 70 XP restent présents après un second redémarrage hors ligne. Test refait sur le domaine canonique après le dernier déploiement (`offline-restart.json`). Le service worker est versionné et ne met jamais l’API de contact en cache.

Les 15 leçons et 82 exercices sont parcourus dans les tests, avec les quatre formats, déblocages, plafond de 1 120 XP, reprise, import/export et confirmation de réinitialisation. Une révision n’attribue pas deux fois les mêmes XP. La progression reste locale à l’appareil.

## Visuels livrés

**Cinq captures stratégiques seulement**, rafraîchies depuis la production :

1. `04 Captures/Sur PC/01-landing.png` — page publique.
2. `04 Captures/Sur PC/02-parcours-sombre.png` — écran principal sombre.
3. `04 Captures/Sur PC/03-contact.png` — formulaire.
4. `04 Captures/Sur Mobile/01-lecon.png` — exercice.
5. `04 Captures/Sur Mobile/02-resultat.png` — résultat réel de la leçon.

**Deux affiches entièrement recomposées, 1080 × 1080 px**, dans `04 Captures/Affiches campagne/` :

- `01-apprendre.png` — « Osez votre premier Hello. » : typographie forte, dégradé violet, logo officiel, exercice réel et correction Hello, CTA.
- `02-hors-connexion.png` — « Votre anglais. Même hors ligne. » : composition distincte, résultat réel explicitement présenté comme exemple, CTA et conditions de fonctionnement hors ligne.

Les sources HTML autonomes sont fournies. Les composants de l’application proviennent de captures réelles, sans modification des scores ni du DOM. Les affiches ne promettent ni certification ni résultat garanti. Les textes principaux restent lisibles à la taille d’un fil mobile. Les conditions hors ligne précisent le premier chargement connecté et la disponibilité des voix sur l’appareil.

## Tests et preuves

| Contrôle | Résultat |
|---|---|
| TypeScript et build Vite | Réussite |
| Tests unitaires/serveur | 23 réussites |
| Suite navigateur locale | 12 scénarios réussis |
| Production, domaine Vercel public | 11 réussites initiales ; délai de navigation dépassé pour le scénario d’accessibilité ; relance ciblée réussie, soit les 12 scénarios distincts vérifiés |
| Accessibilité axe WCAG A/AA sur les écrans testés | Aucune violation détectée après chargement, modes clair/sombre inclus |
| Formulaire production | Deux e-mails acceptés SMTP ; affichage de succès réel |
| Refus SMTP | Connexions TCP réelles à un serveur local contrôlé : refus admin 550 et refus de confirmation 550, comportements corrects |
| API publique | Jeton 200 sans cache ; absence de jeton/origine interdite 403 ; champs invalides/piège anti-robot 400 |
| Routes publiques | 12 réponses HTTP 200 : six routes sur chacun des deux domaines |
| PWA et offline canoniques | Installation autonome, nom, redémarrages hors ligne et progression vérifiés |
| Logos, captures, affiches | Inspection visuelle, proportions et dimensions contrôlées |
| Secrets et Git | Analyse des fichiers suivis, contrôle du diff et push réalisés |

Preuves principales : `final-verification-v11.json`, `browser-production-full-v11.json` (échec de navigation initial conservé), `browser-results.json` (relance d’accessibilité), `http-production.json`, `contact-production-v11.json`, `contact-dual-production-v11.json`, `offline-restart.json`, `pwa-installed-v11.json` et `03 Etat livraison.json`.

Les erreurs/succès client interceptés dans certains tests navigateur sont des simulations explicitement nommées. Ils complètent les tests SMTP réels contrôlés et la soumission réelle en production ; ils ne sont pas présentés comme des e-mails envoyés. Aucune panne SMTP de production n’a été volontairement provoquée.

## Limites connues

- Délais réseau intermittents observés pendant certaines navigations depuis l’environnement de test ; les échecs sont conservés. Les contrôles ciblés et les routes publiques ont ensuite réussi. Cela ne constitue pas une garantie de disponibilité continue.
- Limitation anti-abus et déduplication en mémoire par instance, sans stockage distribué.
- Pas de validation visuelle native dans Gmail/Outlook, ni d’installation physique Android/iOS ; vérifications navigateur et Windows seulement. L’acceptation SMTP ne prouve pas le classement en boîte de réception.
- Audio hors ligne selon les voix disponibles ; transcription conservée. Pas de synchronisation de progression entre appareils.
- Les anciens rapports Lighthouse concernent la V1 et ne sont pas présentés comme de nouvelles mesures V1.1.

La production a été vérifiée au-delà du seul état READY : navigation, apprentissage, formulaire réel, e-mails, API, installation et redémarrages hors ligne.
