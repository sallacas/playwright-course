import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    constructor(page: Page) {
        super(page);
        this.firstNameInput = this.page.getByPlaceholder("First Name");
        this.lastNameInput = this.page.getByPlaceholder("Last Name");
        this.postalCodeInput = this.page.getByPlaceholder("Zip/Postal Code");
        this.continueButton = this.page.getByRole("button", { name: "Continue" });
    }
    
    async rellenarFormularioCheckout(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }
    async continuarCheckout(): Promise<void> {
        await this.continueButton.click();
    }
    async validarMensajeError(): Promise<void> {
        await expect(this.page.locator('h3[data-test="error"]')).toBeVisible();
        await expect(this.page.locator('h3[data-test="error"]')).toContainText("Error: First Name is required");
    }
}