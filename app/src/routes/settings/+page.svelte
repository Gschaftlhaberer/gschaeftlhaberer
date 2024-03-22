<script lang="ts">
    import { Input, Button, Label } from 'flowbite-svelte';
    import PouchDB from 'pouchdb';
    let link: string = '';
    let isValidLink: boolean = false;
    let replicationError: string | null = null;

    function validateLink(value: string): boolean {
        value = value.trim();
        const pattern: RegExp = /^https?:\/\/.+/;
        return pattern.test(value);
    }
    $: isValidLink = link !== '' && validateLink(link);

    async function handleReplication() {
        if (isValidLink) {
            try {
                await PouchDB.replicate('shopping', link);
                alert("Replikation erfolgreich!");
            } catch (error) {
                console.error("Replikationsfehler: ", error);
                replicationError = "Fehler bei der Replikation. Bitte überprüfen Sie den Link und versuchen Sie es erneut.";
            }
        }
    }
</script>

<svelte:head>
    <title>Settings - G'schäft'lhaberer</title>
</svelte:head>

<form on:submit|preventDefault={handleReplication}>
    <div class="flex flex-col gap-4">
        <Label for="first_name" class="mb-2">First name</Label>
        <Input
            bind:value={link}
            on:input={() => isValidLink = validateLink(link)}
            placeholder="https://example.com"
            invalid={!isValidLink && link !== ''}
            aria-label="Link eingeben"
            class={isValidLink ? 'valid-input' : link !== '' ? 'invalid-input' : ''}
        />

        <Button color="green" type="submit" disabled={!isValidLink} class={isValidLink ? 'valid-button' : ''}>
            Bestätigen
        </Button>
        {#if replicationError}
            <p class="text-red-500">{replicationError}</p>
        {/if}
    </div>
</form>
