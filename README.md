# SLN Transport Privé — site vitrine

Site statique (HTML/CSS/JS) d'un chauffeur privé VTC à Montpellier, réalisé par Webgineer.

- `index.html` — version française
- `en/index.html` — version anglaise
- `js/main.js` — coordonnées (`CONFIG`), grille tarifaire (`TARIF`) et calculateur d'estimation
- `css/style.css` — styles

Brouillon en validation : la balise `noindex` est à retirer au lancement définitif.

## Génération des pages
Les `<head>`, en-têtes et pieds de page, les pages services, les pages légales, `sitemap.xml`, `robots.txt` et `llms.txt` sont générés par `../tools/build.py` (hors dépôt). Relancer `python3 tools/build.py` depuis `Clients/SLN-Transport` après toute modification de contenu.
Au lancement : passer `DRAFT = False` (retire le `noindex`) et mettre à jour `BASE` avec le nom de domaine définitif.
