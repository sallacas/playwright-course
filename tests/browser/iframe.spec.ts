import { test, expect, Page, Locator } from "@playwright/test";

test.describe("Suite de pruebas para iFrames", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demoqa.com/frames");
  });

  test("Validate message of the biggest iframe", async ({ page }) => {
    // Espera a que la página cargue completamente
    await page.waitForLoadState("networkidle");
    // Accedemos al iframe usando frameLocator
    const iframe: any = await page.frameLocator("#frame1");

    // Validamos el mensaje dentro del iframe
    const headingMessage: Locator = await iframe.getByRole("heading", {
      name: "This is a sample page",
    });
    await expect(
      headingMessage,
      "Expected heading message to be visible",
    ).toBeVisible();
    await expect(
      headingMessage,
      "Expected heading message to have specific text",
    ).toHaveText("This is a sample page");
  });

  test("Validate message of the smallest iframe", async ({ page }) => {
    // Accedemos al iframe usando frameLocator
    await page.waitForLoadState("networkidle");
    const iframe: any = await page.frameLocator("#frame2");

    // Validamos el mensaje dentro del iframe
    const headingMessage: Locator = await iframe.getByRole("heading", {
      name: "This is a sample page",
    });
    await expect(
      headingMessage,
      "Expected heading message to be visible",
    ).toBeVisible();
    await expect(
      headingMessage,
      "Expected heading message to have specific text",
    ).toHaveText("This is a sample page");
  });
});
