import { test, expect, Page, Locator } from "@playwright/test";
import { User, usuarios } from "./data/usuarios";

// Agrupar los tests en una suite de pruebas
test.describe("Suite de pruebas - Products", () => {
  // Se va a ejecutar antes de todos los tests
  test.beforeEach(async ({ page }) => {
    await page.goto("");

    // Data definida
    const { username, password } = usuarios[0];

    // Localizadores ->
    // Localizadores Semanticos = Placeholder
    const usernameTextBox: Locator = await page.getByPlaceholder("Username");
    const passwordTextBox: Locator = await page.getByPlaceholder("Password");

    // Localizadores Semanticos = Role
    const loginButton: Locator = await page.getByRole("button", {
      name: "Login",
    });

    // Acciones que se realizan en la pagina -> Separar la logica de las acciones
    // Llenar los campos de usuario y contraseña
    await usernameTextBox.fill(username);
    await passwordTextBox.fill(password);

    // Hacer click en el boton de login
    await loginButton.click();
  });

  test("Add the first item to the cart", async ({ page }) => {
    const products: Locator = await page.locator(".inventory_item");

    // Agregar el primer producto al carrito - usando el metodo first() para obtener el primer elemento del locator
    const firstProduct: Locator = await products.first();
    await firstProduct.getByText("Add to cart").click();
  });
  test("Add the last item to the cart", async ({ page }) => {
    const products: Locator = await page.locator(".inventory_item");
    const lastProduct: Locator = await products.last();
    await lastProduct.getByText("Add to cart").click();
  });
  test("Add the fourth item to the cart", async ({ page }) => {
    const products: Locator = await page.locator(".inventory_item");
    const secondProduct: Locator = await products.nth(3);
    await secondProduct.getByText("Add to cart").click();
  });
  test("Add the item named Sauce Labs Bike Light to the cart", async ({
    page,
  }) => {
    const products: Locator = await page.locator(".inventory_item");
    const product: Locator = await products.filter({
      hasText: "Sauce Labs Bike Light",
    });
    await product.getByText("Add to cart").click();
  });

  test("Failed for strict mode locator", async ({ page }) => {
    const products: Locator = await page.locator(".inventory_item");
    // const product: Locator = await products.filter({ hasText: "Sauce Labs Bike Light" });
    await products.getByText("Add to cart").click();
  });
  test("Add all items to the cart", async ({ page }) => {
    const products: Locator = await page.locator(".inventory_item");
    const addToCartButtons: Locator = await products.getByText("Add to cart");

    for (const button of await addToCartButtons.all()) {
      await button.scrollIntoViewIfNeeded();
      await button.click();
    }
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

    await expect(
      page.getByRole("button", { name: "Login" }),
      "El boton de login es visible",
    ).toBeVisible();
  });
});
