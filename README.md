# Gschäftl Haberer

[![official repo](https://img.shields.io/badge/official_repo-Gschaftlhaberer%2Fgschaeftlhaberer-blue?logo=github)](https://github.com/Gschaftlhaberer/gschaeftlhaberer) [![Website](https://img.shields.io/website?url=https%3A%2F%2Fgschaeftlhaberer.at%2F&logo=github&label=https%3A%2F%2Fgschaeftlhaberer.at%2F)](https://gschaeftlhaberer.at) [![GitHub deployments](https://img.shields.io/github/deployments/Gschaftlhaberer/gschaeftlhaberer/github-pages?logo=github&label=website%20deployment)](https://github.com/Gschaftlhaberer/gschaeftlhaberer/deployments/github-pages) [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Gschaftlhaberer/gschaeftlhaberer/main-publish.yml?logo=github&label=publish%20main)](https://github.com/Gschaftlhaberer/gschaeftlhaberer/actions/workflows/main-publish.yml) [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Gschaftlhaberer/gschaeftlhaberer/main-technical-document.yml?logo=github&label=technical%20document%20build)](https://github.com/Gschaftlhaberer/gschaeftlhaberer/actions/workflows/main-technical-document.yml) [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Gschaftlhaberer/gschaeftlhaberer/release-publish.yml?logo=github&label=publish%20release)](https://github.com/Gschaftlhaberer/gschaeftlhaberer/actions/workflows/release-publish.yml)

Eine Einkaufsliste für Mitglieder eines kapitalistischen Systems. Die Einkaufsliste soll helfen, den Einkauf zu erleichtern und die Einkaufszeit zu verkürzen.

---

### **Teammitglieder**

- Philip Damianik 5BHIT - Technical Architect
- Julian Doppelhofer 5BHIT - Product Owner
- Luka Bomostar 5BHIT - Ameise
- Julian Proksch 5DHIT - Bmeise

---

### **Verwendung**

#### Verwendung mit Docker Compose

1. **Release herunterladen**: Gehen Sie zum [GitHub-Release-Bereich](https://github.com/Gschaftlhaberer/gschaeftlhaberer/releases/latest) des Projekts und laden Sie die neueste Version der `docker-compose.yml`-Datei herunter. Diese Datei enthält alle notwendigen Dienstkonfigurationen, einschließlich einer CouchDB Datenbank.

2. **Docker Compose ausführen**: Öffnen Sie ein Terminal oder eine Kommandozeile in dem Verzeichnis, in dem Sie die `docker-compose.yml`-Datei gespeichert haben, und führen Sie den Befehl `docker-compose up` aus. Dieser Befehl startet alle Dienste, die für Gschäftl Haberer erforderlich sind, einschließlich der Datenbank.

3. **Verwenden Sie Tags**: Wenn Sie eine spezifische Version des Projekts verwenden möchten, können Sie die `docker-compose.yml`-Datei bearbeiten, um einen spezifischen Tag für die Image-Versionen anzugeben. Docker Images werden für den `main` branch und commits auf dem `main`-Branch veröffentlicht.

#### Verwendung durch Hochladen auf einen Webserver

1. **Archivdateien herunterladen**: Laden Sie die ZIP- oder tar.gz-Archive aus dem [Release-Bereich](https://github.com/Gschaftlhaberer/gschaeftlhaberer/releases/latest) des Projekts herunter. Diese Archive enthalten die notwendigen Dateien, um Gschäftl Haberer auf einem Webserver zu betreiben.

2. **Dateien auf den Webserver hochladen**: Entpacken Sie das Archiv und laden Sie die enthaltenen Dateien auf Ihren Webserver hoch. Stellen Sie sicher, dass Ihr Webserver korrekt [konfiguriert](https://kit.svelte.dev/docs/adapter-static) ist, um die Anwendung zu hosten.

3. **Datenbank einrichten**: Wenn Sie die Webserver-Methode verwenden, müssen Sie eine Datenbank manuell einrichten. Folgen Sie den Anweisungen Ihres Datenbankanbieters, um eine neue CouchDB Datenbank zu erstellen, und konfigurieren Sie die Anwendung entsprechend, um eine Verbindung zu dieser Datenbank herzustellen.

### Development

[CONTRIBUTION.md](CONTRIBUTION.md)

### User Stories

[STORIES.md](STORIES.md)
