# Frozen Hollow — volledige motion comic, versie 1.4.0

De gebruiker heeft de volledige aflevering met beelden en beweging opgedragen na de leesproef. Deze eerste volledige leesversie volgt [storyboard v0.8](../content/episodes/frozen-hollow/STORYBOARD.md) en [sessie S001](../content/sessions/s001/SESSION.md). Nieuwe beelden, Engelse dialoog en montage zijn creatieve adaptatie. De gebruiker heeft de eerste leesversie beoordeeld; deze revisie verwerkt de twintig annotaties en de drie nieuwe karakterreferenties. De nieuwe beelden en tekst zijn nog niet afzonderlijk goedgekeurd.

De actuele afleveringstitel is **Een team in wording**. Op gebruikersfeedback is de leesvorm beeldgericht gemaakt: geen brede zijbalk meer, het paneel gebruikt de volle leesbreedte. De vertelling, scènekeuze en Nicola-knop staan compact onder het beeld. Herhaal/detail en Vorige/Verder delen een kleine bedieningsstrook. De titel, kopruimte en footer zijn ook verkleind; illustraties behouden hun uitsnede en verhouding.

## Openen

Voer `npm run build` uit en open `dist/frozen-hollow.html`. Alles zit in dat ene bestand: beeld, tekst, bediening en geluidseffecten. De driepanelige proef blijft afzonderlijk bewaard als `dist/reader-offline.html`.

Voor ontwikkeling: `npm start` meldt het adres voor `/frozen-hollow`. Er zijn geen te installeren pakketten; Node.js 18 of nieuwer volstaat. De server biedt alleen vooraf bepaalde readerbestanden aan. De volledige bronfoto's, sessienotities en Git-gegevens gaan niet mee naar de browser.

## Verhaal en vorm

- 35 hoofdpanelen, 11 scène-ingangen en 6 optionele gedachtepanelen bij het overleg. P36 is ook uit de leeslijn verwijderd; een oude link naar P36 opent P37. P28 en P29 zijn uit de leeslijn verwijderd; hun gezamenlijke gevechtsafronding staat in de overgang naar P30. Oude links naar die panelen openen P30. Overige IDs zijn behouden; de leesvolgorde staat expliciet in het storyboard en READER.json.
- Eerst R-10 met de verkeerde groenkeuze bij Qualco's stash, daarna Hail/Crooked Bone en de bergreis. Het onbekende city event is overgeslagen.
- Binnen: een claustrofobische smalle gang met wolven en Living Spirits. Daarna kamer 2 met twee grote en twee kleinere ijsdemonen, met één Living Spirit achteraan. Halverwege kamer 2 sprint Krek vol kracht door mist naar kamer 3. Daar volgen de schat, zijn verplaatsing naar de steen, Nyra's schadegolf en de gezamenlijke afronding in de volgende ronde.
- Nyra zakt uitgeput in elkaar. De epiloog keert terug naar Hail; het resultaat van haar experiment wordt kort samengevat en eindigt op Nyra en “Make it stay”. Geen verdere conclusie-onthullingen toegevoegd.
- Vier atlassen en een afzonderlijk gecorrigeerd kamerbeeld dragen de 35 beats. Een zesde beeldbestand is de lege bergwand nadat de stash verdwenen is.
- Engelse dialoog staat als schaalbare tekstballonnen binnen het stripkader. Vertelling en bediening zijn Nederlands. Alle inhoud staat ook in een statisch transcript in het offline bestand.

## Bediening en beweging

Pijlen links en rechts naast het beeld, Vorige/Verder en de pijltjestoetsen volgen het verhaal; een keuzelijst springt naar een scène. De URL-fragmenten zoals `#P30` heropenen dat paneel. Er is geen automatische paginawisseling.

Klik op Nicola op de gemarkeerde momenten: hij kijkt naar de lezer met de nieuwe bij de Quatryl-referentie passende frontale hoofdlaag en spreekt via de aanvaarde blauwe ballon. Nogmaals klikken, het kruisje of Escape sluit zijn opmerking. Verder bladeren blijft beschikbaar. Bij het overleg kan de lezer ook twee gedachtepanelen van Krek of Nyra lezen; alle perspectieven hervatten dezelfde gebeurtenis.

Bij P25 zegt Krek na aanklikken eerst “Forward?” en daarna “Forward!”. P20 geeft de gesloten schatkist een goudglans zonder materiaalaanspraak. In P30 biedt Krek een lift aan; Nicola heeft er een optionele rustige lezerreactie. De bol in P33 schijnt na aanklikken helderder en keert met een tweede klik terug naar de rustige gloed. Alle gesproken reacties staan ook in het transcript.

Het groene kristal is optioneel groter te bekijken. De keuze voor groen staat vast; de lezer kan geen andere eventuitkomst kiezen.

De beweging bestaat uit korte camerabewegingen, sneeuw, stof, mist, impactaccenten en magisch licht. De stash maakt een eenmalige overgang naar een werkelijk getekende lege bergwand. Het afzonderlijke beeld van Hails krachtopleving (P36) is op gebruikersverzoek verwijderd; P37 vat de afloop samen. Effecten stoppen na maximaal 3,2 seconden en kunnen worden herhaald. De personages zijn geïllustreerde houdingen; Nicola's blik gebruikt twee tekeningen. Dit is een motion comic met beperkte animatie.

Geluid staat uit tot de lezer het aanzet. De geluiden zijn korte, zacht gesynthetiseerde wind-, steen- en magische accenten, met een knal bij de stash en vuurgeknisper bij P26. Er is geen gesproken dialoog. De systeemvoorkeur voor minder beweging wordt gevolgd tot de lezer zelf een voorkeur kiest; bij uitgeschakelde beweging is de uiteindelijke verhaaltoestand direct zichtbaar. Alleen de bewegingsvoorkeur wordt waar mogelijk lokaal opgeslagen.

## Bronnen en verdere beeldafwerking

De op 18 oktober aangeleverde klasse-illustraties (SRC-CHAR-ORCHID, SRC-CHAR-QUATRYL en SRC-CHAR-SAVVAS) zijn leidend voor anatomie, kleding, kleuren en schilderachtige materialen. SRC-STYLE-02 blijft richting geven aan karakterhumor, paneelkaders en losse tekstballonnen. Bij tegenspraak wint het nieuwe oorspronkelijke karakterbeeld. De gegenereerde beelden zijn de eerste volledige uitwerking, met eigen ontwerpen voor de tegenstanders en Hail. Exacte kamerafmetingen, tegenstandertotalen, aanvalsvormen en illustratiedetails bewijzen geen officiële kaartopstelling of spelmechaniek. Hail is na de aanvullende gebruikersreferenties hertekend als licht doorschijnende Aesther, met zichtbare omgeving door haar mantel en armen en zonder elfenoren. Kleine gelaatsdetails blijven een aandachtspunt bij latere beelden. Dit verandert de bevestigde sessieankers niet.

De oude atlassen en hoofdlaag blijven bewaard. De volledige reader gebruikt arrival-v4, hollow-v3, breakthrough-v3, aftermath-v4, chamber-two-v4 en nicola-reader-head-v2.

Het [assetregister](ASSET_REGISTER.md) bewaart herkomst, afmetingen en de gebruikte prompts. De oude bewegingsproef en haar werktekeningen zijn behouden.

## Technische overdracht en controles

- `content/episodes/frozen-hollow/READER.json`: leesvolgorde, narratie, beschrijving, beelduitsneden en effect per beat.
- `scripts/compile-episode.mjs`: koppelt de dialoog rechtstreeks aan stabiele paneel-IDs uit het storyboard; maakt `reader/frozen-hollow-data.js`.
- `reader/frozen-hollow.html`, `reader/episode.js`, `reader/episode.css`: volledige reader met de bestaande gedeelde vormgeving in `reader/styles.css`.
- `scripts/build-offline.mjs`: maakt zowel de bewaarde proef als de volledige aflevering; embedt iedere atlas eenmaal en bewaart het transcript zonder JavaScript.
- `assets/episodes/frozen-hollow/`: de zes beeldbestanden en het promptregister.

Controleer met `npm test`. De controles behandelen: beide leesversies, de publieke bestandsgrens, alle 35 verhaalstappen, de kamerindeling en tweefasige finale, optionele gedachten, Nicola's blik/ballon, inspectie, paneellinks, voorkeuren en het offline insluiten van de originele PNG-bytes.

De tests gebruiken de echte readerlogica met een in-process DOM-double; ze bewijzen geen browserlayout of geluidsweergave op hardware. Visuele browsercontrole door de agent blijft beperkt door de eerder vastgestelde ontoegankelijke lokale verbinding en geblokkeerde `file:`-URL. Er is geen alternatief browserkanaal gebruikt om dat beleid te omzeilen. De nieuwe illustraties zijn wel afzonderlijk bekeken. De geleverde HTML vraagt nog gebruikerscontrole op het eigen scherm.

Er is geen hosting toegevoegd.

## Zijpijlen en volledig scherm

De zijpijlen staan in smalle randen naast het beeld en bedekken geen personages of aanklikpunten. Bij het begin/einde is de betreffende pijl uitgeschakeld; opnieuw beginnen blijft een bewuste knop onder het slotpaneel.

“Volledig scherm” staat boven het beeld. De knop probeert de browserweergave via de Fullscreen API. Als die ontbreekt of door de browser wordt geweigerd, opent dezelfde knop een grote leesweergave binnen het huidige venster. “Normale weergave” sluit die weer. Escape sluit eerst een open reactie, daarna de grote leesweergave; de browser kan volledig scherm zelf met Escape sluiten. Navigatie, dialoog en klikreacties blijven binnen de weergave. Beeldverhouding en volledige uitsnede blijven behouden, ook bij portretpanelen. Instellingen worden niet gewijzigd of automatisch bewaard door deze knop.

De schermwisselingen zijn met gesimuleerde browser-API's gecontroleerd, inclusief geweigerde/niet-beschikbare fullscreen en terugkeer via een fullscreenchange-event. Dit bewijst geen echte browserlayout of toestemming in iedere browser.
