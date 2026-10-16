import { type Locator, type Page, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly listItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.listItems = this.page.locator("div[data-test='inventory-item']");
  }
  async validarItemsEnCarrito(cantidad: number): Promise<void> {
    await expect(this.listItems).toHaveCount(cantidad);
  }
  async validarIngresoExitoso(title: string): Promise<void> {
    await this.page.waitForURL("https://www.saucedemo.com/inventory.html");
    await expect(this.page.locator('span[data-test="title"]')).toBeVisible();
    await expect(this.page.locator('span[data-test="title"]')).toHaveText(
      title,
    );
  }
  async validarUrl(urlEsperada: string): Promise<void> {
    await this.page.waitForURL(urlEsperada);
    await expect(this.page).toHaveURL(urlEsperada);
  }
  async abrirPagina(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
