<script lang="ts">
    import { Input, Button, Label } from 'flowbite-svelte';
    let link: string = '';
    let isValidLink: boolean = false;

    function validateLink(value: string): boolean {
        value = value.trim();
        const pattern: RegExp = /^https?:\/\/.+/;
        return pattern.test(value);
    }
    $: isValidLink = link !== '' && validateLink(link);
</script>

<svelte:head>
    <title>Settings - G'schäft'lhaberer</title>
</svelte:head>


<form on:submit|preventDefault>
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

        <Button type="submit" disabled={!isValidLink} class={isValidLink ? 'valid-button' : ''}>
            Bestätigen
        </Button>
    </div>
</form>
