# Betrouwbare beeldreferenties voor nieuwe strips

**Doel:** een nieuwe Codex-sessie kan zelfstandig vaststellen welke afbeeldingen in GitHub aanwezig zijn, welke modelversie is goedgekeurd en welke bestanden de beeldgenerator werkelijk moet ontvangen. Geen nieuwe handmatige checklist per aflevering.

## Bij iedere nieuwe productie in de uitgecheckte repository

1. Lees `AGENTS.md`, `docs/VISUAL_DIRECTION.md`, `content/characters/MODEL_GUIDE.md`, `docs/MAGIC_EFFECTS.md` en de relevante episode/sessie.
2. Houd het algemene register [`assets/references/character-registry.json`](../assets/references/character-registry.json) bij voor **ieder** nieuw belangrijk bijpersonage, monster of baas. Registreer exacte bestaande afbeeldingspaden, functie en goedkeuringsstatus; markeer nog niet gevonden bronnen als `pending` zonder een niet-bestaand pad te gokken. Het script is niet beperkt tot Aesther of hoofdpersonen.
3. Voer `npm run check:references` uit in de hoofdmap (vereist Node >=18). Voor machineleesbare inventaris: `node scripts/check-references.mjs --json`. De scan is recursief en vindt afbeeldingen ook als de namen afwijken.
4. Controleer de **exacte paden** van alle personages en monsters in de scènes. De drie actieve hoofdmodellen zijn verplicht:
   - `assets/references/characters/Krek Cragheart Karaktermodelblad.png` — KREK-M03.
   - `assets/references/characters/Nicola Tinkerer Karaktermodelblad.png` — NICOLA-M04.
   - `assets/references/characters/Nyra Spellweaver Karaktermodelblad.png` — NYRA-M03.
5. Bekijk de pixels van de relevante beelden en controleer identiteit, modelstatus en leesbare aanzichten. **Bestandsbestaan is geen visuele inspectie.** Een naam of registertekst alleen bewijst niet dat het juiste beeld erin zit.
6. Geef de **daadwerkelijke afbeeldingen** aan het gebruikte beeldgeneratieproces als referentie waar die mogelijkheid bestaat; alleen een tekstuele verwijzing naar GitHub levert niet automatisch beeldconditionering op. Als de gekozen tool geen afbeeldingen kan aannemen, meld de beperking en vraag om een passende tool/workflow.
7. Gebruik `MODEL_GUIDE.md` voor definitieve personagevorm, `VISUAL_DIRECTION.md` voor grafische afwerking, `MAGIC_EFFECTS.md` voor kaartgebonden effecten. Oude poster, oudere modelversies en Frozen Hollow-stijlbeelden zijn historisch, geen nieuwe actieve beeldankers.
8. Bij ontbrekende, onleesbare of tegenstrijdige referenties: **stop voor het betrokken personage**, rapporteer het exacte ontbrekende pad/probleem, en verzin geen alternatief. Ga waar mogelijk door met onafhankelijke delen van de opdracht.

## Aesther-bronnen voor Hail

`content/sources/REFERENCES.md` noemt Aesther Summoner, Diviner en Nightshroud als anatomische/etherische inspiratie voor Hail. De drie bijbehorende bestanden zijn volgens de lokale Codex-controle van 21 oktober 2026 op hun exacte paden aangetroffen en visueel bekeken. Ze zijn nu als **species-inspiration** bij Hail geregistreerd, niet als goedgekeurd model. Het controlescript controleert nu hun bestandsaanwezigheid; visuele beeldinspectie blijft bij productie nodig. Geen officiële klassevermogens, biografie of toekomstige scenario-inhoud overnemen. Hail blijft een subtiel transparante Aesther-onderzoeker; haar afzonderlijke definitieve modelblad is nog niet goedgekeurd.

## Wat dit technisch wel en niet oplost

- **Wel:** recursieve bestandsinventarisatie in een lokale repository-checkout; automatische controle van alle in het register verplichte referenties; vindbaarheid van andere referenties zonder vaste naamgok; duidelijke productiestop bij ontbrekende essentiële bestanden.
- **Niet automatisch:** een beeld bekijken, beelden rechtstreeks uit ChatGPT's GitHub-connector halen, een afbeeldingsgenerator van visuele input voorzien, of de inhoud van afbeeldingen inhoudelijk valideren. Dat zijn aanvullende stappen in de daadwerkelijk gebruikte productieomgeving.
- De GitHub-connector in een gewone chat kan in deze omgeving losse bekende bestanden opvragen, maar biedt niet noodzakelijk een recursieve directorylijst of direct bruikbare afbeeldingspixels. De scan hoort daarom in de **Codex-werkmap/checkout** te lopen.

## Eenmalige proef

Laat Codex in de repository `npm run check:references` uitvoeren en rapporteer de totale hoeveelheid gevonden beeldbestanden, de status van de drie hoofdmodelbladen en de gekoppelde ondersteunende referenties en eventuele nieuw toegevoegde, nog niet geregistreerde afbeeldingen. Bekijk vervolgens de Aesther-afbeeldingen voordat Hail een nieuw modelblad krijgt. Pas als deze proef slaagt is de inventarisatie **getest**; de aanwezigheid van het script op GitHub is nog geen uitgevoerde test.
