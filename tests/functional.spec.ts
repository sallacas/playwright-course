import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { InventoryPage } from "../src/pages/InventoryPage";
import { CartPage } from "../src/pages/CartPage";
import { CheckoutPage } from "../src/pages/CheckoutPage";
import { OverviewPage } from "../src/pages/OverviewPage";
import { CheckoutCompletePage } from "../src/pages/CheckoutComplete";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.abrirPagina();
  await loginPage.ingresar("standard_user");
  await loginPage.validarIngresoExitoso();
});

test("Compra exitosa de múltiples productos", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const overviewPage = new OverviewPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  await inventoryPage.agregarItemPorNombre("Sauce Labs Bike Light");
  await inventoryPage.agregarPrimerItemAlCarrito();
  await inventoryPage.agregarItemCarrito(2);
  await inventoryPage.agregarUltimoItemAlCarrito();

  await inventoryPage.validarItemsAgregadosAlCarrito(4);
  await inventoryPage.abrirCarrito();

  // CartPage
  await cartPage.validarItemsEnCarrito(4);
  await cartPage.irAlCheckout();

  // CheckoutPage
  await checkoutPage.rellenarFormularioCheckout("Juan", "Perez", "12345");
  await checkoutPage.continuarCheckout();

  // OverviewPage
  await overviewPage.validarItemsEnCarrito(4);
  await overviewPage.finalizarCompra();

  // Validar que la compra fue exitosa
  await checkoutCompletePage.validarCheckoutCompleto();
  await checkoutCompletePage.volverAlInicio();
  await checkoutCompletePage.validarIngresoExitoso();
});

test("Modificación del carrito antes de comprar", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await inventoryPage.agregarItemPorNombre("Sauce Labs Bike Light");
  await inventoryPage.agregarPrimerItemAlCarrito();
  await inventoryPage.validarItemsAgregadosAlCarrito(2);
  await inventoryPage.abrirCarrito();

  await cartPage.validarItemsEnCarrito(2);
  await cartPage.eliminarItemDelCarrito(1);
  await cartPage.volverAProductos();

  await inventoryPage.validarItemsAgregadosAlCarrito(1);
  await inventoryPage.abrirCarrito();
  await cartPage.validarItemsEnCarrito(1);
});

test("Validación de campos obligatorios durante checkout", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.agregarItemYIrAlCarrito();
  await cartPage.irAlCheckout();
  // Dando a continuar sin hacer el formulario
  await checkoutPage.continuarCheckout();
  // Validar que se muestra el mensaje de error
  await checkoutPage.validarMensajeError();
});
