# Everything Roll Tide — V1.1 Mascot Edition

A free, mobile-friendly, **unofficial Alabama football fan companion** made with HTML, CSS, and JavaScript. No paid hosting, API key, or database is required for this preview.

## New in V1.1

- Original stadium elephant artwork prominently featured on the **Home** screen.
- New mascot-style round badge in the header and mobile bookmark icon.
- Alternate full-page mascot poster in `artwork/` for inspiration; it is **not** a live or clickable app screen.
- No changes to original football features or the anonymous dedication.

## Dedication

A dedicated tribute appears immediately beneath the main banner on the **Home** page. It celebrates two friends who love Alabama football, without naming them. The dedication is intentionally anonymous.

## Preview features

- Crimson Tide home dashboard with **2026 snapshot as of November 3, 2026**
- All 12 regular-season games, wins/losses and opponent filtering
- LSU game countdown (November 7, 2026, 2:30 PM Central)
- Select players from the 2026 official Alabama roster, plus featured Keelon Russell statistics
- Football history timeline and a limited, sourced question-and-answer library
- Playable six-question Tide trivia
- Friendly Auburn emergency button
- Two-friend score prediction feature saved **locally in the same browser**
- Links to official Alabama Athletics schedule, roster and championship records

## Publish with GitHub Pages

1. Create a new GitHub repository named `everything-roll-tide` (or your favorite name).
2. Upload **index.html**, **favicon.svg**, and the **assets** folder from this folder into the repository's **root directory**. Keep the files inside `assets/` together. (Upload the files inside this ZIP, not the ZIP itself.)
3. Commit the files.
4. In the repository, open **Settings → Pages → Build and deployment**.
5. Choose **Deploy from a branch**, branch **main**, folder **/(root)**, then save.
6. Your public address will normally be `https://YOUR-USERNAME.github.io/everything-roll-tide/` once GitHub publishes it.

## Accuracy and limitations

- Football data is a **fixed November 3, 2026 snapshot** from Alabama Athletics and does **not** auto-refresh yet.
- Trivia and answer-library questions work; this is **not an AI chatbot** or open-ended factual search.
- Player section is a featured subset, not a full stats database.
- Picks are saved with browser `localStorage` and **do not synchronize across phones**. Shared friend competition will need an online data store or another service.
- This is not an official Alabama Athletics application. Do not copy university logos, licensed photos or media without permission.

## Sources

- Schedule: https://rolltide.com/sports/football/schedule
- Roster: https://rolltide.com/sports/football/roster
- Keelon Russell: https://rolltide.com/sports/football/roster/russell-keelon/17477
- Championship history: https://rolltide.com/sports/2016/6/10/trads-national-championships-html

## Next steps

1. Test mobile layout and verify data.
2. Add updates from a dependable licensed or permitted college football data provider.
3. Expand all player statistics and game box scores.
4. Make two-friend predictions work across devices using a backend.
5. Add a sourced AI Alabama football Q&A feature only when the backend, cost and key-security arrangements are established.