<script>
    export let liste;
  
    // Hier könntest du Funktionen für das Löschen oder Bearbeiten hinzufügen
  </script>
  
  <div>
    <h3>{liste.titel}</h3>
    <ul>
      {#each liste.artikel as artikel}
        <li>{artikel.name} ({artikel.menge}) - {artikel.geschäft}</li>
      {/each}
    </ul>
    // Buttons für Bearbeiten und Löschen hier einfügen
  </div>
  