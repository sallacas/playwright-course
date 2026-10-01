import { test, expect, Page, Locator } from "@playwright/test";

test.describe("Suite de pruebas para Alertas", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demoqa.com/alerts");
  });

  test("Validate Alert text", async ({ page }) => {
    const alertButton: Locator = await page.locator("#alertButton");

    page.on("dialog", async (dialog) => {
      console.log(`Alert message: ${dialog.message()}`);
      await dialog.accept();
    });
    await alertButton.click();
  });
  test("Validate Alert text with delay of 5 seconds", async ({ page }) => {
    const alertButton: Locator = await page.locator("#timerAlertButton");
    
    // Espera a que aparezca la alerta después de 5 segundos
    page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("alert");
        console.log(`Alert message: ${dialog.message()}`);
        expect(dialog.message()).toContain("This alert appeared after 5 seconds");
        await dialog.accept();
    });
    // Declarando una promesa para esperar el evento de diálogo
    const dialogPromise = page.waitForEvent("dialog");
    await alertButton.click();
    await dialogPromise; // Espera a que se dispare el evento de diálogo
  });
  test("Validate Alert confirm action - Accept", async ({ page }) => {
    const alertButton: Locator = await page.locator("#confirmButton");
    page.on("dialog", async (dialog) => {
      console.log(`Alert message: ${dialog.message()}`);
      await dialog.accept(); // Accept the alert (OK)
    });
    await alertButton.click();
    await expect(page.locator("span#confirmResult"), "Expected text is: You selected Ok").toContainText("You selected Ok");
  });
  test("Validate Alert confirm action - dismiss", async ({ page }) => {
    const alertButton: Locator = await page.locator("#confirmButton");
    page.on("dialog", async (dialog) => {
      console.log(`Alert message: ${dialog.message()}`);
      await dialog.dismiss(); // Dismiss the alert (Cancel)
    });
    await alertButton.click();
    await expect(page.locator("span#confirmResult"), "Expected text is: You selected Cancel").toContainText("You selected Cancel");
  });
  test("Validate Alert type text", async ({ page }) => {
    const alertText: string = "Playwright Test";
    const alertButton: Locator = await page.locator("#promtButton");
    
    page.on("dialog", async (dialog) => {
      console.log(`Alert message: ${dialog.message()}`);
      await dialog.accept(alertText); // Accept the alert with input text
    });
    
    await alertButton.click();
    await expect(page.locator("span#promptResult"), `Expected text contains: ${alertText}`).toContainText(alertText);
  });
  test("Validate Alert type text - Cancel", async ({ page }) => {
    const alertText: string = "Playwright Test";
    const alertButton: Locator = await page.locator("#promtButton");
    
    page.on("dialog", async (dialog) => {
      console.log(`Alert message: ${dialog.message()}`);
      await dialog.dismiss(); // Dismiss the alert (Cancel)
    });
    
    await alertButton.click();
    await expect(page.locator("span#promptResult"), `Expected text is not visible: ${alertText}`).not.toBeVisible();
  });
});
