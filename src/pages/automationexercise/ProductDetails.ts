import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ProductDetailsPage extends BasePage {
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly priceLabel: Locator;
  readonly viewCartButton: Locator;
  readonly modal: Locator;
  constructor(page: Page) {
    super(page);
    this.quantityInput = this.page.locator("#quantity");
    this.addToCartButton = this.page.getByRole("button", {
      name: " Add to cart",
    });
    this.priceLabel = this.page.getByText("Rs.");
    this.viewCartButton = this.page.getByRole("link", { name: "View Cart" });
    this.modal = this.page.locator("#cartModal");
  }
  async incrementarCantidad(cantidad: number): Promise<void> {
    await this.quantityInput.fill(cantidad.toString());
  }
  async agregarAlCarrito(): Promise<void> {
    await this.addToCartButton.click();
  }
  async obtenerPrecio(quantity: number): Promise<string> {
    // Obtener el precio del producto y calcular el precio total basado en la cantidad
    const precioText: string = (await this.priceLabel.textContent()) ?? "";
    // Eliminar "Rs. " y convertir a número
    const precioWithRs: string = precioText.replace("Rs. ", "").trim();
    const precio: number = parseInt(precioWithRs);
    // Calcular el precio total basado en la cantidad ingresada
    return `Rs. ${precio * quantity}`;
  }
  async validarModalVisible(): Promise<void> {
    const addedToCartText = this.modal.getByText("Added!");
    await addedToCartText.waitFor({ state: "visible" });
  }
  async abrirCarrito(): Promise<void> {
    await this.viewCartButton.click();
  }
}
