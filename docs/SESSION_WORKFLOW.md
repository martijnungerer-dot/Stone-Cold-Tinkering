# Van speelsessie naar aflevering

Status: vaste werkwijze voor Stone & Cold Tinkering, vastgelegd op 17 oktober 2026. De gebruiker wil voortaan van iedere speelsessie een verhaal in de vorm van de leesproef maken. De driepanelige proef is afgerond en aanvaard als basis voor de leeservaring en Nicola's interactie. De tekenstijl blijft in ontwikkeling.

Voor de concrete productie van een strip gebruiken we het [stappenplan](COMIC_PLAYBOOK.md) en de [modelgids](../content/characters/MODEL_GUIDE.md). Dit document beschrijft de sessieoverdracht; het stappenplan ordent beeld- en tekstwerk. We voegen geen extra invoerformulier of vaste goedkeuringsronde toe.

## Wat Martijn aanlevert

Een vrij verteld verslag, losse aantekeningen, foto's of spraaknotities volstaan. Het [sessiesjabloon](../content/sessions/SESSION_TEMPLATE.md) is een hulpmiddel; Martijn hoeft geen productieformulier in te vullen.

Martijn begint iedere sessieoverdracht met het **city event, het road event en de verhaalteksten bij de gespeelde scenario's**, voor zover die onderdelen aan bod kwamen. Leg bij events het ID, de gekozen optie en de werkelijk toegepaste uitkomst vast. Bewaar bij scenario's de naam/het nummer, de introductie en de tijdens het spelen gelezen passages; de conclusie volgt zodra die aan tafel is bereikt. Als een event niet voorkwam, noteer dat. Dit is de aanlevervolgorde; de stripmontage volgt daarna het beste vertelritme binnen de bevestigde tijdvolgorde.

Naast die spelteksten zijn vooral jullie eigen keuzes, opvallende acties, letterlijke uitspraken en de afloop nodig. Een paar steekwoorden na het spelen volstaan. Foto's van bijzondere posities of een actie kunnen de ruimtelijke regie helpen; een volledig beurtverslag is niet nodig. Een wijziging in uitrusting, level of gezelschap is alleen relevant om vast te leggen als die werkelijk gebeurde en de continuïteit raakt.

De nuttigste informatie is: waar en met wie de sessie begon, het doel, de belangrijke gebeurtenissen, opvallende acties en uitspraken, de afloop en wat de personages daarna bij zich dragen of voelen. Vermeld vooral welke momenten beslist in de strip moeten. Markeer een herinnering als onzeker wanneer dat zo is. De echte speeldatum mag onbekend blijven; de datum van het gesprek is niet automatisch de speeldatum.

Codex ordent dit materiaal en stelt alleen gerichte vragen over ontbrekende feiten die de huidige scène werkelijk veranderen. Andere ontbrekende details blijven OPEN. Een foto van een scenario toont wat in het boek staat; ze bewijst niet dat alle beschreven gebeurtenissen aan tafel plaatsvonden.

Materiaal kan alvast voor de start van het spel worden aangeleverd. Markeer dan keuzes en afloop als nog niet gespeeld; vul die pas na bevestiging in. Ongelezen conclusies, ongekozen eventuitkomsten en volgende scenario's worden niet als toekomstig verhaal verwerkt.

## De vaste werkwijze

| Stap | Resultaat in Git | Richtlijn |
| --- | --- | --- |
| 1. Sessie vastleggen | `content/sessions/<session-id>/SESSION.md` | Bewaar de aangeleverde herinneringen, bronnen en onzekerheden. Maak een korte lijst bevestigde ankers met stabiele IDs |
| 2. Verhaal vormen | `content/episodes/<episode-id>/STORYBOARD.md` | Begin met logline, scènes, emotioneel verloop en eindtoestand; werk daarna panelen en dialoog uit |
| 3. Beeld voorbereiden | Beeldbriefing bij het storyboard; assets in `assets/episodes/<episode-id>/` zodra gemaakt | Gebruik de bestaande karakter- en stijlreferenties. Begin bij een samenhangende scène; het aantal panelen volgt het verhaal |
| 4. Leesversie maken | De bestaande reader hergebruiken; een zelfstandig HTML-bestand als uitvoer | Paneelvolgorde, tekst, optionele reacties en korte beweging samen laten werken |
| 5. Aflevering afronden | Status en eindtoestand bijwerken in het [afleveringenoverzicht](../content/episodes/README.md) | Verwerk gebruikersfeedback, controleer continuïteit en bewaar concrete vervolgpunten |

De opdracht bepaalt tot welke stap we gaan. Bij een verzoek om tekst maken we tekst; bij een opdracht om de aflevering te bouwen werken we binnen die bouwopdracht door. Deze werkwijze voegt geen verplichte toestemming per paneel of bestand toe. Bespreek wezenlijke verhaalkeuzes wanneer die nog openstaan; presenteer daarvoor een concreet voorstel. Publicatie op een website blijft een afzonderlijke gebruikerskeuze.

## Afleveringen en nummering

- Uitgangspunt: één speelsessie wordt één aflevering. Een splitsing of samenvoeging kan wanneer het verhaal daarom vraagt; vermeld dan alle betrokken sessie-IDs. Een scenario kan meerdere sessies beslaan.
- Gebruik stabiele, kleine letters en koppeltekens in mapnamen, bijvoorbeeld `s002` en `ep002-werktitel`. De volgorde van de speelsessies bepaalt de nummers, niet een gegokte datum.
- Frozen Hollow houdt zijn bestaande map en afleveringnummer 01. De bewegingsproef is een afzonderlijke creatieve proef en telt niet als extra gespeelde sessie of aflevering.
- Titels, duur en paneelaantal volgen de inhoud. De 35 hoofdpanelen van de herziene Frozen Hollow en de drie panelen van de proef zijn geen vaste lengte voor volgende afleveringen.
- Nieuwe afleveringen krijgen eigen bestanden en assets. Bewaar eerdere storyboards en bruikbare leesversies. Een nieuwe sessie overschrijft geen afgeronde aflevering.

## Feiten, dialoog en continuïteit

De [wereldbijbel](../WORLDBUILDING.md) bepaalt de bronlabels en het spoilerbeleid. Gebruik diezelfde labels; maak geen tweede canonstelsel.

1. Leg de bevestigde sessiegebeurtenissen vast als GESPEELD. Dit zijn de ankers die de strip behoudt.
2. Registreer bronfoto's en hun vindplaats als BRONFOTO; officiële lore wordt alleen OFFICIEEL-2E met de vereiste controle. Ongecontroleerde editieclaims blijven ONBEVESTIGD-2E.
3. Nieuwe dialoog, montage, humor, gedachten en beeldregie zijn CREATIEF. Letterlijk herinnerde uitspraken staan apart van nieuwe replieken. Vaste karakterquotes behouden hun formulering; plaatsing in een scène maakt ze nog geen sessiecitaat.
4. Start bij de vastgelegde eindtoestand van de vorige sessie, voor zover de gebruiker die bevestigt. Houd locatie, bezittingen, uitputting, onderlinge verhoudingen en personagekennis bij. Leid geen nieuwe aandoening, herstel of buit af uit een dramatisch beeld.
5. Karakterontwikkeling ontstaat uit de gespeelde gebeurtenissen. Gebruik de [karakterrichtlijnen](../content/characters/CHARACTER_ARCS.md); leg toekomstige groei niet vooraf vast als campagnefeit.
6. Noteer per aflevering een eigen vrijgegeven spoilerbereik. Nieuwe gespeelde inhoud kan dat bereik voor die aflevering uitbreiden; eerdere afleveringen krijgen daardoor geen toekomstige hints of verborgen bestanden mee.

Een nieuwe foto of herinnering wordt toegevoegd met herkomst. Een correctie krijgt een korte notitie met wat verandert en waarom. Bewaar goedgekeurde ankers; verander ze alleen op basis van een expliciete correctie van de gebruiker. Een nieuwe versie keurt nieuwe dialoog of gewijzigde scènes niet met terugwerkende kracht goed.

## De herkenbare leesvorm

De [visuele richting](VISUAL_DIRECTION.md) en [leesproef](PROTOTYPE.md) zijn het vertrekpunt. De op 18 oktober aangeleverde klasse-illustraties (SRC-CHAR-ORCHID, SRC-CHAR-QUATRYL en SRC-CHAR-SAVVAS) zijn leidend voor anatomie, kleding, kleuren en schilderachtige materialen. SRC-STYLE-02 blijft richting geven aan karakterhumor, paneelkaders en losse tekstballonnen. Bij tegenspraak wint het nieuwe oorspronkelijke karakterbeeld. Gebruik bij beeldproductie de bewaarde referentieafbeeldingen zelf; controleer uiterlijk en onderlinge schaal vóór integratie. Bevestigde tijdvolgorde gaat vóór een verzonnen vloeiendere montage.

- De lezer bladert op eigen tempo. Het hoofdverhaal blijft compleet zonder optionele interacties.
- Nicola kan naar de lezer kijken en die aanspreken in een lichtblauwe tekstballon binnen het stripkader. Gebruik geen popup of verduistering. Zijn reactie verandert perspectief, geen gespeelde uitkomst. Ook hij mag stil blijven wanneer een scène daarom vraagt.
- Krek en Nyra mogen statisch blijven. Korte beweging kan later karakter ondersteunen; de voorgestelde schouderbeweging van Krek en mantelreactie van Nyra zijn optionele ideeën, geen resterend werk aan de afgeronde proef.
- Gebruik beperkte, korte beweging op betekenisvolle momenten. Er is geen verplichting dat ieder personage of ieder paneel animeert.
- Geluid staat aanvankelijk uit. Minder beweging behoudt de betekenis van een blik of actie. Tekst en bediening blijven ook zonder geluid en met toetsenbord bruikbaar.
- Schrijf uitleg over bronnen en productie in de projectdocumentatie. De leesversie bevat de strip en bruikbare leesbediening.

## Wat bij een aflevering wordt bewaard

Een nieuwe sessie begint met een kopie van het sjabloon. Het storyboard volgt het episodeformat uit hoofdstuk 11 van de wereldbijbel. Voeg daarin minimaal toe:

- sessie-ID, werkelijke speeldatum indien bekend, bronnen en spoilerbereik;
- versie en status: `sessie ontvangen`, `verhaalconcept`, `storyboard`, `beeldopbouw`, `leesversie` of `afgerond`;
- bevestigde ankers, creatieve voorstellen en open vragen;
- begin- en eindtoestand, scène- en paneel-IDs, dialoog en optionele samenkomstpunten;
- gebruikte beelden met asset-ID, referenties en vervangbaar werkmateriaal;
- de concrete gebruikersbeslissingen en wat nog niet is beoordeeld.

Maak alleen bestanden en mappen die in de huidige stap nodig zijn. De paden hierboven zijn afspraken voor nieuwe inhoud, geen claim dat een reader met meerdere afleveringen al bestaat. Hergebruik de huidige reader bij een volgende bouwopdracht; maak geen nieuw framework, account of hosting voor iedere aflevering.

## Afronden en doorgaan

Controleer of de aflevering de aangeleverde ankers behoudt, eindtoestanden kloppen, nieuwe dialoog herkenbaar creatieve invulling blijft en toekomstige inhoud buiten de geleverde bestanden blijft. Controleer bij een leesversie ook tekstballonnen, navigatie, transcript en de weergave op smal en breed scherm. Voer technische controles uit wanneer software verandert en vermeld wat werkelijk is gecontroleerd.

Gebruikersgoedkeuring en technische verificatie zijn verschillende gegevens. De aanvaarde leesproef maakt de tekenstijl niet definitief en bewijst geen niet-uitgevoerde browsertest. Wanneer Martijn een aflevering of proef afrondt, bewaren we resterende ideeën als mogelijkheden voor later en gaan we niet door met ongevraagde verfijning.

Bij een nieuwe chat leest Codex de huidige projectstatus, dit document en de betrokken sessie en aflevering. Martijn kan beginnen met: **“Nieuwe sessie: …”** gevolgd door zijn herinneringen. Er is geen automatische planning, opname of verwerking van toekomstige speelsessies ingesteld.
