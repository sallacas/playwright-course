import { addresses, users } from "../src/data/automationexercise/data";
import { test } from "../src/demo.config";

test.describe("Proyecto Final - Automation Exercise", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.accederAutoPage();
    await productsPage.validarAccesoAutoPageCorrecto();
  });
  test(
    "Test Case 13: Verify Product quantity in Cart",
    { tag: "@TC-13" },
    async ({ productsPage, productDetailsPage, cartPage }) => {
      const quantity: number = 2;
      await productsPage.entrarDetallePrimerProducto();

      await productDetailsPage.incrementarCantidad(quantity);
      const precioText: string =
        await productDetailsPage.obtenerPrecio(quantity);
      await productDetailsPage.agregarAlCarrito();

      await productDetailsPage.validarModalVisible();
      await productDetailsPage.abrirCarrito();

      await cartPage.validarPaginaCarritoVisible();
      await cartPage.validarCarrito(quantity, precioText);
    },
  );

  test(
    "Test Case 2: Login User with correct email and password",
    { tag: "@TC-2" },
    async ({ accountPage }) => {
      const { email, password, name } = users.validUser;
      await accountPage.abrirSignupLogin();
      await accountPage.validarLoginHeadingVisible();
      await accountPage.realizarLogin(email, password);
      await accountPage.validarLoginExitoso(name);
      await accountPage.validarDeleteAccountVisible();
    },
  );
  test(
    "Test Case 3: Login User with incorrect email and password",
    { tag: "@TC-3" },
    async ({ accountPage }) => {
      const { email, password } = users.invalidUser;
      await accountPage.abrirSignupLogin();
      await accountPage.validarLoginHeadingVisible();
      await accountPage.realizarLogin(email, password);
      await accountPage.validarMensajeErrorLoginVisible();
    },
  );
  test("Test Case 23: Verify address details in checkout page", async ({
    accountPage,
    productsPage,
    checkoutPage,
    cartPage,
  }) => {
    const { email, password, name } = users.validUser;
    const { firstName } = addresses.validAddress;
    console.log("Datos de prueba:", { firstName });
    await accountPage.abrirSignupLogin();
    await accountPage.validarLoginHeadingVisible();
    await accountPage.realizarLogin(email, password);
    // signupPage.llenarFormularioDireccion(firstName, ...)
    
    await accountPage.validarLoginExitoso(name);
    await accountPage.validarDeleteAccountVisible();

    // Agregar un producto al carrito
    await productsPage.sobrevolarPrimerProducto();
    await productsPage.agregarPrimerProductoAlCarrito();
    await productsPage.irAlCarrito();

    // Ir al checkout
    await cartPage.validarPaginaCarritoVisible();
    await cartPage.irAlCheckout();
    // Validar el detalle del delivery address en la página de checkout
    
    await checkoutPage.validarDetalleDeliveryAddress(firstName);
  });
});
