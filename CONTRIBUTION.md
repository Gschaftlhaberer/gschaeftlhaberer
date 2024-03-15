# Contribution

## Dependencies

- node >= 18
- pnpm

## Setup

Zuerst muss das Projekt geklont werden.

```shell
git clone https://github.com/gschaeftlhaberer/gschaeftlhaberer.git
cd gschaeftlhaberer
```

Anschließend müssen die Abhängigkeiten installiert werden.

```shell
pnpm install
```

Danach kann das Projekt gestartet werden.

```shell
pnpm dev
pnpm dev:open # öffnet das Projekt im Browser
```
## Testen

Die Unit Tests können mit dem folgenden Befehl ausgeführt werden.
```shell
pnpm test:unit
```

Die Integrationstests können mit dem folgenden Befehl ausgeführt werden.
```shell
pnpm test:integration
```

> Für die Integrationstests sind Dependencies notwendig, die mit dem folgenden Befehl installiert werden können. 
> ```shell
> pnpm exec playwright install
> ```

## Branches

**main** Der Hauptbranch, der die aktuelle Entwicklungsversion des Projekts enthält.

Alle anderen Branches werden nach dem Schema `category/short-description` benannt.

Die Kategorien sind:

- **feat/** Branches, die für die Entwicklung neuer Features verwendet werden.
- **fix/** Branches, die für die Behebung von Fehlern verwendet werden.
- **chore/** Branches, die für die Wartungsaufgaben verwendet werden.
- **docs/** Branches, die für die Dokumentation verwendet werden.