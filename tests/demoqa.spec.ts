import { test } from "../src/config";

test.describe("DemoQA - Iframe", { tag: "@integration" }, () => {
  test("Validar iframe", { tag: "@smoke" }, async ({ iframePage }) => {
    // Acceder a la página de demoqa
    await iframePage.acceder();
    // Esperar a que la página cargue completamente
    await iframePage.page.waitForLoadState("networkidle");
    // Acceder al iframe
    const iframe = await iframePage.accederIframe();
    // Validar el contenido del iframe
    await iframePage.validarIframe(iframe);
  });
});
