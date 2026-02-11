# Struktogrammeditor

Freies offenes Webprogramm zur Erstellung von Struktogrammen sowie zur Umwandlung dessen in Code (Python, PHP, Java).
Online nutzbar unter [https://ddi.education/struktog/](https://ddi.education/struktog/) oder als [Download](#download) einfach die index.html öffnen.
Freie Software lebt von [Mitarbeit](#entwicklung). Gerne Kontakt aufnehmen und mithelfen.

## Konfiguration

Der Editor kann über verschiedene URL-Parameter angepasst werden. Dabei ist es möglich die Konfiguration zu ändern, um z.B. verschiedene Elemente auszublenden oder schon vorgefertigte Templates für Aufgaben geladen werden.

### Verfügbare Elemente

- Anweisung, Eingabe, Ausgabe
- Zählergesteuerte Schleife, Kopfgesteuerte Schleife, Fußgesteuerte Schleife
- Verzweigung, Fallunterscheidung, trycatch
- Funktionsblock

### Vorgegebene Konfiguration

Als Standard werden alle Elemente geladen.

Für Python (https://dditools.inf.tu-dresden.de/struktog/?config=python):

```bash
{domain}/?config=python
```

Für Python mit Funktionsblock (https://dditools.inf.tu-dresden.de/struktog/?config=python_func):

```bash
{domain}/?config=python_func
```

### Beispiel Aufgaben

Aufgaben können über eine übergebene URL geladen werden. Der Server auf dem die Beispiele hinterlegt werden, muss die entsprechende CORS Richtlinie freigeben, um CROSS ORIGIN zu erlauben. Alternativ können die Beispielaufgaben im Ordner 'src/assets/examples/' hinterlegt und dann direkt geladen werden.

```bash
{domain}/?url=https://dditools.inf.tu-dresden.de/struktog/example1.json
{domain}/?url=example1.json
```

# Download

- [Last-Release](https://dditools.inf.tu-dresden.de/releases/struktog/struktog-v1.3.0.tar.gz)
- [Last-Build](https://dditools.inf.tu-dresden.de/releases/struktog/struktog-latest.tar.gz)

# Maintainer

Thiemo Leonhardt

# Lizenz

aGPL 3

# Entwicklung

Die Entwicklung basiert auf den Paketen aus npm mit yarn und läuft momentan auf NodeJS Fermium.
Installation von Node und Git ist Voraussetzung.

## Installation

```bash
yarn
```

## Development

Startet einen lokalen Webserver und aktualisiert Inhalte während der Entwicklung.

```bash
yarn run watch
```

## Deployment

Der fertige Build wird in dem Unterordner './build ' abgelegt.

```bash
yarn run build
```

## Tests

Die UI-Tests werden mit Selenium gegen den lokalen Build ausgefuehrt.

```bash
npm test
```

`npm test` baut zuerst das Projekt und startet dann `test/buttontest.js`.

### Optionale Umgebungsvariablen

- `STRUKTOG_MAX_DEPTH` steuert die Verschachtelungstiefe (Standard: `2`)
- `STRUKTOG_FAST_NESTED=true` aktiviert einen schnelleren Nested-Modus
- `STRUKTOG_VERBOSE=true` zeigt detaillierte Testschritte statt kompakter Summary
- `STRUKTOG_TEST_URL` ueberschreibt die zu testende URL (Standard: lokales `build/index.html`)

## Offline-Nutzung

Im Produktionsbuild wird automatisch ein Service Worker erstellt und registriert.
Dadurch kann die Webanwendung nach dem ersten Laden auch ohne Internetverbindung weiter genutzt werden.

Hinweise:

- Service Worker werden nur in sicheren Kontexten verwendet (`https://` oder `localhost`).
- Nach Updates kann ein hartes Neuladen noetig sein, damit neue Assets direkt aktiv sind.
