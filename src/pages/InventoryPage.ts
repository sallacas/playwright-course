import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
  readonly listItems: Locator;
  readonly cartBadge: Locator;
  readonly cardLink: Locator;
  constructor(page: Page) {
    super(page);
    this.listItems = this.page.locator(".inventory_item");
    this.cartBadge = this.page.locator('span[data-test="shopping-cart-badge"]');
    this.cardLink = this.page.locator('[data-test="shopping-cart-link"]');
  }
  async agregarPrimerItemAlCarrito(): Promise<void> {
    const primerItem = this.listItems.first();
    await primerItem.getByText("Add to cart").click();
  }
  async agregarItemCarrito(posicion: number): Promise<void> {
    const item = this.listItems.nth(posicion);
    await item.getByText("Add to cart").click();
  }
  async agregarItemPorNombre(nombre: string): Promise<void> {
    const item = this.listItems.filter({ hasText: nombre });
    await item.getByText("Add to cart").click();
  }
  async agregarUltimoItemAlCarrito(): Promise<void> {
    const ultimoItem = this.listItems.last();
    await ultimoItem.getByText("Add to cart").click();
  }

  async agregarItemYIrAlCarrito(): Promise<void> {
    await this.agregarPrimerItemAlCarrito();
    await this.abrirCarrito();
  }

  async abrirCarrito(): Promise<void> {
    await this.cardLink.click();
  }
  async validarItemsAgregadosAlCarrito(cantidad: number): Promise<void> {
    await expect(this.cartBadge).toBeVisible();
    await expect(this.cartBadge).toHaveText(cantidad.toString());
  }
  
}
