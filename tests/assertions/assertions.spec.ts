import { test, expect, Page, Locator } from "@playwright/test";

test.describe("Suite de pruebas para Aserciones", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("Prueba de aserción - ToBeVisible", async ({ page }) => {
    await page.getByPlaceholder("Username").fill("locked_out_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    const errorMessageLocator = page.locator('h3[data-test="error"]');
    // Validaciones -> Expect
    // toBeVisible
    await expect(
      errorMessageLocator,
      "Expected error message to be visible",
    ).toBeVisible();
    // Diferencia entre toBeVisible y isVisible es que toBeVisible es una aserción que espera a que el elemento sea visible,
    // mientras que isVisible es un método que devuelve un booleano indicando si el elemento es visible o no.

  });
  test("Prueba de aserción - toHaveText", async ({ page }) => {
    await page.getByPlaceholder("Username").fill("locked_out_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    const errorMessageLocator = page.locator('h3[data-test="error"]');
    // toHaveText
    await expect(
      errorMessageLocator,
      "Expected error message to have specific text",
    ).toHaveText("Epic sadface: Sorry, this user has been locked out.");
    // toContainText
    await expect(
      errorMessageLocator,
      "Expected error message to contain specific text",
    ).toContainText("Sorry, this user has been locked out.");
  });

  test("Prueba de aserción - toBeEnabled and toBeChecked", async ({ page }) => {
    await page.goto('https://demoqa.com/radio-button');

    const yesRadioButton: Locator = page.getByRole('radio', { name: 'Yes' });
    await expect(yesRadioButton, "Expected Yes radio button to be enabled").toBeEnabled();
    // Negacion de la asercion
    await expect(yesRadioButton, "Expected Yes radio button to not be checked").not.toBeChecked();
    await yesRadioButton.check();
    await expect(yesRadioButton, "Expected Yes radio button to be checked").toBeChecked();
  });
  test('Prueba de asersión - Navegacion', async ({ page }) => {
    // Entramos a la pagina
    await page.goto('https://demoqa.com/links');
    const homeLink: Locator = page.getByRole('link', { name: 'Home', exact: true });
    // asercion para verificar que el link de Home es visible antes de hacer click
    await expect(homeLink, "Expected Home link to be visible").toBeVisible();
    await homeLink.click();
    // toHaveUrl -> Tiene 3 variantes
    // 1. url: string = 'https://demoqa.com/links';
    // 2. url: RegExp = /https:\/\/demoqa\.com\/links/;
    // 3. url: URLPattern = new URLPattern({ pathname: '/links' });
    await expect(page, "Expected to navigate to the home page").toHaveURL(new URLPattern({ pathname: '/links'}));
    // toHaveTitle -> Validar el titulo de la pagina
    await expect(page, "Expected to navigate to have Title").toHaveTitle('demosite');
  });
  test('Prueba de asersión - soft-assertions', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');

    const doubleClickButton: Locator = page.getByRole('button', { name: 'Double Click Me' });
    await doubleClickButton.click();
    // soft-assertions
    const message: Locator = page.locator('#doubleClickMessage');
    await expect.soft(message, "Expected message to be visible after double click").toBeVisible();
    // Las soft assertions permiten que la prueba continúe ejecutándose incluso si la aserción falla, 
    // lo que permite capturar múltiples errores en una sola ejecución de prueba.
    await doubleClickButton.dblclick();
    await expect(message, "Expected message to be visible after double click").toBeVisible();
  });
});
