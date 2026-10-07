import { expect, type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly listItems: Locator;
  readonly cartBadge: Locator;
  constructor(page: Page) {
    this.page = page;
    this.listItems = this.page.locator(".inventory_item");
    this.cartBadge = this.page.locator('span[data-test="shopping-cart-badge"]');
  }
  async agregarPrimerItemAlCarrito(): Promise<void> {
    const primerItem = this.listItems.first();
    await primerItem.getByText("Add to cart").click();
  }
  async agregarItemCarrito(posicion: number): Promise<void> {
    const item = this.listItems.nth(posicion);
    await item.getByText("Add to cart").click();
  }
  async validarItemsAgregadosAlCarrito(cantidad: number): Promise<void> {
    await expect(this.cartBadge).toBeVisible();
    await expect(this.cartBadge).toHaveText(cantidad.toString());
  }
}
