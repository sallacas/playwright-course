import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ProductsPage extends BasePage {
    readonly listProducts: Locator;
    constructor(page: Page) {
        super(page);
        this.listProducts = this.page.locator(".product-image-wrapper");
    }
    
    async entrarDetallePrimerProducto(): Promise<void> {
        const viewDetailsLink = await this.listProducts.getByText("View Product").first();
        await viewDetailsLink.click();
    }
    async sobrevolarPrimerProducto(): Promise<void> {
        const firstProduct = await this.listProducts.locator('img').first();
        await firstProduct.hover();
    }
    async agregarPrimerProductoAlCarrito(): Promise<void> {
        const addToCartButton = await this.listProducts.getByText('Add to cart').first();
        await addToCartButton.waitFor({ state: 'visible' });
        await addToCartButton.click();
    }
}