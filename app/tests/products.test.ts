import { expect, test, type Page } from '@playwright/test';

async function createList(page: Page) {
	await page.goto('/');
	const newButton = page.getByRole('button', { name: 'Neue Liste erstellen' });
	await newButton.click();
	const nameInput = page.getByRole('textbox', { name: 'Name' });
	await nameInput.fill('Test');
	const confirmCreationButton = page.getByRole('button', { name: 'Liste hinzufügen' });
	await confirmCreationButton.click();
}

test('test no products', async ({ page }) => {
	await createList(page);

	await page.goto('/items/test');
	await expect(page.getByText('Keine Produkte vorhanden')).toBeVisible();
});

test('create a product', async ({ page }) => {
	const productName = 'Testprodukt';

	await createList(page);

	await page.goto('/items/test');
	const newButton = page.getByRole('button', { name: 'Produkt erstellen' });
	await expect(newButton).toBeVisible();
	await newButton.click();

	const nameInput = page.getByRole('textbox', { name: 'Produktname' });
	await expect(nameInput).toBeVisible();
	await nameInput.fill(productName);
	const countInput = page.getByLabel('Anzahl');
	await expect(countInput).toBeVisible();
	await countInput.fill('4');
	const confirmButton = page.getByRole('button', { name: 'Erstellen', exact: true });
	await expect(confirmButton).toBeVisible();
	await confirmButton.click();

	const productLabel = page.getByRole('heading', { name: productName });
	await expect(productLabel).toBeVisible();
	const productCountLabel = page.getByText('4 Stück');
	await expect(productCountLabel).toBeVisible();
});

test('delete  a product', async ({ page }) => {
	const productName = 'Testprodukt';

	await createList(page);

	await page.goto('/items/test');
	const newButton = page.getByRole('button', { name: 'Produkt erstellen' });
	await newButton.click();

	const nameInput = page.getByRole('textbox', { name: 'Produktname' });
	await nameInput.fill(productName);
	const countInput = page.getByLabel('Anzahl');
	await countInput.fill('4');
	const confirmButton = page.getByRole('button', { name: 'Erstellen', exact: true });
	await confirmButton.click();

	const deleteButton = page.getByRole('button').first();
	await expect(deleteButton).toBeVisible();
	await deleteButton.click();

	await expect(page.getByText('Keine Produkte vorhanden')).toBeVisible();
});
