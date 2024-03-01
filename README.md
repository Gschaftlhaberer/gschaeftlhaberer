# Gschäftl Haberer

Eine Einkaufsliste für Mitglieder eines kapitalistischen Systems. Die Einkaufsliste soll helfen, den Einkauf zu erleichtern und die Einkaufszeit zu verkürzen.

---

### **Teammitglieder**

- Luka Bomostar 5BHIT
- Julian Doppelhofer 5BHIT
- Philip Damianik 5BHIT
- Julian Proksch 5DHIT

---

### **Verwendung**

#### Verwendung mit Docker Compose
1. **Release herunterladen**: Gehen Sie zum GitHub-Release-Bereich des Projekts und laden Sie die neueste Version der `docker-compose.yml`-Datei herunter. Diese Datei enthält alle notwendigen Dienstkonfigurationen, einschließlich der Datenbank.

2. **Docker Compose ausführen**: Öffnen Sie ein Terminal oder eine Kommandozeile in dem Verzeichnis, in dem Sie die `docker-compose.yml`-Datei gespeichert haben, und führen Sie den Befehl `docker-compose up` aus. Dieser Befehl startet alle Dienste, die für Gschäftl Haberer erforderlich sind, einschließlich der Datenbank.

3. **Verwenden Sie Tags**: Wenn Sie eine spezifische Version des Projekts verwenden möchten, können Sie die `docker-compose.yml`-Datei bearbeiten, um einen spezifischen Tag für die Image-Versionen anzugeben. Docker Images werden für den `main` branch und commits auf dem `main`-Branch veröffentlicht.

#### Verwendung durch Hochladen auf einen Webserver
1. **Archivdateien herunterladen**: Laden Sie die ZIP- oder tar.gz-Archive aus dem Release-Bereich des Projekts herunter. Diese Archive enthalten die notwendigen Dateien, um Gschäftl Haberer auf einem Webserver zu betreiben.

2. **Dateien auf den Webserver hochladen**: Entpacken Sie das Archiv und laden Sie die enthaltenen Dateien auf Ihren Webserver hoch. Stellen Sie sicher, dass Ihr Webserver korrekt [konfiguriert](https://kit.svelte.dev/docs/adapter-static) ist, um die Anwendung zu hosten.

3. **Datenbank einrichten**: Wenn Sie die Webserver-Methode verwenden, müssen Sie eine Datenbank manuell einrichten. Folgen Sie den Anweisungen Ihres Datenbankanbieters, um eine neue CouchDB Datenbank zu erstellen, und konfigurieren Sie die Anwendung entsprechend, um eine Verbindung zu dieser Datenbank herzustellen.

### Development

[CONTRIBUTION.md](CONTRIBUTION.md)

### User Stories

[STORIES.md](STORIES.md)
