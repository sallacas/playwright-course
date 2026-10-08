import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OverviewPage extends BasePage {
    readonly finishButton: Locator;
    constructor(page: Page) {
        super(page);
        this.finishButton = this.page.getByRole("button", { name: "Finish" });
    }
    async finalizarCompra(): Promise<void> {
        await this.finishButton.click();
    }
}