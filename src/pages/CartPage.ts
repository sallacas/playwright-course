import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly backToProductsButton: Locator;
  constructor(page: Page) {
    super(page);
    this.checkoutButton = this.page.getByRole("button", { name: "Checkout" });
    this.backToProductsButton = this.page.getByRole("button", {
      name: "Continue Shopping",
    });
  }
  async eliminarItemDelCarrito(position: number): Promise<void> {
    const primerItem = this.listItems.nth(position);
    await primerItem.getByText("Remove").click();
  }
  async irAlCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
  async volverAProductos(): Promise<void> {
    await this.backToProductsButton.click();
  }
}
