# Everything Roll Tide — V1.6 · Depth Chart & App Updates

Football-only, unofficial Alabama fan companion. Built by James Meadows.

## V1.6 · November 6, 2026

- **1st & 2nd String has its own page.** The homepage shortcut and new top navigation entry open only the dedicated two-deep and coaching-staff screen, rather than the whole Stadium Guide. It has offense, defense, special teams, search, and individual stats when verified.
- **2026 Alabama coaching staff:** 14 coaches with listed roles, as published by Alabama Athletics at https://rolltide.com/sports/football/coaches/2026 . Read from that source as of November 6, 2026; staff may change.
- **Fan Zone stays in its original place.** Removed the extra bottom-navigation entry that was squeezing the original fan sections. The separate Stadium Guide remains available through the homepage feature tile.
- **What's in the App?** A persistent button opens a modal explaining every major app feature, release number, release date and version-by-version changes. It appears automatically once per newly released app version, tracked locally in the browser. Users can dismiss or reopen it.
- **Existing app preserved:** Big Al elephant homepage, dedication, builder credit, trivia, schedule, stadium section locator, tickets and medical/operations pages remain.
- **Accuracy note:** September 4 depth chart and November 3 player statistics are dated snapshots, NOT auto-updating live starters or stats. 2026 ticket prices are published face prices, NOT real-time offers.

## V1.5 · Big Al & depth-chart shortcut

- Changed the homepage history link to “Why an Elephant Named Big Al?” and added the name story.
- Added a “1st & 2nd String” homepage button beneath that link.

## V1.4 · Stadium and Fan Guide

- **First- and second-string depth chart:** opening-week chart published September 4, 2026; offense, defense and special teams. Some positions were co-listed as OR. The lineup is not a current injury report.
- **Player statistics:** verified figures from the November 3 snapshot where available, with links to updated statistics. Missing figures do not mean zero. Automatic updates require a validated data service, not yet enabled.
- **Team behind the scenes:** football operations, named coaching and sports medicine leaders, performance, equipment, video, nutrition and travel. Jeff Allen's 27 trainers are department-wide across sports—not a football-only count.
- **Bryant–Denny history:** timeline of official seating capacity changes since the 1929 opening and Saban Field dedication in 2024.
- **Stadium section guide:** enter 2026 section/row/seat for an approximate lower/upper section position; exact seat and gate must be verified on the official 2026 seating chart and ticket.
- **Ticket board:** official 2026 single-game face prices by opponent and seating level before sales tax; not a live availability or resale quote.

### New files
- `fan-guide.js` — optional isolated enhancement for tab, depth chart, section finder and ticket board.
- `fan-guide.css` — responsive styles for the guide.
- `index.html` — loads both new files. Original features preserved.

### Sources
- https://www.si.com/college/alabama/football/alabama-football-announces-2026-depth-chart
- https://rolltide.com/sports/football/coaches
- https://rolltide.com/sports/football/roster/staff/jeff-allen/1497
- https://rolltide.com/sports/2016/6/10/facilities-bryant-denny-html
- https://rolltide.com/sports/2025/12/15/2026-saban-field-at-bryant-denny-stadium-gate-and-section-numbering
- https://rolltide.com/sports/2016/6/10/tickets-m-footbl-html

## What's new in V1.3
- **🐘 Why the Elephant?** button on the homepage under the large elephant art; opens a sourced origin story including Red Elephants (1930), Big Al (1979), Million Dollar Band, cheerleaders, and Elephant Stomp.
- Ask a question in **History**; its answer now appears **directly below the question input and Ask button**, repeating the question and including a source link.
- Expanded offline football fact library with more topics and common variations. Unsupported questions are honestly identified instead of being answered with invented facts.
- Preserved: home artwork, mascot badge, original fan dedication, upper-left **Built by James Meadows**, schedule, player cards, Game Day, band, cheerleaders, road-game history, trivia, picks and Auburn joke.

## Install on GitHub Pages
Upload `index.html` to the root of `James7477/everything-roll-tide` (replacing the old file). No separate images are required because artwork is embedded in HTML. If Pages is enabled, the URL is https://james7477.github.io/everything-roll-tide/.

## Sources
- https://rolltide.com/sports/2016/6/10/big-al
- https://www.ua.edu/about/traditions/
- https://abook.sa.ua.edu/ua-traditions/history/million-dollar-band/
- https://rolltide.com/sports/2020/2/19/football-a-z-index
- https://rolltide.com/documents/download/2025/7/28/2025_Record_Book.pdf

## Limitations
This is not connected to an open-ended AI service. Questions are matched to a local sourced library. Scores and player statistics remain dated November 3, 2026, not live. All pages are unofficial, unaffiliated fan content. Live statistics, comprehensive question-answering, and voice wake on command require further development.