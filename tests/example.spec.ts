import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { InventoryPage } from "../src/pages/InventoryPage";

test("Login to sauce demo", async ({ page }) => {
  // Crear nuestro PageObject
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  // Abrir la página
  await loginPage.abrirPagina();
  // Realizar el login
  await loginPage.ingresar("standard_user");
  // Validar que el login fue exitoso
  await loginPage.validarIngresoExitoso();
  // Agregar el primer item al carrito
  await inventoryPage.agregarPrimerItemAlCarrito();
  // Agregar el cuarto item al carrito
  await inventoryPage.agregarItemCarrito(3);

  // Validar que los items fueron agregados al carrito
  await inventoryPage.validarItemsAgregadosAlCarrito(2);
});
test("Login to sauce demo with visual_user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  // Abrir la página
  await loginPage.abrirPagina();
  // Realizar el login
  await loginPage.ingresar("visual_user");
  // Validar que el login fue exitoso
  await loginPage.validarIngresoExitoso();

  // Agregar el segundo item al carrito
  await inventoryPage.agregarItemCarrito(1);
  // Agregar el tercer item al carrito
  await inventoryPage.agregarItemCarrito(2);
  // Agregar el cuarto item al carrito
  await inventoryPage.agregarItemCarrito(3);
  
  // Validar que los items fueron agregados al carrito
  await inventoryPage.validarItemsAgregadosAlCarrito(3);

});
test("Login to sauce demo with locked user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  // Abrir la página
  await loginPage.abrirPagina();
  // Realizar el login
  await loginPage.ingresar("locked_out_user");
  // Validar los mensajes de error
  await expect(
    page.locator('h3[data-test="error"]'),
    "Error message is visible",
  ).toBeVisible();
  await expect(
    page.locator('h3[data-test="error"]'),
    "The message has correct text",
  ).toContainText("Epic sadface: Sorry, this user has been locked out.");
});

test("Login to sauce demo with problem user", async ({ page }) => {
  // Crear nuestro PageObject
  const loginPage = new LoginPage(page);
  // Abrir la página
  await loginPage.abrirPagina();
  // Realizar el login
  await loginPage.ingresar("problem_user");
  // Validar que el login fue exitoso
  await loginPage.validarIngresoExitoso();
});

test("Login to sauce demo with error user", async ({ page }) => {
  // Crear nuestro PageObject
  const loginPage = new LoginPage(page);
  // Abrir la página
  await loginPage.abrirPagina();
  // Realizar el login
  await loginPage.ingresar("error_user");
  // Validar que el login fue exitoso
  await loginPage.validarIngresoExitoso();
});
