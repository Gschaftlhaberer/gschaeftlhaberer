<script lang="ts">
	import { db } from '$lib/db';
    import { Input, Button, P, Heading, Label } from 'flowbite-svelte';
    let link: string = '';
    let request_success = false;
    let replicationError: string | null = null;

    function validateLink(value: string): boolean {
        value = value.trim();
        const pattern: RegExp = /^https?:\/\/.+/;
        return pattern.test(value);
    }
    $: isValidLink = link !== '' && validateLink(link);

    // Handler für Sync-Ereignisse
    function onSyncChange(change: any) {
        console.log('Sync change:', change);
    }

    function onSyncPaused(error: any) {
        if (error) {
            console.log('Sync paused due to replication error', error);
        } else {
            console.log('Sync paused/resumed');
        }
    }

    function onSyncError(error: any) {
        console.error('Sync error:', error);
        replicationError = "Fehler bei der Synchronisation. Bitte überprüfen Sie den Link und versuchen Sie es erneut.";
    }

    async function handleReplication() {
        if (isValidLink) {
            const opts = { live: true, retry: true };
            request_success = false;
            replicationError = null;
            $db.replicate.from(link).on('complete', function() {
                $db.sync(link, opts)
                    .on('change', onSyncChange)
                    .on('paused', onSyncPaused)
                    .on('error', onSyncError);
                request_success = true;
            }).on('error', onSyncError);
        }
    }
</script>

<svelte:head>
    <title>Settings - G'schäft'lhaberer</title>
</svelte:head>

<form on:submit|preventDefault={handleReplication}>
    <Heading class="my-5">Settings</Heading>
    <div class="flex flex-col gap-4 mt-6">
        <Label>Link für die Synchronisation</Label>
        <Input
            bind:value={link} 
            placeholder="https://example.com"
            invalid={!isValidLink && link !== ''}
            aria-label="Link eingeben"
            class={isValidLink ? 'valid-input' : link !== '' ? 'invalid-input' : ''}
        />

        <Button color="green" type="submit" disabled={!isValidLink} class={isValidLink ? 'valid-button' : ''}>
            Bestätigen
        </Button>
        {#if replicationError}
            <P class="text-red-500">{replicationError}</P>
        {/if}
        {#if request_success}
            <P>Einmalige Replikation abgeschlossen. Kontinuierliche Synchronisation gestartet.</P>
        {/if}
    </div>
</form>
