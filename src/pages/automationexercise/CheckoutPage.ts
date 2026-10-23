import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CheckoutPage extends BasePage {
    readonly deliveryAddressSection: Locator;
    readonly billingAddressSection: Locator;
    constructor(page: Page) {
        super(page);
        this.deliveryAddressSection = this.page.locator("#address_delivery");
        this.billingAddressSection = this.page.locator("#address_invoice");
    }
    async validarDetalleDeliveryAddress(firstName: string): Promise<void>{
        const firstnamePage = await this.deliveryAddressSection.locator(".address_firstname").textContent() || "";
        console.log(`Delivery First Name: ${firstnamePage}`);
        const addresses = await this.deliveryAddressSection.locator(".address_address1").all();
        for (const address of addresses) {
            const addressText = await address.textContent() || "";
            console.log(`Delivery Address: ${addressText}`);
        }
        
        await expect(firstnamePage.trim(), "Expected delivery first name is correct").toBe(firstName);
    }
} 