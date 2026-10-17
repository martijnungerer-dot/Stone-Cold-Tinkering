# Lokale leesproef — Altijd voorwaarts

De gebruiker heeft de bouw van een korte interactieve proef met de drie panelen expliciet goedgekeurd. Dit is een zelfstandige creatieve scène; er is geen nieuwe campagnegebeurtenis of spelregel uit afgeleid.

## Openen

De eenvoudigste versie is één bestand: `dist/reader-offline.html`, gemaakt met `npm run build`. Open dit bestand in een moderne browser. Beeld, vormgeving, tekst en bediening zitten erin; er is geen installatie, account of internetverbinding nodig om te lezen.

Voor verder ontwikkelen met Node.js 18 of nieuwer:

```text
npm start
```

De server meldt het lokale adres, doorgaans `http://127.0.0.1:4173`. Er zijn geen te installeren pakketten. `PORT` kan een andere lokale poort aanwijzen. Alleen readerbestanden en de gebruikte afbeelding worden aangeboden; de wereldbijbel, Git-gegevens en volledige campagnebronnen worden niet door deze server gedeeld.

## Wat werkt

- Drie afzonderlijke panelen uit werkbeeld v3, zonder het origineel te bewerken.
- Vorige, verder, opnieuw lezen en rechtstreekse paneelkeuze.
- Linker- en rechterpijl voor bladeren; geen automatisch afspelen.
- Klikken op Nicola of zijn tekstknop draait zijn hoofd naar de lezer en toont een lichtblauwe tekstballon in hetzelfde stripkader. Er is geen popup of verduistering. De ballon staat direct onder het beeld, met een staartje richting Nicola, zodat de illustratie op smalle schermen vrij blijft. Er zijn drie vast geschreven opmerkingen per paneel.
- Nogmaals klikken, het kruisje of Escape herstelt zijn gewone blik. Verder lezen blijft altijd mogelijk en sluit de ballon bij een paneelwisseling. Kruisje en Escape geven de focus terug aan de gebruikte knop.
- Een korte camerabeweging, stofdeeltjes en een lichte trilling bij het middelste paneel. Herhalen is optioneel. De beweging stopt vanzelf.
- Geluid staat standaard uit en wordt pas na een klik aangemaakt. Het is een korte, zacht gesynthetiseerde grind-/windlaag, zonder externe geluidsbestanden of spraak.
- De systeemvoorkeur voor minder beweging wordt gevolgd tot de lezer zelf een voorkeur kiest. Alleen die voorkeur wordt waar mogelijk lokaal bewaard.
- Een tekstversie met alle drie de panelen en alle optionele Nicola-opmerkingen.

## Grenzen van deze proef

De illustratie is één bestaande rasterplaat. Een afzonderlijke transparante hoofdtekening toont Nicola recht naar de lezer. De overgang van zijn oorspronkelijke blik naar die tekening duurt kort; het is nog geen volledig getekende draai met tussenframes. Bij minder beweging wisselt de blik direct. De overige personages bewegen nog niet los van de achtergrond. De bestaande crèmekleurige tekstballonnen zitten in de werkplaat; de blauwe lezerballon is echte, schaalbare tekst. Alle dialoog staat ook in de tekstversie. Versie 3 en de hoofdlaag zijn tijdelijke werkbeelden; de oorspronkelijke stijlposter blijft leidend voor latere tekeningen.

Er is geen AI tijdens het lezen, geen gegevensverzameling, geen account, geen database en geen hosting toegevoegd.

## Verificatie

```text
npm test
```

De controles oefenen de HTTP-bestandsgrens, het offline bundelen met de echte bronafbeelding en de readerlogica met een in-process DOM-double: navigatiegrenzen, perspectief zonder verhaalwijziging, focusherstel, systeemvoorkeur en geen audio-initialisatie vóór een gebruikersactie.

**Browsercontrole in deze Codex-sessie is niet afgerond.** De lokale server is gestart, maar de ingebouwde browser kon de lokale verbinding niet bereiken. Het openen van een `file:`-adres werd vervolgens door het browserbeleid geblokkeerd. Er is geen ander browserkanaal gebruikt om die beperking te omzeilen. Layout, browserfocusgedrag en daadwerkelijke geluidsweergave vragen daarom nog een visuele controle door het zelfstandig HTML-bestand te openen.

## Belangrijkste bestanden

- `reader/index.html`: toegankelijke pagina en tekstballon binnen het stripkader.
- `reader/styles.css`: vormgeving, responsive indeling en korte effecten.
- `reader/scene-data.js`: scènes en vast geschreven Nicola-opmerkingen.
- `reader/app.js`: lezen, voorkeuren, effecten en optionele audio.
- `assets/concepts/forward-v3.png`: origineel werkbeeld, 1536 × 1024 pixels.
- `assets/concepts/nicola-reader-head-v1.png`: transparante hoofdlaag voor Nicola's blik naar de lezer.
- `scripts/serve.mjs`: lokale server met beperkte bestandsroutes.
- `scripts/build-offline.mjs`: zelfstandig HTML-bestand maken.

De proef is lokaal. Publicatie via Sites of een andere host is niet uitgevoerd.
