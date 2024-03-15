<script>
    import { onMount } from 'svelte';
    import { db } from '$lib/db';
    import ListenItem from './ListenItem.svelte';
  
    let listen = [];
  
    onMount(async () => {
      const result = await db.allDocs({ include_docs: true, descending: true });
      listen = result.rows.map(row => row.doc);
    });
  </script>
  
  <div>
    {#each listen as liste}
      <ListenItem {liste} />
    {/each}
  </div>
  