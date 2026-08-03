# Cabinet Dentaire DENTOFOS

Site vitrine du cabinet dentaire DENTOFOS — 2 Avenue René Cassin, 13270 Fos-sur-Mer.

Site statique (HTML/CSS, sans dépendance ni build).

## Structure

- `index.html` — page principale
- `mentions-legales.html` — mentions légales
- `assets/style.css` — feuille de style

## Développement local

```bash
python -m http.server 8137
```

Puis ouvrir http://localhost:8137

## Déploiement

**GitHub Pages** (actuel) — publication automatique à chaque push sur `main`.

**Firebase Hosting** (prévu, compte du cabinet) :

```bash
firebase login
firebase deploy --only hosting
```
