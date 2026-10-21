import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ProductsPage extends BasePage {
    readonly listProducts: Locator;
    constructor(page: Page) {
        super(page);
        this.listProducts = this.page.locator(".product-image-wrapper");
    }

    async acceder(): Promise<void> {
        await this.abrirPagina("https://automationexercise.com");
    }
    
    async entrarDetallePrimerProducto(): Promise<void> {
        const viewDetailsLink = await this.listProducts.getByText("View Product").first();
        await viewDetailsLink.click();
    }
}