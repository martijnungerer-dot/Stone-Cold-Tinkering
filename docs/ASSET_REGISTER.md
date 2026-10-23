# Assetregister

De [modelgids](../content/characters/MODEL_GUIDE.md) selecteert vaste gezichten en vormen. Gebruik voor productie het [stripstappenplan](COMIC_PLAYBOOK.md).

## SRC-STYLE-03 — goedgekeurde artproef 3

**Gebruikersgoedkeuring:** “Deze is goed. Kan je deze artstijl vasthouden en beschrijven in github? Ik wil dezs graag gebruiken en straks een motion comic van maken”. Dit keurt de gecorrigeerde artproef 3 goed als te gebruiken stijlanker. Het is geen goedkeuring van de eerdere tussenproeven of een reeds gebouwde nieuwe motion comic.

| Bestand | Eigenschappen | Rol |
| --- | --- | --- |
| [frozen-hollow-s06-p18-p19-artproef-03.png](../assets/concepts/frozen-hollow-s06-p18-p19-artproef-03.png) | PNG, 1536 × 1024, vijf beeldvakken, zonder tekst of losse lagen | Goedgekeurd origineel; SRC-STYLE-03 voor art, materialen, licht en regie |
| [frozen-hollow-s06-p18-p19-artproef-03-preview.jpg](../assets/concepts/frozen-hollow-s06-p18-p19-artproef-03-preview.jpg) | JPEG, 960 × 640, 111.072 bytes | Compacte beoordelingskopie; gebruik de PNG bij productie |

**SHA-256 origineel:** `68a16824c9a1164d009e846bbb9f687e5a511938ac36ba4381317051686a529c`. De PNG is ongewijzigd overgenomen uit de beeldgeneratie. De JPEG is een verkleinde, gecomprimeerde weergavekopie.

**Herkomst en scène:** CREATIEF; met `image_gen.imagegen` gemaakt voor Frozen Hollow S06 P18–P19. De gebruikersupload “De Golem Stormt Door de Mist - compact.jpg” leverde de gekozen art en sfeer. Daarna zijn de goedgekeurde karakteridentiteiten toegepast en is vooral Nicola gecorrigeerd. De definitieve correctie gebruikte onderstaande echte lokale bestanden in `referenced_image_paths` (paden relatief aan de repository weergegeven), in deze volgorde:

1. `assets/concepts/frozen-hollow-s06-p18-p19-artproef-02.png` — destijds lokaal werkbestand, geen actief model- of stijlanker; niet onderdeel van deze publicatie.
2. `assets/references/characters/Nicola Tinkerer Karaktermodelblad.png` — NICOLA-M04.
3. `assets/references/characters/Krek Cragheart Karaktermodelblad.png` — KREK-M03.
4. `assets/references/characters/Nyra Spellweaver Karaktermodelblad.png` — NYRA-M03.

**Promptkern van de laatste correctie (samenvatting):** corrigeer Nicola in alle drie zijn aanzichten rechtstreeks vanuit de hoofd- en lichaamstudies van NICOLA-M04. Herstel het smalle hoekige volwassen Quatryl-gezicht, compacte snuit, kleine oren, proportionele ooglenzen, okeren kopstructuur en slanke bouw. Behoud de donkere art, omgeving, compositie, Krek en Nyra. Geen nieuwe handelingen, tekst of magie. De herbruikbare promptbasis voor nieuwe scènes staat in [VISUAL_DIRECTION.md](VISUAL_DIRECTION.md).

**Beoordeling:** de agent vergeleek het resultaat visueel met de originele modellen; daarna heeft de gebruiker deze versie expliciet aanvaard. Het beeld bepaalt art, niet nieuwe anatomie of spelcanon. KREK-M03, NICOLA-M04, NYRA-M03 en HAIL-M01 behouden hun eigen originele modelbladen. De hoge architectuur en verre vormen in de proef leggen geen officiële plattegrond of buitenscène vast; producties volgen de ruimte uit het storyboard. De vijf vakken zijn uitsneden van de twee bestaande verhaalbeats, geen vijf nieuwe gebeurtenissen.

**Vervolggebruik:** geef deze PNG én de originele relevante modelbladen als echte beeldinput mee. De bestaande reader gebruikt nog zijn historische beelden. Deze vlakke conceptpagina bevat geen afzonderlijke animatielagen; de voorbereiding voor een latere motion comic staat in VISUAL_DIRECTION.md.

## Bestaande readerbeeldselectie — vastgelegd bij reader 1.2.0

Onderstaande registratie beschrijft de behouden readerbeelden en hun toenmalige referenties. Voor nieuwe productie geldt SRC-STYLE-03 hierboven; historische namen, prompts en eerdere stijlkeuzes hieronder zijn geen actieve generatie-instructies.

Actueel geselecteerd: arrival-v4.png, hollow-v3.png, breakthrough-v3.png, aftermath-v4.png en chamber-two-v4.png, naast de behouden stash-after.png. Vier atlassen van twee kolommen/drie rijen; één afzonderlijk kamerbeeld. De originele bestanden en eerdere versies blijven bewaard.

De ingebouwde beeldgenerator bewerkte alleen bestaande gezichten en Kreks mondhouding. Nicola-reader-head-v2.png is in iedere bewerking rechtstreeks als vaste identiteitsreferentie meegegeven, ook voor profielaanzichten. Nicola's bliklaag zelf blijft hetzelfde bestand. Krek sluit zijn stenen kaak in rustige scènes; tijdens de sprint en het gevecht kan zijn mond open staan. Hails transparantie en Nyra's kristallen zijn behouden. Geen extra figuren toegevoegd. De vijf tegenstanders in kamer 2 blijven dezelfde.

P36 is uit de leeslijn verwijderd; de gebruikte atlascel blijft uitsluitend als historische illustratie bewaard. De actieve uitsneden en het transcript slaan dit paneel over. Exacte prompts staan in [PROMPTS_FACE_REVIEW.json](../assets/episodes/frozen-hollow/PROMPTS_FACE_REVIEW.json). De onderstaande oudere registers documenteren eerdere revisies.

## Historische registraties

| ID | Bestand | Bron en status | Gebruik |
| --- | --- | --- | --- |
| forward-v3 | `assets/concepts/forward-v3.png` | Ingebouwde beeldgenerator, afgeleid van de gebruikersposter en eerdere bewegingsstudie; creatieve faninterpretatie | Tijdelijk werkbeeld van de driepanelige leesproef; stijl nog niet definitief |
| nicola-reader-head-v1 | `assets/concepts/nicola-reader-head-v1.png` | Ingebouwde beeldgenerator; referentie forward-v3, op verzoek van gebruiker een recht naar de lezer gedraaide kop met transparantie | Tijdelijke vervangende hoofdlaag bij de blauwe Nicola-ballon; geen volledige animatie met tussenframes |

Resolutie: 1536 × 1024 pixels. Het bronbeeld is ongewijzigd overgenomen. De reader toont uitsneden via SVG-viewports; het offline HTML-bestand sluit dezelfde PNG-bytes in.

Gebruikersregie: Krek baant een weg door de grond; Nicola hangt aan zijn tuig; Nyra loopt verfijnd achter hen op het gebaande pad en waardeert dat pad. De beweging en positionering zijn aanvaard. De tekenstijl was nog niet helemaal naar wens; v3 mag voorlopig als werkconcept worden gebruikt. De primaire stijlreferentie blijft SRC-STYLE-02 in het [bronregister](../content/sources/REFERENCES.md).

Dit is geen officiële Gloomhaven-illustratie of bewijs van spelmechaniek. Er zijn geen volledige foto's van campagnepagina's of toekomstige scenario-inhoud aan de reader toegevoegd.

## Volledige Frozen Hollow-aflevering

Nieuwe assets, met ingebouwde imagegen gemaakt voor de volledige bouwopdracht. Referenties: SRC-STYLE-02 voor stijl en identiteit; forward-v3 voor aanvullende karaktercontinuïteit. Alle PNG-bytes zijn ongewijzigd gekopieerd. Uitsneden en beweging gebeuren in de reader; er is geen rasterbewerking achteraf uitgevoerd.

| ID / bestand in assets/episodes/frozen-hollow/ | Afmetingen | Inhoud en status |
| --- | --- | --- |
| arrival.png | 1254 × 1254 | Zes scènes: Crooked Bone, Hail, bolopdracht, bergen en twee stashbeelden; CREATIEF, brongegevens volgens storyboard |
| hollow.png | 1254 × 1254 | Zes scènes: nauwe gang, wolven/Spirits, reacties, kamer 2, Nyra's twee ijsdemonen; CREATIEF |
| breakthrough.png | 1254 × 1254 | Zes scènes: sprint, mist, schat, aankomst bij steen, Nyra's schade en finale; CREATIEF |
| aftermath.png | 1254 × 1254 | Zes scènes: uitputting, wachten, koude bol, terugkeer, krachtopleving en terugval; CREATIEF |
| stash-after.png | 1536 × 1024 | Lege bergwand als afzonderlijke eindtoestand van de verdwijnende stash; afgeleid van arrival, CREATIEF |
| chamber-two-v2.png | 1536 × 1024 | Afzonderlijke vervanging van P23: twee grote en twee kleinere ijsdemonen, één Living Spirit achteraan. Ingebouwde imagegen, edit van hollow.png op gebruikersannotatie; alleen de bezetting is als GESPEELD bevestigd, beeldregie CREATIEF |

De vier atlassen hebben twee kolommen en drie rijen. De middelste rechter cel van hollow.png wordt in P23 vervangen door chamber-two-v2.png; de andere cellen blijven in gebruik. SVG-viewports tonen telkens één scène zonder de overige cellen in beeld; het offline bestand sluit iedere atlas eenmaal in. De 24 scènes worden gebruikt voor 38 verhaalbeats. Exacte prompts en de gebruikte ingebouwde tool staan in [PROMPTS.json](../assets/episodes/frozen-hollow/PROMPTS.json). De eerdere transparante Nicola-hoofdlaag wordt hergebruikt voor direct lezerscontact.

De beelden zijn de eerste volledige uitwerking, geen onafhankelijke lorebron of definitieve character sheets. Zie [FROZEN_HOLLOW.md](FROZEN_HOLLOW.md) voor beweging, verificatie en resterende beeldafwerking.

## Generatieprompt voor Nicola's hoofdlaag

Ingebouwde imagegen gebruikt op 17 oktober 2026; transparante uitvoer ongewijzigd gekopieerd naar het project. Prompt:

> Use case: identity-preserve / compositing. Create ONE transparent cutout sprite of ONLY Nicola's head and very short red scarf neckline for a motion comic overlay. Reference image shows the same tiny Quatryl inventor riding on stone giant Krek in first two panels. Match that exact bronze leather aviator helmet, enormous luminous circular cyan goggles, small brown/tan face, expressive mischievous grin, helmet side fittings. The new pose is DIRECT FRONT VIEW, both goggles equal sized, face looking straight OUT OF PAGE at reader, head upright. Crop tightly to head silhouette with just a tiny neck/scarf base, no shoulders or body. Head fills square canvas with 3% transparent margin, no big white/transparent padding. Use same gritty bold black angular ink lines, ochre bronze, dark hatch shadows, textured traditional fantasy comic coloring. This is a small replacement head on existing body, NOT a separate character portrait card. Genuine transparent background, no scene, no labels or typography, no other characters, no floating halo, no chest. Preserve nonhuman Quatryl proportions, not a robot. Single head only.

## Revisie 1.1.0 — oorspronkelijke karakters en Aesther Hail

Selectie van de bewaarde versie 1.1.0: arrival-v3.png en aftermath-v3.png (Hail gecorrigeerd), hollow-v2.png en breakthrough-v2.png (alle hoofdpersonages herzien), chamber-two-v3.png (vijf tegenstanders en nieuwe trio-ontwerpen), plus de behouden stash-after.png. Alle atlassen zijn 1254 × 1254 met twee kolommen en drie rijen; chamber-two-v3 is 1536 × 1024. De nieuwe transparante hoofdlaag assets/concepts/nicola-reader-head-v2.png is 1254 × 1254. PNG-bytes zijn ongewijzigd gekopieerd; geen rasterbewerking achteraf.

Referenties: de drie oorspronkelijke klasseplaten en drie Aesther-inspiratieplaten in assets/references/characters/. Het register bij REFERENCES.md geeft bronlabels en beperkingen. Ze bepalen uiterlijk/materialen; de poster blijft bruikbaar voor karakterhumor en stripkaders. De eerder genoemde oude uiterlijkbeschrijvingen zijn werkgeschiedenis.

Gemaakt met ingebouwde imagegen. Exacte prompts: [karakterrevisie](../assets/episodes/frozen-hollow/PROMPTS_REVISION.json) en [Hail-correctie](../assets/episodes/frozen-hollow/PROMPTS_HAIL.json). Arrival-v2 en aftermath-v2 waren tussenversies en staan lokaal buiten de repository; de oorspronkelijke v1-atlassen zijn behouden. Een tussenversie van breakthrough bevatte dubbele Nyra-figuren; de geselecteerde correctie verwijdert die. In P20 valt Krek na die correctie net buiten de linker beeldrand; het beeld toont zijn zicht op de gesloten schatkist. De uitsnede verandert de bevestigde handeling niet.

Die bewaarde versie gebruikt 36 hoofdpanelen. De nieuwe assets zijn afzonderlijk bekeken: herkenbare kristallen/ogen/uitrusting, vijf tegenstanders in P23, Nyra uitgeput, Hail licht doorschijnend. De actuele gegenereerde scènes blijven creatieve faninterpretaties, geen officiële klasseplaten of bewijs van spelmechaniek.
