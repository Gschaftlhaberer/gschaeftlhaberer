# Contribution

## Dependencies

- [node](https://nodejs.org/en/download) >= 18
- [pnpm](https://pnpm.io/installation)
- [docker](https://docs.docker.com/get-docker/) & [docker-compose](https://docs.docker.com/compose/install/)

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

Für Unit-Tests kommt im Projekt [vitest](https://vitest.dev/) zum Einsatz. Die Tests können mit dem folgenden Befehl ausgeführt werden.

```shell
pnpm test:unit
```

Für Integrationstests kommt [Playwright](https://playwright.dev/) zum Einsatz. Die Tests können mit dem folgenden Befehl ausgeführt werden.

```shell
pnpm test:integration
```

> Für die Integrationstests sind Dependencies notwendig, die mit dem folgenden Befehl installiert werden können.
>
> ```shell
> pnpm exec playwright install
> ```

Als shortcut für beide Testarten kann der folgende Befehl verwendet werden.

```shell
pnpm test
```

## Entwicklung

Das Projekt baut auf [SvelteKit](https://kit.svelte.dev/docs) auf.

Die Startseite ist in [app/src/routes/+page.svelte](app/src/routes/+page.svelte) zu finden. Alle Unterordner unter [app/src/routes](app/src/routes) sind ein Teil des Pfades unter dem eine Seite verfügbar ist (`/settings` -> [app/src/routes/**settings**/+page.svelte](app/src/routes/settings/+page.svelte)). SvelteKit ordnen manchen Dateinamen spezielle Bedeutung zu, von welchen [`+page.svelte`](https://kit.svelte.dev/docs/routing#page) und [`+layout.svelte`](https://kit.svelte.dev/docs/routing#layout) die wichtigsten sind. `+page.svelte` defininiert, was angezeigt wird, wenn der Pfad aufgerufen wird. `+layout.svelte` enthält den Inhalt, welcher um die `+page.svelte` im aktuellen Verzeichnis und allen `+page.svelte` und `+layout.svelte` Dateien, welche in Unterordern liegen gerendered wird. Der Inhalt wird an Stelle der `<slot>` Komponente eingefügt. Weitere Dokumentation zu SvelteKit Routing und Layouts ist [hier](https://kit.svelte.dev/docs/routing) zu finden.

Library Funktionen und Komponenten (also jene, die in mehreren Dateien verwendet werden) sind in [app/src/lib](app/src/lib) zu finden.

Als Datenbank im Browser kommt [PouchDB](https://pouchdb.com/) zum Einsatz. Diese wird in der Datei [app/src/routes/+layout.svelte](app/src/routes/+layout.svelte) erstellt und ist in der gesamten Anwendung über den [Kontext](https://svelte.dev/docs/svelte#setcontext) mittels der Funktion `getDb` verfügbar. Die API von PouchDB ist [hier](https://pouchdb.com/api.html) dokumentiert.

Als component library steht in diesem Projekt (Flowbite Svelte)[https://flowbite-svelte.com/docs/components] zur Verfügung und baut auf [Tailwind CSS](https://tailwindcss.com/docs) auf, welches für zusätzliche Stylingmöglichkeiten verwendet werden kann.

## Branches

**main** Der Hauptbranch, der die aktuelle Entwicklungsversion des Projekts enthält.

Alle anderen Branches werden nach dem Schema `category/short-description` benannt.

Die Kategorien sind:

- **feat/** Branches, die für die Entwicklung neuer Features verwendet werden.
- **fix/** Branches, die für die Behebung von Fehlern verwendet werden.
- **chore/** Branches, die für die Wartungsaufgaben verwendet werden.
- **docs/** Branches, die für die Dokumentation verwendet werden.
