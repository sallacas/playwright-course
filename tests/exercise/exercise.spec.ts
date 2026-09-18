import { test, expect, Page, Locator } from "@playwright/test";
import { User, usuarios } from ".././data/usuarios";

// Agrupar los tests en una suite de pruebas
test.describe("Suite de pruebas - Login Tests", () => {
  // Se va a ejecutar antes de todos los tests
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("Login with standard user", async ({ page }) => {
    // Data definida
    const { username, password } = usuarios[0];

    // Localizadores -> Separar la logica de los localizadores
    const usernameTextBox: Locator = await page.locator("input#user-name");
    const passwordTextBox: Locator = await page.locator(
      "//input[@id='password']",
    );
    const loginButton: Locator = await page.getByRole("button", {
      name: "Login",
    });

    // Acciones que se realizan en la pagina -> Separar la logica de las acciones
    // Llenar los campos de usuario y contraseña
    await usernameTextBox.fill(username);
    await passwordTextBox.fill(password);

    // Hacer click en el boton de login
    await loginButton.click();

    // Validaciones -> Separar la logica de las validaciones
    // Validando la url sobre la pagina (page)
    await expect(
      page,
      "La pagina se redirecciona a inventory correctamente",
    ).toHaveURL(/.*inventory/);
    // Validando sobre un elemento de la pagina (locator) que sea visible
    await expect(
      page.getByText("Products"),
      "El titulo de la pagina es 'Products'",
    ).toBeVisible();
  });

  test("Login with problem user", async ({ page }) => {
    const { username, password } = usuarios[2];

    await page.locator("input#user-name").fill(username);
    await page.locator("//input[@id='password']").fill(password);

    await page.getByRole("button", { name: "Login" }).click();

    await expect(
      page,
      "La pagina se redirecciona a inventory correctamente",
    ).toHaveURL(/.*inventory/);
    await expect(
      page.getByText("Products"),
      "El titulo de la pagina es 'Products'",
    ).toBeVisible();
  });

  // Se va a ejecutar despues de todos los tests
  test.afterEach(async ({ page }) => {
    const menuButton: Locator = await page.getByRole("button", {
      name: "Open Menu",
    });
    const logoutButton: Locator = await page.getByRole("button", {
      name: "Logout",
    });

    await menuButton.click();
    await logoutButton.click();

    await expect(page.getByRole("button", { name: "Login" }), "El boton de login es visible").toBeVisible();
  });
});
