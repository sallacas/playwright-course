import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CartPage extends BasePage {
    readonly navigationBarTitle: Locator;
    readonly detailItems: Locator;
    constructor(page: Page) {
        super(page);
        this.navigationBarTitle = this.page.getByText("Shopping Cart");
        this.detailItems = this.page.locator("#cart_info_table").locator("tbody tr");
    }
    async validarPaginaCarritoVisible(): Promise<void> {
        await expect(this.navigationBarTitle, "Expected Shopping Cart title is Visible").toBeVisible();
    }
    async validarCarrito(quantity: number, price: string): Promise<void> {
        
        const actualQuantity: string = await this.detailItems.locator("td.cart_quantity").textContent() || "";        console.log(`Actual quantity in cart: ${actualQuantity}`);
        const actualPrice: string = await this.detailItems.locator("td.cart_total").textContent() || "";

        await expect(actualQuantity.trim(), `Expected quantity in cart is ${quantity}`).toBe(`${quantity}`);
        await expect(actualPrice.trim(), `Expected price in cart is ${price}`).toBe(`${price}`);
    }
}