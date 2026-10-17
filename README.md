# Stone & Cold Tinkering

Een interactieve motion comic rond een gespeelde Gloomhaven Second Edition-campagne, met Krek, Nicola en Nyra in de hoofdrol. Een serieuze fantasywereld ontmoet voorwaartse steenmassa, ontsporende quantumexperimenten en magie met uitgesproken kleurvoorkeuren.

## Begin hier

Lees [WORLDBUILDING.md](WORLDBUILDING.md) voor de personages, wereldbouw, Frozen Hollow-continuïteit, stijl, interactieve vertelvorm en technische overdracht.

De praktische productievolgorde staat in [het stripstappenplan](docs/COMIC_PLAYBOOK.md). De [modelgids](content/characters/MODEL_GUIDE.md) selecteert vaste gezichten en vormen; de bestaande karakterrichtlijnen bewaren hun stemmen. Begin bij een nieuwe strip met deze documenten.

Voor iedere volgende speelsessie volgen we [van speelsessie naar aflevering](docs/SESSION_WORKFLOW.md). Een vrij verteld verslag volstaat; Codex ordent dat met het [sessiesjabloon](content/sessions/SESSION_TEMPLATE.md). Het [afleveringenoverzicht](content/episodes/README.md) bewaart voortgang en continuïteit. Concrete gebruikerskeuzes staan in het [besluitenlog](docs/decisions.md).

De verhaaluitwerking staat in [Frozen Hollow — tekststoryboard](content/episodes/frozen-hollow/STORYBOARD.md): 35 hoofdpanelen en 6 optionele perspectiefpanelen, inclusief de terugkeer naar Hail met Nyra als dramatische hook. Nieuwe dialogen zijn creatieve voorstellen; expliciete open sessiedetails blijven herkenbaar.

Het opnieuw gedeelde eigen kamer-verslag staat in [sessie S001](content/sessions/s001/SESSION.md). Storyboard v0.8 verwerkt de laatste correctie: een claustrofobische gang met wolven, ijsdemonen in kamer 2, Kreks sprint door mist naar kamer 3 en het eindgevecht over twee rondes. Het kamerbeeld P23 toont volgens de gebruikerscorrectie twee grote en twee kleinere ijsdemonen, plus één Living Spirit achteraan. Het vergeten city event wordt overgeslagen. Alle drie spreken Engels; voorgestelde Krek-woordgrappen blijven apart van gespeelde feiten.

Het [bronregister](content/sources/REFERENCES.md) beschrijft de aangeleverde kaart, spelpagina's en gedeelde illustratie. De [visuele briefing](docs/VISUAL_DIRECTION.md) vertaalt die referenties naar tekstuele ontwerpuitgangspunten.

De gebruiker heeft de poster Gloomhaven_ Drie Helden in een Gebroken Wereld.png als goede visuele basis gekozen. De op 18 oktober aangeleverde klasse-illustraties (SRC-CHAR-ORCHID, SRC-CHAR-QUATRYL en SRC-CHAR-SAVVAS) zijn leidend voor anatomie, kleding, kleuren en schilderachtige materialen. SRC-STYLE-02 blijft richting geven aan karakterhumor, paneelkaders en losse tekstballonnen. Bij tegenspraak wint het nieuwe oorspronkelijke karakterbeeld. De campagnekaart blijft de geografische referentie.

[Karakterisering en ontwikkeling](content/characters/CHARACTER_ARCS.md) vertaalt de persoonlijkheden op de poster naar schrijfbare reacties, onderlinge dynamiek en de ontwikkeling van het trio binnen Frozen Hollow.

**Spoilerwaarschuwing:** de wereldbijbel bevat de genoemde gespeelde gebeurtenissen rond Frozen Hollow en Road Event R-10.

## Projectstatus

De eerste lokale interactieve proef is gebouwd op expliciete gebruikersopdracht: drie panelen, zelf bladeren, een optioneel Nicola-perspectief, korte beweging en optioneel geluid. Klikken op Nicola laat hem naar de lezer kijken en een blauwe tekstballon binnen het stripkader tonen. Werkbeeld v3 is voorlopig bruikbaar; voor nieuwe beelden gelden de oorspronkelijke klasse- en Aesther-referenties. Er is geen hosting toegevoegd.

De gebruiker heeft de proef afgerond en de leesvorm en Nicola-interactie aanvaard. Krek en Nyra mogen voorlopig statisch blijven. Het project gaat verder als een serie op basis van de speelsessies; de volgende sessie is nog niet aangeleverd. De proef vraagt geen verdere verfijning zonder nieuwe opdracht.

## Volledige aflevering bekijken

Frozen Hollow is nu gebouwd als eerste volledige motion-comicversie: 35 hoofdpanelen, 6 optionele gedachtepanelen, Engelse dialoog, een inspecteerbaar kristal, Nicola's blauwe lezerballon en korte beweging met optioneel geluid. De versie eindigt bij Hail met Nyra als dramatische hook. Zie [de afleveringsdocumentatie](docs/FROZEN_HOLLOW.md).

Maak met `npm run build` het zelfstandige bestand `dist/frozen-hollow.html`. Voor ontwikkelen: `npm start`, open het gemelde adres met `/frozen-hollow`. De oude driepanelige proef blijft beschikbaar als `dist/reader-offline.html`. Controleer met `npm test`.

## Bewaarde proef bekijken

Er zijn geen te installeren pakketten. Met Node.js 18 of nieuwer:

```text
npm start
```

Open het gemelde lokale adres. Voor één zelfstandig HTML-bestand dat ook zonder server werkt:

```text
npm run build
```

Open daarna `dist/reader-offline.html` in een browser. Alle beelden en bediening zitten erin. Controleer de bron met `npm test`. Zie [de proefdocumentatie](docs/PROTOTYPE.md) voor werking, bediening en verificatiegrenzen, en het [assetregister](docs/ASSET_REGISTER.md) voor de gebruikte afbeelding.

## Vaste afspraken

- Gebeurtenissen aan tafel zijn canon voor deze strip.
- Officiële lore, gespeelde gebeurtenissen en creatieve invulling blijven herkenbaar gescheiden.
- Onbevestigde Second Edition-lore wordt expliciet gemarkeerd.
- Toekomstige scenario-onthullingen blijven verborgen totdat de groep ze heeft gespeeld.
- De aangeleverde campagnekaart is de geografische projectreferentie; editie en exacte scenarioposities vragen waar nodig verificatie.
- Humor komt voort uit de personages; de wereld behoudt gevaar en consequenties.

## Voor schrijvers en Codex

Lees de wereldbijbel vóór je scènes schrijft of bouwt. Bewaar de vastgelegde karakterquotes en episode-ankers. Vul open lorevragen niet op met aannames. Interacties mogen perspectief en timing veranderen; de bevestigde campagne-uitkomst blijft intact.

Versie 0.2 van het tekststoryboard is op 17 oktober 2026 inhoudelijk goedgekeurd. Versie 0.3 verwerkt daarna de bronfoto's en de expliciet gewenste epiloog bij Hail, met Nyra als dramatische hook. Deze aanvullingen staan als bronfeiten en creatieve adaptatie gemarkeerd; nieuwe dialoog wordt niet met terugwerkende kracht goedgekeurd verklaard. De afgeronde readerproef gebruikt de afzonderlijke, creatieve bewegingsstudie. Zij verandert de Frozen Hollow-ankers niet. Een bouwopdracht voor Frozen Hollow start bij het bestaande storyboard; een volgende speelsessie start bij de nieuwe gebruikersherinneringen.

## Materiaal en herkomst

Dit is een fanproject op basis van Gloomhaven, de gedeelde speelsessie en originele creatieve uitwerking. Officieel materiaal en eigen interpretaties moeten afzonderlijk herkenbaar blijven. Leg bij toekomstige beeld- en geluidsbestanden de bron en het toegestane gebruik vast.
