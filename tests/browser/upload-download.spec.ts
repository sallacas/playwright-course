import { test, expect, Page, Locator } from "@playwright/test";

test.describe("Suite de pruebas para Upload y Download", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demoqa.com/upload-download");
  });

  test.skip("Validate file upload - setInputFiles", async ({ page }) => {
    const filePath = "tests/data/sampleFile.jpeg"; // Ruta del archivo a subir

    // Se usa cuando se tiene acceso directo al input de tipo file
    await page.setInputFiles("input[type='file']", filePath);
    await expect(
      page.locator("#uploadedFilePath"),
      "Expected uploaded file path to be visible",
    ).toBeVisible();
    await expect(
      page.locator("#uploadedFilePath"),
      "Expected uploaded file path to contain the file name",
    ).toContainText("sampleFile.jpeg");
  });

  test("Validate file upload - filechooser", async ({ page }) => {
    // Ruta del archivo a subir
    const filePath = "tests/data/sampleFile.jpeg"; // Ruta del archivo a subir
    const uploadInput: Locator = page.getByRole("button", {
      name: "Choose File",
    });

    // Se usa cuando no se tiene acceso directo al input de tipo file,
    // sino a un botón que abre el diálogo de selección de archivos.
    const fileChooserPromise = page.waitForEvent("filechooser");
    await uploadInput.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);

    await expect(
      page.locator("#uploadedFilePath"),
      "Expected uploaded file path to be visible",
    ).toBeVisible();
    await expect(
      page.locator("#uploadedFilePath"),
      "Expected uploaded file path to contain the file name",
    ).toContainText("sampleFile.jpeg");
  });

  test("Validate file download - Without Context", async ({ page }) => {
    const downloadButton: Locator = page.getByRole("button", {
      name: "Download",
    });
    // Creamos una promesa para esperar el evento de descarga
    const downloadPromise = page.waitForEvent("download");
    await downloadButton.click();
    // Esperamos a que se complete la descarga
    const download = await downloadPromise;

    // Validamos que el archivo se haya descargado correctamente
    expect(
      download.suggestedFilename(),
      "Expected filename is sampleFile.jpeg",
    ).toBe("sampleFile.jpeg");
    expect(
      await download.failure(),
      "Expected download failure to be null",
    ).toBeNull();
  });
  test("Validate file download - With Context", async ({ browser }) => {
    // Creamos un nuevo contexto de navegador con la opción de aceptar descargas
    const context = await browser.newContext({
      acceptDownloads: true, // Habilitamos la descarga de archivos
    });
    const page = await context.newPage();
    await page.goto("https://demoqa.com/upload-download");
    const downloadButton: Locator = page.getByRole("button", {
      name: "Download",
    });
    // Creamos una promesa para esperar el evento de descarga
    const downloadPromise = page.waitForEvent("download");
    await downloadButton.click();
    // Esperamos a que se complete la descarga
    const download = await downloadPromise;

    await download.saveAs(`downloads/${download.suggestedFilename()}`); // Guardamos el archivo descargado en la carpeta "downloads"
    // Validamos que el archivo se haya descargado correctamente
    expect(
      download.suggestedFilename(),
      "Expected filename is sampleFile.jpeg",
    ).toBe("sampleFile.jpeg");
    expect(
      await download.failure(),
      "Expected download failure to be null",
    ).toBeNull();
  });
});
