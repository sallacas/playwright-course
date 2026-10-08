import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    // Definimos los elementos de la página en variables
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    // Definimos el constructor de la clase
    constructor(page: Page) {
        super(page);
        // Inicializamos los elementos de la página
        this.usernameInput = this.page.getByPlaceholder("Username");
        this.passwordInput = this.page.getByPlaceholder("Password");
        this.loginButton = this.page.getByRole("button", { name: "Login" });
    }

    async abrirPagina(): Promise<void> {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async ingresar(username: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill('secret_sauce');
        await this.loginButton.click();
    }
}