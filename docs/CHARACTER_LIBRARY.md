# Karakterbibliotheek — bijpersonages, monsters en bazen

**Status 21 oktober 2026.** Lichtgewicht registratie voor Stone & Cold Tinkering. Dit is geen nieuwe ontwerpverplichting: het verhaal staat voorop. De drie hoofdpersonages hebben hun eigen goedgekeurde modelbladen in `assets/references/characters/` en vallen onder `content/characters/MODEL_GUIDE.md`.

**Centraal register:** [`assets/references/character-registry.json`](../assets/references/character-registry.json) bevat machineleesbare beeldreferenties en goedkeuringsstatus voor **ieder** relevant personage, niet alleen Hail. Koppel nieuwe beelden met exacte gecontroleerde paden; gebruik `pending` zolang een karakterblad nog niet is goedgekeurd.

**Technische controle:** gebruik [REFERENCE_WORKFLOW.md](REFERENCE_WORKFLOW.md) en `npm run check:references` voordat Hail of een andere NPC wordt getekend. De drie Aesther-illustraties zijn volgens de Codex-proef van 21 oktober op de geregistreerde paden gevonden en visueel gecontroleerd. Ze zijn in het register gekoppeld als **soortinspiratie**, niet als goedgekeurd Hail-model.

## Wanneer registreren?

- **A — volledig:** belangrijke terugkerende bijpersonages of bijzondere eindbazen zodra hun verhaalrol het rechtvaardigt. Vast modelblad alleen als een expliciete review echt nodig is.
- **B — herkenbaar:** relevante NPC's, unieke vijanden of terugkerende tegenstanders. Eén compacte referentie: naam, bron, visueel profiel, persoonlijkheid/rol, continuïteitsstatus.
- **C — basis:** eenmalige monsters, figuranten en monstersoorten. Officiële soortreferentie plus enkele anatomie-/stijlaanwijzingen volstaat. Monsterindividuen pas apart opnemen als ze een eigen verhaalidentiteit hebben.

Begin een registratie **pas na verschijning in gespeeld of door gebruiker vrijgegeven materiaal**. Geen toekomstige locaties, spoilers, verborgen facties, onontmoete vijanden of verzonnen biografieën. Scheid OFFICIEEL-2E (alleen gecontroleerd), BRONFOTO, GESPEELD en CREATIEF volgens `WORLDBUILDING.md`.

## Minimale registratie

- Naam / type / niveau A-B-C
- Eerste bevestigde verschijning en bron
- Identiteit: soort, vorm, onderscheidende kenmerken (korte alinea)
- Karakterrol, herkenbaar gedrag en eventuele kaartgebonden effecten (indien bekend)
- Link naar huidige **daadwerkelijk bestaande** beeldreferentie, of markering `nog geen goedgekeurd model`
- Later: alleen bij terugkeer of expliciete nieuwe gebruikerscorrectie uitbreiden

Geen verplichte vragenlijsten, aparte documentatie per figurant of ontwerprondes zonder reden. Oude beelden blijven archief, geen automatisch stijlanker. `docs/VISUAL_DIRECTION.md` en `docs/MAGIC_EFFECTS.md` blijven leidend voor de getekende uitvoering.

## Hail — goedgekeurd model HAIL-M01 (niveau A)

- **Soort/rol:** belangrijke Aesther-onderzoeker; betrokken bij de Frozen Hollow-epiloog en Nyra's verhaalhaak.
- **Vastgelegde kenmerken:** licht etherisch en subtiel transparant, ook in stilstaand beeld; geen gewone elf, geen elfenoren. Droge, zakelijke onderzoeker met beperkte tolerantie voor onzin, herkenbaar anders dan Nyra's bedachtzame superioriteit.
- **Referentie:** bestaande Aesther-bronnen en afspraken in `docs/VISUAL_DIRECTION.md` en `content/sources/REFERENCES.md`. Geen klassevermogens uit losse Aesther-afbeeldingen overnemen.
- **Beeldstatus:** **HAIL-M01 goedgekeurd**. Vaste visuele referentie: [Hail Aesther Karakterblad](../assets/references/characters/Hail%20Aesther%20Karakterblad.png). Diffuus en deels doorschijnend, zwart/goud, uitstraling van enorme magische macht, karakterblad met grijs-beige achtergrond. De drie Aesther-klassebeelden blijven uitsluitend ondersteunende soort-/etherische inspiratie. Eerdere blauw/paarse, elfachtige of zwarte-achtergrondproeven zijn geen actuele karakterreferentie.
- **Lorestatus:** alleen bevestigde episodefeiten worden canon; andere uitwerkingen blijven creatief of onbevestigd.

## Vijanden en eindbazen

Begin met de gespeelde vijandsoort (C) en verhoog naar B of A wanneer een specifiek individu narratief terugkeert of een herkenbaar ontwerp nodig heeft. Gebruik klasse-/monsterillustraties voor soortanatomie, niet voor de oude schilderachtige striprender. Bewaar identieke soorten consistent maar geef niet ieder exemplaar automatisch hetzelfde unieke gezicht. Geen monsters uit nog niet gespeelde scenario's registreren.
