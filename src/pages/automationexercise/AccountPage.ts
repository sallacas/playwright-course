import { type Page, type Locator, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class AccountPage extends BasePage {
    readonly accountPageLink: Locator;
    readonly loginHeading: Locator;
    // locators del login
    readonly emailLoginInput: Locator;
    readonly passwordLoginInput: Locator;
    readonly loginButton: Locator   

    constructor(page: Page) {
        super(page);
        this.accountPageLink = this.page.getByRole("link", { name: " Signup / Login" });
        this.loginHeading = this.page.getByRole('heading', { name: 'Login to your account' });
        this.emailLoginInput = this.page.locator('input[data-qa="login-email"]');
        this.passwordLoginInput = this.page.locator('input[data-qa="login-password"]');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
    }
    async abrirSignupLogin(): Promise<void> {
        await this.accountPageLink.click();
    }
    async validarLoginHeadingVisible(): Promise<void> {
        await expect(this.loginHeading, "Expected Login heading is Visible").toBeVisible();
    }
    async realizarLogin(email: string, password: string): Promise<void> {
        await this.emailLoginInput.fill(email);
        await this.passwordLoginInput.fill(password);
        await this.loginButton.click();
    }
    
    async validarLoginExitoso(name: string): Promise<void> {
        const successMessage = this.page.getByText(`Logged in as ${name}`);
        await expect(successMessage, "Expected success message is Visible").toBeVisible();
    }

    async validarMensajeErrorLoginVisible(): Promise<void> {
        const errorMessage = this.page.locator('.login-form').locator('p');
        await expect(errorMessage, "Expected error message is Visible").toBeVisible();
        await expect(errorMessage, "Expected error message text is correct").toHaveText("Your email or password is incorrect!");
    }
}