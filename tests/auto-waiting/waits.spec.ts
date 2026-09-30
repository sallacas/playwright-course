import { test, expect, Page, Locator } from "@playwright/test";

test.describe("Suite de pruebas para Esperas", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demoqa.com/dynamic-properties");
  });
  test("Wait for element to be enabled", async ({ page }) => {
    const enableAfterButton: Locator = page.getByRole("button", {
      name: "Will enable 5 seconds",
    });

    // Espera a que el boton este habilitado
    const isEnabled = await enableAfterButton.isEnabled();
    console.log(`isEnabled: ${isEnabled}`);

    // Espera de estado
    await expect(
      enableAfterButton,
      "Expected button to be enabled after 5 seconds",
    ).toBeEnabled({ timeout: 6000 });

    // Espera a que el boton este habilitado
    const isEnabledAfterWait = await enableAfterButton.isEnabled();
    console.log(`isEnabled after wait: ${isEnabledAfterWait}`);
  });

  test("Wait for element to be clickable / timeout in action", async ({
    page,
  }) => {
    const visibleAfterButton: Locator = page.getByRole("button", {
      name: "Visible After 5 Seconds",
    });

    // Espera de accion con timeout
    await visibleAfterButton.click({ timeout: 6000 });

    const isVisibleAfterClick = await visibleAfterButton.isVisible();
    console.log(`isVisible after click: ${isVisibleAfterClick}`);
  });
  test("Wait for element to be visible / timeout in expect", async ({
    page,
  }) => {
    const visibleAfterButton: Locator = page.getByRole("button", {
      name: "Visible After 5 Seconds",
    });
    // Espera de asercion con timeout
    await expect(
      visibleAfterButton,
      "Expected button to be visible after 5 seconds",
    ).toBeVisible({ timeout: 6000 });

    await visibleAfterButton.click();

    const isVisibleAfterWait = await visibleAfterButton.isVisible();
    console.log(`isVisible after wait: ${isVisibleAfterWait}`);
  });

  test("Wait for element to be visible / waitForSelector", async ({ page }) => {
    const visibleAfterButton: Locator = page.getByRole("button", {
      name: "Visible After 5 Seconds",
    });
    // Espera de selector
    // Espera de network idle antes de esperar a que el boton sea visible
    // La espera de network idle es util cuando se espera a que la pagina cargue completamente antes de interactuar con los elementos
    // await page.waitForLoadState("networkidle");

    await page.waitForSelector("button#visibleAfter", {
      state: "visible",
      timeout: 6000,
    });
    await visibleAfterButton.click();
    const isVisibleAfterWait = await visibleAfterButton.isVisible();
    console.log(`isVisible after wait: ${isVisibleAfterWait}`);
  });

  test("Wait for element to be visible / Locator.waitFor", async ({ page }) => {
    const visibleAfterButton: Locator = page.getByRole("button", {
      name: "Visible After 5 Seconds",
    });
    // Espera de locator

    await visibleAfterButton.waitFor({ state: "visible", timeout: 6000 });
    await visibleAfterButton.click();
    const isVisibleAfterWait = await visibleAfterButton.isVisible();
    console.log(`isVisible after wait: ${isVisibleAfterWait}`);
  });
  test("Wait for element to be visible / Global timeout", async ({ page }) => {
    const visibleAfterButton: Locator = page.getByRole("button", {
      name: "Visible After 5 Seconds",
    });
    // Espera de timeout global
    await visibleAfterButton.click();
    const isVisibleAfterWait = await visibleAfterButton.isVisible();
    console.log(`isVisible after wait: ${isVisibleAfterWait}`);
  });

  test("Validate color change after 5 seconds", async ({ page }) => {
    const colorChangeButton: Locator = page.getByRole("button", {
      name: "Color Change",
    });

    // Validar clase inicial del boton
    const initialClass = await colorChangeButton.getAttribute("class");
    console.log(`Initial class: ${initialClass}`);
    

    // Validar clase final del boton
    await expect(
      colorChangeButton,
      "Expected button class to change after 5 seconds",
    ).toHaveAttribute("class", /.*text-danger.*/, { timeout: 6000 });

  });
  test.skip("Test failed for not use await / Global timeout", async ({ page }) => {
    const visibleAfterButton: Locator = page.getByRole("button", {
      name: "Visible After 5 Seconds",
    });
    // Espera de timeout global
    visibleAfterButton.click();
    const isVisibleAfterWait = await visibleAfterButton.isVisible();
    console.log(`isVisible after wait: ${isVisibleAfterWait}`);
  });
});
