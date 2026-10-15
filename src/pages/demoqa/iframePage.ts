import { expect, type FrameLocator, type Locator } from "@playwright/test";
import { BasePage } from "../BasePage";

export class iframePage extends BasePage {
  async acceder(): Promise<void> {
    await this.abrirPagina("https://demoqa.com/frames");
  }

  async accederIframe(): Promise<FrameLocator> {
    return this.page.frameLocator("#frame1");
  }

  async validarIframe(iframe: FrameLocator): Promise<void> {
    const headingMessage: Locator = await iframe.getByRole("heading", {
      name: "This is a sample page",
    });
    await expect(
      headingMessage,
      "Expected heading message to be visible",
    ).toBeVisible();
    await expect(
      headingMessage,
      "Expected heading message to have specific text",
    ).toHaveText("This is a sample page");
  }
}
