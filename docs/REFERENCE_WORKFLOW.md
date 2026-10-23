# Betrouwbare beeldreferenties voor nieuwe strips

**Doel:** een nieuwe Codex-sessie kan zelfstandig vaststellen welke afbeeldingen in GitHub aanwezig zijn, welke modelversie is goedgekeurd en welke bestanden de beeldgenerator werkelijk moet ontvangen. Geen nieuwe handmatige checklist per aflevering.

## Bij iedere nieuwe productie in de uitgecheckte repository

1. Lees `AGENTS.md`, `docs/VISUAL_DIRECTION.md`, `content/characters/MODEL_GUIDE.md`, `docs/MAGIC_EFFECTS.md` en de relevante episode/sessie.
2. Houd het algemene register [`assets/references/character-registry.json`](../assets/references/character-registry.json) bij voor **ieder** nieuw belangrijk bijpersonage, monster of baas. Registreer exacte bestaande afbeeldingspaden, functie en goedkeuringsstatus; markeer nog niet gevonden bronnen als `pending` zonder een niet-bestaand pad te gokken. Het script is niet beperkt tot Aesther of hoofdpersonen.
3. Voer `npm run check:references` uit in de hoofdmap (vereist Node >=18). Voor machineleesbare inventaris: `node scripts/check-references.mjs --json`. De scan is recursief en vindt afbeeldingen ook als de namen afwijken.
4. Controleer de **exacte paden** van alle personages en monsters in de scènes. De drie actieve hoofdmodellen zijn verplicht voor scènes met het hoofdtrio:
   - `assets/references/characters/Krek Cragheart Karaktermodelblad.png` — KREK-M03.
   - `assets/references/characters/Nicola Tinkerer Karaktermodelblad.png` — NICOLA-M04.
   - `assets/references/characters/Nyra Spellweaver Karaktermodelblad.png` — NYRA-M03.
   - Alleen wanneer Hail in de scène voorkomt: `assets/references/characters/Hail Aesther Karakterblad.png` — HAIL-M01 (goedgekeurd op 21 oktober 2026).
5. Bekijk de pixels van de relevante beelden en controleer identiteit, modelstatus en leesbare aanzichten. **Bestandsbestaan is geen visuele inspectie.** Een naam of registertekst alleen bewijst niet dat het juiste beeld erin zit.
6. Geef de **daadwerkelijke afbeeldingen** aan het gebruikte beeldgeneratieproces als referentie waar die mogelijkheid bestaat; alleen een tekstuele verwijzing naar GitHub levert niet automatisch beeldconditionering op. Als de gekozen tool geen afbeeldingen kan aannemen, meld de beperking en vraag om een passende tool/workflow.
7. Gebruik `MODEL_GUIDE.md` voor definitieve personagevorm, `VISUAL_DIRECTION.md` voor grafische afwerking, `MAGIC_EFFECTS.md` voor kaartgebonden effecten. Oude poster, oudere modelversies en Frozen Hollow-stijlbeelden zijn historisch, geen nieuwe actieve beeldankers.
8. Bij ontbrekende, onleesbare of tegenstrijdige referenties: **stop voor het betrokken personage**, rapporteer het exacte ontbrekende pad/probleem, en verzin geen alternatief. Ga waar mogelijk door met onafhankelijke delen van de opdracht.

## Actief stijlanker naast de karaktermodellen

**SRC-STYLE-03:** [`assets/concepts/frozen-hollow-s06-p18-p19-artproef-03.png`](../assets/concepts/frozen-hollow-s06-p18-p19-artproef-03.png) is door de gebruiker goedgekeurd. Controleer dit bestand en bekijk de pixels vóór nieuwe productie. Geef het samen met de originele relevante modelbladen daadwerkelijk mee aan de generator: stijlplaat voor art en belichting, modelbladen voor identiteit en anatomie. Gebruik geen afgekeurde tussenproef in plaats van de originele modellen. De [compacte JPEG](../assets/concepts/frozen-hollow-s06-p18-p19-artproef-03-preview.jpg) is alleen een beoordelingskopie.

Het karakterregister blijft een register van personages en hun referenties. `npm run check:references` scant uitsluitend `assets/references`; de stijlplaat staat in `assets/concepts` en valt dus buiten die scan. Verifieer haar afzonderlijk, inclusief de SHA-256 in [ASSET_REGISTER.md](ASSET_REGISTER.md). Een geslaagde scan bewijst noch stijlplaatbeschikbaarheid noch daadwerkelijke beeld-overdracht. Zie [VISUAL_DIRECTION.md](VISUAL_DIRECTION.md) voor de vastgelegde stijl en motion-comicvoorbereiding.

## Aesther-bronnen voor Hail

`content/sources/REFERENCES.md` noemt Aesther Summoner, Diviner en Nightshroud als anatomische/etherische inspiratie voor Hail. De drie bijbehorende bestanden zijn volgens de lokale Codex-controle van 21 oktober 2026 op hun exacte paden aangetroffen en visueel bekeken. Ze zijn nu als **species-inspiration** bij Hail geregistreerd, niet als goedgekeurd model. Het controlescript controleert nu hun bestandsaanwezigheid; visuele beeldinspectie blijft bij productie nodig. Geen officiële klassevermogens, biografie of toekomstige scenario-inhoud overnemen. Hail heeft inmiddels een goedgekeurd HAIL-M01-modelblad: `assets/references/characters/Hail Aesther Karakterblad.png`, met diffuse gedeeltelijke transparantie, goud/zwart en een grijs-beige achtergrond. De oude blauw/grijze Hail-voorbeelden zijn geen actieve modelreferenties. Hail wordt uitsluitend meegenomen wanneer ze werkelijk in het verhaal voorkomt.

## Wat dit technisch wel en niet oplost

- **Wel:** recursieve bestandsinventarisatie in een lokale repository-checkout; automatische controle van alle in het register verplichte referenties; vindbaarheid van andere referenties zonder vaste naamgok; duidelijke productiestop bij ontbrekende essentiële bestanden.
- **Niet automatisch:** een beeld bekijken, beelden rechtstreeks uit ChatGPT's GitHub-connector halen, een afbeeldingsgenerator van visuele input voorzien, of de inhoud van afbeeldingen inhoudelijk valideren. Dat zijn aanvullende stappen in de daadwerkelijk gebruikte productieomgeving.
- De GitHub-connector in een gewone chat kan in deze omgeving losse bekende bestanden opvragen, maar biedt niet noodzakelijk een recursieve directorylijst of direct bruikbare afbeeldingspixels. De scan hoort daarom in de **Codex-werkmap/checkout** te lopen.

## Eenmalige proef

Laat Codex in de repository `npm run check:references` uitvoeren en rapporteer de totale hoeveelheid gevonden beeldbestanden, de status van de drie hoofdmodelbladen, het HAIL-M01-bijpersonagemodel en de gekoppelde ondersteunende referenties en eventuele nieuw toegevoegde, nog niet geregistreerde afbeeldingen. Bekijk vervolgens de Aesther-afbeeldingen voordat Hail een nieuw modelblad krijgt. Pas als deze proef slaagt is de inventarisatie **getest**; de aanwezigheid van het script op GitHub is nog geen uitgevoerde test.

## Verplichte preflight: echte referentie-overdracht (21 oktober 2026)

**Fail closed:** iedere nieuwe scène of regieproef met het hoofdtrio wordt vóór beeldgeneratie geblokkeerd totdat de daadwerkelijk goedgekeurde PNG-pixels aan de beeldgenerator kunnen worden meegegeven. GitHub-connectortekst, padnamen en de lokale `check:references`-scan zijn onvoldoende. Gebruik per zichtbaar hoofdpersonage exact KREK-M03, NICOLA-M04 en/of NYRA-M03; bij een echte Hail-scène HAIL-M01. Verifieer de beeldbestanden visueel, controleer dat de gekozen beeldtool hun afbeeldingsinhoud kan ontvangen en geef ze ook werkelijk mee. Registreer bij de proef welke model-ID's en beeldbestanden als input zijn gebruikt. Als deze koppeling ontbreekt of technisch niet te bevestigen is: **STOP vóór generatie**, leg uit waarom en regel eerst een ondersteunde route. Geen generieke fantasyvervanging, ook niet voor een snelle compositieproef. Inspecteer het eerste beeld op de vastgelegde anatomie voordat een tweede paneel volgt. Een mislukte proef blijft alleen compositiefeedback en wordt nooit nieuwe referentie.
