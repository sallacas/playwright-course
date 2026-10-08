import { type Page, type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutCompletePage extends BasePage {
    readonly completeHeader: Locator;
    readonly backHomeButton: Locator;
    constructor(page: Page) {
        super(page);
        this.completeHeader = this.page.locator('h2[data-test="complete-header"]');
        this.backHomeButton = this.page.getByRole("button", { name: "Back Home" });
    }
    async validarCheckoutCompleto(): Promise<void> {
        await expect(this.completeHeader).toBeVisible();
        await expect(this.completeHeader).toHaveText("Thank you for your order!");
    }
    async volverAlInicio(): Promise<void> {
        await this.backHomeButton.click();
    }
}