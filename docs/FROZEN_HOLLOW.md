# Frozen Hollow — volledige motion comic, versie 1.0

De gebruiker heeft de volledige aflevering met beelden en beweging opgedragen na de leesproef. Deze eerste volledige leesversie volgt [storyboard v0.5](../content/episodes/frozen-hollow/STORYBOARD.md) en [sessie S001](../content/sessions/s001/SESSION.md). Nieuwe beelden, Engelse dialoog en montage zijn creatieve adaptatie. De volledige versie is nog niet door de gebruiker beoordeeld.

## Openen

Voer `npm run build` uit en open `dist/frozen-hollow.html`. Alles zit in dat ene bestand: beeld, tekst, bediening en geluidseffecten. De driepanelige proef blijft afzonderlijk bewaard als `dist/reader-offline.html`.

Voor ontwikkeling: `npm start` meldt het adres voor `/frozen-hollow`. Er zijn geen te installeren pakketten; Node.js 18 of nieuwer volstaat. De server biedt alleen vooraf bepaalde readerbestanden aan. De volledige bronfoto's, sessienotities en Git-gegevens gaan niet mee naar de browser.

## Verhaal en vorm

- 38 hoofdpanelen, 11 scène-ingangen en 6 optionele gedachtepanelen bij het overleg. Bestaande IDs zijn behouden; de leesvolgorde staat expliciet in het storyboard en READER.json.
- Eerst Hail/Crooked Bone, bergreis en de verkeerde groenkeuze bij Qualco's stash. Het onbekende city event is overgeslagen.
- Binnen: een claustrofobische smalle gang met wolven en Living Spirits. Daarna kamer 2 met twee grote ijsdemonen. Halverwege kamer 2 sprint Krek vol kracht door mist naar kamer 3. Daar volgen de schat, zijn verplaatsing naar de steen, Nyra's schadegolf en de gezamenlijke afronding in de volgende ronde.
- Nyra zakt uitgeput in elkaar. De epiloog keert terug naar Hail; de tijdelijke kracht en het wegvallen daarvan eindigen op Nyra en “Make it stay”. Geen verdere conclusie-onthullingen toegevoegd.
- 24 nieuwe geïllustreerde scènes in vier atlassen; verschillende uitsneden en hergebruikte camerastandpunten dragen de 38 beats. Een vijfde beeld is de lege bergwand nadat de stash verdwenen is.
- Engelse dialoog staat als schaalbare tekstballonnen binnen het stripkader. Vertelling en bediening zijn Nederlands. Alle inhoud staat ook in een statisch transcript in het offline bestand.

## Bediening en beweging

Vorige/Verder en de pijltjestoetsen volgen het verhaal; een keuzelijst springt naar een scène. De URL-fragmenten zoals `#P30` heropenen dat paneel. Er is geen automatische paginawisseling.

Klik op Nicola op de gemarkeerde momenten: hij kijkt naar de lezer met de bestaande frontale hoofdlaag en spreekt via de aanvaarde blauwe ballon. Nogmaals klikken, het kruisje of Escape sluit zijn opmerking. Verder bladeren blijft beschikbaar. Bij het overleg kan de lezer ook twee gedachtepanelen van Krek of Nyra lezen; alle perspectieven hervatten dezelfde gebeurtenis.

Het groene kristal is optioneel groter te bekijken. De keuze voor groen staat vast; de lezer kan geen andere eventuitkomst kiezen.

De beweging bestaat uit korte camerabewegingen, sneeuw, stof, mist, impactaccenten en magisch licht. De stash maakt een eenmalige overgang naar een werkelijk getekende lege bergwand. Hails krachtopleving en het wegvallen ervan hebben afzonderlijke beelden. Effecten stoppen na maximaal 3,2 seconden en kunnen worden herhaald. De personages zijn geïllustreerde houdingen; Nicola's blik gebruikt twee tekeningen. Dit is een motion comic met beperkte animatie.

Geluid staat uit tot de lezer het aanzet. De geluiden zijn korte, zacht gesynthetiseerde wind-, steen- en magische accenten. Er is geen gesproken dialoog. De systeemvoorkeur voor minder beweging wordt gevolgd tot de lezer zelf een voorkeur kiest; bij uitgeschakelde beweging is de uiteindelijke verhaaltoestand direct zichtbaar. Alleen de bewegingsvoorkeur wordt waar mogelijk lokaal opgeslagen.

## Bronnen en verdere beeldafwerking

De oorspronkelijke stijlposter blijft de primaire referentie. De gegenereerde beelden zijn de eerste volledige uitwerking, met eigen ontwerpen voor de tegenstanders en Hail. Exacte kamerafmetingen, tegenstandertotalen, aanvalsvormen en illustratiedetails bewijzen geen officiële kaartopstelling of spelmechaniek. Hails doorschijnendheid en de consistentie van kleine gelaatsdetails kunnen in een volgende beeldronde verder worden verfijnd. Dit verandert de bevestigde sessieankers niet.

Het [assetregister](ASSET_REGISTER.md) bewaart herkomst, afmetingen en de gebruikte prompts. De oude bewegingsproef en haar werktekeningen zijn behouden.

## Technische overdracht en controles

- `content/episodes/frozen-hollow/READER.json`: leesvolgorde, narratie, beschrijving, beelduitsneden en effect per beat.
- `scripts/compile-episode.mjs`: koppelt de dialoog rechtstreeks aan stabiele paneel-IDs uit het storyboard; maakt `reader/frozen-hollow-data.js`.
- `reader/frozen-hollow.html`, `reader/episode.js`, `reader/episode.css`: volledige reader met de bestaande gedeelde vormgeving in `reader/styles.css`.
- `scripts/build-offline.mjs`: maakt zowel de bewaarde proef als de volledige aflevering; embedt iedere atlas eenmaal en bewaart het transcript zonder JavaScript.
- `assets/episodes/frozen-hollow/`: de vijf nieuwe beeldbestanden en het promptregister.

Controleer met `npm test`. De zeven controles slagen: beide leesversies, de publieke bestandsgrens, alle 38 verhaalstappen, de kamerindeling en tweefasige finale, optionele gedachten, Nicola's blik/ballon, inspectie, paneellinks, voorkeuren en het offline insluiten van de originele PNG-bytes.

De tests gebruiken de echte readerlogica met een in-process DOM-double; ze bewijzen geen browserlayout of geluidsweergave op hardware. Visuele browsercontrole door de agent blijft beperkt door de eerder vastgestelde ontoegankelijke lokale verbinding en geblokkeerde `file:`-URL. Er is geen alternatief browserkanaal gebruikt om dat beleid te omzeilen. De nieuwe illustraties zijn wel afzonderlijk bekeken. De geleverde HTML vraagt nog gebruikerscontrole op het eigen scherm.

Er is geen hosting toegevoegd.
