import { test } from "../src/finalconfig";

test.describe("Proyecto Final - Automation Exercise", () => {
  test(
    "Test Case 13: Verify Product quantity in Cart",
    { tag: "@TC-13" },
    async ({ productsPage, productDetailsPage, cartPage }) => {
      const quantity: number = 2;
      await productsPage.acceder();
      await productsPage.entrarDetallePrimerProducto();

      await productDetailsPage.incrementarCantidad(quantity);
      const precioText: string = await productDetailsPage.obtenerPrecio(quantity);
      await productDetailsPage.agregarAlCarrito();

      await productDetailsPage.validarModalVisible();
      await productDetailsPage.abrirCarrito();

      await cartPage.validarPaginaCarritoVisible();
      await cartPage.validarCarrito(quantity, precioText);
    },
  );
});
