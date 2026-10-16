import { test, expect } from "../src/config";
import { compra_exitosa, compra_exitosa_multiple } from "../src/data/usuarios";

test.describe("Compra y Carrito", { tag: "@integration" }, () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.abrirPagina();
    await loginPage.ingresar("standard_user");
    await loginPage.validarIngresoExitoso("Products");
    await loginPage.validarSnapshot();
  });
  test(
    "Compra exitosa de un producto",
    { tag: "@smoke" },
    async ({
      inventoryPage,
      cartPage,
      checkoutPage,
      overviewPage,
      checkoutCompletePage,
    }) => {
      const { item, firstName, lastName, zipCode } = compra_exitosa;
      test.step(`Agregar el item al carrito y abrir el carrito`, async () => {
        await inventoryPage.agregarItemPorNombre(item);
        await inventoryPage.validarItemsAgregadosAlCarrito(1);
        await inventoryPage.abrirCarrito();
      });

      // CartPage
      await cartPage.validarUrl("https://www.saucedemo.com/cart.html");
      test.step("Validar items en carrito y proceder al checkout", async () => {
        await cartPage.validarItemsEnCarrito(1);
        await cartPage.irAlCheckout();
      });

      // CheckoutPage
      await checkoutPage.validarUrl(
        "https://www.saucedemo.com/checkout-step-one.html",
      );
      test.step("Rellenar formulario de checkout y continuar", async () => {
        console.log("Datos de prueba:", { firstName, lastName, zipCode });
        await checkoutPage.rellenarFormularioCheckout(
          firstName,
          lastName,
          zipCode,
        );
        await checkoutPage.continuarCheckout();
      });

      // OverviewPage
      await overviewPage.validarUrl(
        "https://www.saucedemo.com/checkout-step-two.html",
      );
      test.step("Validar items en overview y finalizar compra", async () => {
        await overviewPage.validarItemsEnCarrito(1);
        await overviewPage.finalizarCompra();
      });

      // Validar que la compra fue exitosa
      await checkoutCompletePage.validarUrl(
        "https://www.saucedemo.com/checkout-complete.html",
      );
      test.step("Validar checkout completo y volver al inicio", async () => {
        await checkoutCompletePage.validarCheckoutCompleto();
        await checkoutCompletePage.volverAlInicio();
        await checkoutCompletePage.validarIngresoExitoso("Products");
      });
    },
  );
  test("Eliminar un producto del carrito", async ({
    inventoryPage,
    cartPage,
  }) => {
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
  test("Validación de campos obligatorios durante checkout", async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.agregarItemYIrAlCarrito();
    await cartPage.irAlCheckout();
    // Dando a continuar sin hacer el formulario
    await checkoutPage.continuarCheckout();
    // Validar que se muestra el mensaje de error
    await checkoutPage.validarMensajeError();
  });
  test(
    "Compra exitosa de múltiples productos",
    { tag: "@smoke" },
    async ({
      inventoryPage,
      cartPage,
      checkoutPage,
      overviewPage,
      checkoutCompletePage,
    }) => {
      const { items, firstName, lastName, zipCode } = compra_exitosa_multiple;
      test.step(`Agregar ${items.length} items al carrito y abrir el carrito`, async () => {
        for (const item of items) {
          await inventoryPage.agregarItemPorNombre(item);
        }
        await inventoryPage.validarItemsAgregadosAlCarrito(items.length);
        await inventoryPage.abrirCarrito();
      });
      // CartPage
      await cartPage.validarUrl("https://www.saucedemo.com/cart.html");
      test.step("Validar items en carrito y proceder al checkout", async () => {
        await cartPage.validarItemsEnCarrito(items.length);
        await cartPage.irAlCheckout();
      });

      // CheckoutPage
      await checkoutPage.validarUrl(
        "https://www.saucedemo.com/checkout-step-one.html",
      );
      test.step("Rellenar formulario de checkout y continuar", async () => {
        console.log("Datos de prueba:", { firstName, lastName, zipCode });
        await checkoutPage.rellenarFormularioCheckout(
          firstName,
          lastName,
          zipCode,
        );
        await checkoutPage.continuarCheckout();
      });

      // OverviewPage
      await overviewPage.validarUrl(
        "https://www.saucedemo.com/checkout-step-two.html",
      );
      test.step("Validar items en overview y finalizar compra", async () => {
        await overviewPage.validarItemsEnCarrito(items.length);
        await overviewPage.finalizarCompra();
      });

      // Validar que la compra fue exitosa
      await checkoutCompletePage.validarUrl(
        "https://www.saucedemo.com/checkout-complete.html",
      );
      test.step("Validar checkout completo y volver al inicio", async () => {
        await checkoutCompletePage.validarCheckoutCompleto();
        await checkoutCompletePage.volverAlInicio();
        await checkoutCompletePage.validarIngresoExitoso("Products");
      });
    },
  );
});

test.describe("Failure Tests", { tag: "@failure" }, () => {
  test("Login to sauce demo with locked user", async ({ loginPage }) => {
    // Abrir la página
    await loginPage.abrirPagina();
    // Realizar el login
    await loginPage.ingresar("locked_out_user");
    // Validar los mensajes de error
    await expect(
      loginPage.page.locator('h3[data-test="error"]'),
      "Error message is visible",
    ).toBeVisible();
    await expect(
      loginPage.page.locator('h3[data-test="error"]'),
      "The message has correct text",
    ).toContainText("Epic sadface: Sorry, this user has been locked out.");
  });
  test("Falso positivo por usuario problem_user", async ({
    loginPage,
    inventoryPage,
    }) => {
    await loginPage.abrirPagina();
    await loginPage.ingresar("problem_user");
    await loginPage.validarIngresoExitoso("Products");
    await loginPage.validarSnapshot();

    await inventoryPage.agregarItemPorNombre("Sauce Labs Bike Light");
    await inventoryPage.agregarPrimerItemAlCarrito();
    await inventoryPage.validarItemsAgregadosAlCarrito(2);
    await inventoryPage.abrirCarrito();
  });
  test(
    "Simulate retry for flaky test",
    { tag: "@flaky" },
    async ({ loginPage }, testInfo) => {
      // Abrir la página
      await loginPage.abrirPagina();

      await loginPage.ingresar("standard_user");
      // Simulamos el error en el primer intento para que falle y se reintente
      const retry = testInfo.retry;
      let message: string = "Products";
      if (retry === 0) {
        console.log("Simulando error en el primer intento");
        message = "Error Message";
      }
      await loginPage.validarIngresoExitoso(message);
    },
  );
});
