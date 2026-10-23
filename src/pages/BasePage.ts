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
  async accederAutoPage(): Promise<void> {
    await this.abrirPagina("https://automationexercise.com");
  }
  async validarAccesoAutoPageCorrecto(): Promise<void> {
    await expect(this.page).toHaveURL("https://automationexercise.com/");
    await expect(this.page.getByRole('img', { name: 'Website for automation practice' })).toBeVisible();
  }
  async validarDeleteAccountVisible(): Promise<void> {
    const deleteAccountLink = this.page.getByRole("link", { name: " Delete Account" });
    await expect(deleteAccountLink, "Expected Delete Account link is Visible").toBeVisible();
  }
  async irAlCarrito(): Promise<void> {
    const viewCartButton = this.page.getByRole("link", { name: "View Cart" });
    await viewCartButton.click();
  }
}
