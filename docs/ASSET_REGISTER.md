# Assetregister

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

Actuele volledige reader: arrival-v3.png en aftermath-v3.png (Hail gecorrigeerd), hollow-v2.png en breakthrough-v2.png (alle hoofdpersonages herzien), chamber-two-v3.png (vijf tegenstanders en nieuwe trio-ontwerpen), plus de behouden stash-after.png. Alle atlassen zijn 1254 × 1254 met twee kolommen en drie rijen; chamber-two-v3 is 1536 × 1024. De nieuwe transparante hoofdlaag assets/concepts/nicola-reader-head-v2.png is 1254 × 1254. PNG-bytes zijn ongewijzigd gekopieerd; geen rasterbewerking achteraf.

Referenties: de drie oorspronkelijke klasseplaten en drie Aesther-inspiratieplaten in assets/references/characters/. Het register bij REFERENCES.md geeft bronlabels en beperkingen. Ze bepalen uiterlijk/materialen; de poster blijft bruikbaar voor karakterhumor en stripkaders. De eerder genoemde oude uiterlijkbeschrijvingen zijn werkgeschiedenis.

Gemaakt met ingebouwde imagegen. Exacte prompts: [karakterrevisie](../assets/episodes/frozen-hollow/PROMPTS_REVISION.json) en [Hail-correctie](../assets/episodes/frozen-hollow/PROMPTS_HAIL.json). Arrival-v2 en aftermath-v2 waren tussenversies en staan lokaal buiten de repository; de oorspronkelijke v1-atlassen zijn behouden. Een tussenversie van breakthrough bevatte dubbele Nyra-figuren; de geselecteerde correctie verwijdert die. In P20 valt Krek na die correctie net buiten de linker beeldrand; het beeld toont zijn zicht op de gesloten schatkist. De uitsnede verandert de bevestigde handeling niet.

De reader gebruikt nu 36 hoofdpanelen. De nieuwe assets zijn afzonderlijk bekeken: herkenbare kristallen/ogen/uitrusting, vijf tegenstanders in P23, Nyra uitgeput, Hail licht doorschijnend. De actuele gegenereerde scènes blijven creatieve faninterpretaties, geen officiële klasseplaten of bewijs van spelmechaniek.
