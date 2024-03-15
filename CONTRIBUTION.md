# Contribution

## Dependencies

- node >= 18
- pnpm
- docker & docker-compose

## Setup

Zuerst muss das Projekt geklont werden.

```shell
git clone https://github.com/gschaeftlhaberer/gschaeftlhaberer.git
cd gschaeftlhaberer
```

Falls auch auf das Schul Repository gepushed werden soll muss man eine zweite URL hinzufügen:

```shell
git remote set-url --add origin https://github.com/TGM-HIT/syt5-gek1051-mobile-application-gschaeftlhaberer/
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

Eine Testdatenbank kann mit Docker-Compose gestartet werden:

```shell
docker-compose up -d
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
>
> ```shell
> pnpm exec playwright install
> ```

## Entwicklung

Das Projekt baut auf [SvelteKit](https://kit.svelte.dev/docs) auf. Die Startseite ist in [src/routes/+page.svelte](src/routes/+page.svelte) zu finden. Weitere Dokumentation zu SvelteKit Routing und Layouts ist [hier](https://kit.svelte.dev/docs/routing) zu finden.

Als Datenbank im Browser kommt [PouchDB](https://pouchdb.com/) zum Einsatz. Diese wird in der Datei [src/routes/+layout.svelte](src/routes/+layout.svelte) erstellt und ist in der gesamten Anwendung über den [Kontext](https://svelte.dev/docs/svelte#setcontext) mittels der Funktion `getDb` verfügbar. Die API von PouchDB ist [hier](https://pouchdb.com/api.html) dokumentiert.

Als component library steht in diesem Projekt (Flowbite Svelte)[https://flowbite-svelte.com/docs/components] zur Verfügung.

## Branches

**main** Der Hauptbranch, der die aktuelle Entwicklungsversion des Projekts enthält.

Alle anderen Branches werden nach dem Schema `category/short-description` benannt.

Die Kategorien sind:

- **feat/** Branches, die für die Entwicklung neuer Features verwendet werden.
- **fix/** Branches, die für die Behebung von Fehlern verwendet werden.
- **chore/** Branches, die für die Wartungsaufgaben verwendet werden.
- **docs/** Branches, die für die Dokumentation verwendet werden.
