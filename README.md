# TODO

* Visa även ställningarnas namn t ex Ruy Lopez osv.
* prune, skär bort små grenar från trädet. T ex med mindre än 300 partier

# Bakgrund

Avsikten med denna app är att träna in de vanligaste öppningarna.  
Det är inte självklart att det handlar om de bästa dragen,  
däremot de populäraste bland schackspelare med FIDE-rating över 2200.  
Spelöppningsfällor saknas här, eftersom sådana drag innebär att man medvetet spelar ett sämre drag,  
för att hamna i en ovanlig ställning, som motståndaren förhoppningsvis inte är bekant med,  
och därmed gör bort sig eller förlorar på tid.  
Spelar båda spelarna de bästa dragen hamnar man ganska nära noll i dator-utvärdering.  

# tree.json
Byggs upp med hjälp av ett antal master.pgn-filer och ett pythonprogram.  
Löven (1) propageras uppåt till roten.  
{"n":3456789,
"e2e4":{"n": 4712,
	"e7e5":{...}}}  
4712 anger antal partier som inleds med e2e4.  
Efter inläsning beskärs trädet för att få bort de små grenarna, under t ex 300 partier.

# localstorage
Underhålls av javascript.
Används för att hålla reda på en användares status.  
root: e2e4.e7e5.g1f3.b8c6.f1b5 # Denna öppning vill man träna på  
latest: <path> # Senast hämtad öppning  
Boxes innehåller fem lådor med kort.  
Varje kort representeras av en path.  
Localstorage innehåller maximalt 5 + 10 + 20 + 40 + 80 = 155 kort, per öppning.  
Man kan välja nya öppningar med en knapptryckning och även byta.  
```
{
	root: "e2e4.e7e5.g1f3.b8c6.f1b5" # dvs Ruy Lopez
	latest: "a7a6.b5a4" # relativt root.
	boxes: # relativt root
		[
		"a7a6 a7a6.f1b5", # två kort
		"a7a6.f1b5.b5a4.g8f6", # ett kort
		"",
		"",
		""
	]
}
```

# Hur man väljer ut frågor.

* Välj ut första låda som överstiger lådans kapacitet.
* Kapaciteterna är [5,10,20,40,80] kort för de olika lådorna.
* Om ingen låda överskrider taket
	* fyll på första lådan med en ny position från quiz.json.
	* Välj nästa key med samma längd => Latest.
	* Öka längden av key om nödvändigt. T ex från 'e2e4' till 'd2d4.d7d5'
	* Meningen är att träna bred före djup.

* Lådorna fungerar som köer.
* Nya kort läggs in i början på vektorn.
* Kort plockas ut från slutet.
```
Låda 0: d2d4.d7d5 e2e4.e7e5 d2d4.d7d5.c2c4 g2g3 (5 kort)
Låda 1: a2a4 b2b4 c2c4 d2d4 e2e4 f2f4 g2g4 h2h4 g1f3 b1c3 e2e3 (11 kort)
Låda 2: c2c4.c7c5
Låda 3:
Låda 4:
```

Låda 1 överstiger maxantalet, 11 > 10.  
Därför hämtas sista kortet, e2e3.  
Svarar man rätt på denna fråga, flyttas kortet från Låda 1 till Låda 2.  
Svarar man fel, läggs kortet först i Låda 0.  
Då låda 4 passerats, kastas kortet bort, eftersom man svarat rätt fem gånger i rad.  

Rätt:
```
Låda 0: e2e3 d2d4.d7d5 e2e4.e7e5 d2d4.d7d5.c2c4 g2g3 (6 kort)
Låda 1: a2a4 b2b4 c2c4 d2d4 e2e4 f2f4 g2g4 h2h4 g1f3 b1c3 (10 kort)
Låda 2: c2c4.c7c5
Låda 3:
Låda 4:
```

Fel:
```
Låda 0: d2d4.d7d5 e2e4.e7e5 d2d4.d7d5.c2c4 g2g3 (5 kort)
Låda 1: a2a4 b2b4 c2c4 d2d4 e2e4 f2f4 g2g4 h2h4 g1f3 b1c3 (11 kort)
Låda 2: e2e3 c2c4.c7c5
Låda 3:
Låda 4:
```

# GUI:

![bild](e2e4.d7d6.JPG)

Utför det vanligaste draget!
(tryck på mellanslag för facit)

# Prestanda

Att välja nästa drag med utgångspunkt av nuvarade val,
kan troligen snabbas upp.
Just nu hämtas en nivå i trädet och detta kräver att hela subträdet traverseras.
Dessa pather bör eventueelt cachas. Antingen i nuvarande session eller sparas i localStorage.
Kan handla om tiotusentals 'e2e4.e7e5.g1f3...'-drag i en lista.
