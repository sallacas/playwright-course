import { test, expect, Page, Locator } from "@playwright/test";

test.describe("Suite de pruebas para Interacciones", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form");
  });

  test("Textbox test", async ({ page }) => {
    await page.getByRole("link", { name: "Text Box" }).click();

    async function getLocatorMatcher(id: string): Promise<Locator> {
      // Template Strings -> Interpolacion de variables en strings -> `p# ${id}`
      return await page.locator(`p#${id}`);
    }

    const data: {
      fullName: string;
      email: string;
      currentAddress: string;
      permanentAddress: string;
    } = {
      fullName: "John Doe",
      email: "pedro@example.com",
      currentAddress: "123 Main St, Cityville",
      permanentAddress: "456 Elm St, Townsville",
    };

    const fullNameTextBox: Locator = await page.getByPlaceholder("Full Name");
    const emailTextBox: Locator =
      await page.getByPlaceholder("name@example.com");
    const currentAddressTextBox: Locator =
      await page.getByPlaceholder("Current Address");
    const permanentAddressTextBox: Locator =
      await page.locator("#permanentAddress");

    // Interacciones -> Fill. clear
    await fullNameTextBox.fill("Juanito Perez");
    await emailTextBox.fill(data.email);
    await currentAddressTextBox.fill(data.currentAddress);
    await permanentAddressTextBox.fill(data.permanentAddress);

    await fullNameTextBox.clear();
    await fullNameTextBox.fill(data.fullName);

    await page.getByRole("button", { name: "Submit" }).click();

    // Validaciones -> Expect
    await expect(await getLocatorMatcher("name")).toContainText(data.fullName);
    await expect(await getLocatorMatcher("email")).toContainText(data.email);
    await expect(await getLocatorMatcher("currentAddress")).toContainText(
      data.currentAddress,
    );
    await expect(await getLocatorMatcher("permanentAddress")).toContainText(
      data.permanentAddress,
    );
  });

  test("Checkbox test", async ({ page }) => {
    await page.getByRole("link", { name: "Check Box" }).click();

    // Metodo para expandir un elemento del arbol de elementos
    async function expandTreeItem(treeItemName: string): Promise<void> {
      const treeItem: Locator = await page.getByRole("treeitem", {
        name: treeItemName,
      });
      await treeItem.locator(".rc-tree-switcher").click();
    }
    // Metodo para checkear un checkbox por su nombre
    async function checkLocatorByName(locatorName: string): Promise<void> {
      const locator: Locator = await page.getByRole("checkbox", {
        name: locatorName,
      });
      await locator.check();
    }

    async function uncheckLocatorByName(locatorName: string): Promise<void> {
      const locator: Locator = await page.getByRole("checkbox", {
        name: locatorName,
      });
      await locator.uncheck();
    }
    // Metodo para validar que un checkbox este checkeado por su nombre
    async function validateLocatorIsChecked(
      locatorName: string,
    ): Promise<void> {
      const locator: Locator = await page.getByRole("checkbox", {
        name: locatorName,
      });
      await expect(
        locator,
        `Expected checkbox "${locatorName}" to be checked`,
      ).toBeChecked();
    }
    // Metodo para validar que un checkbox no este checkeado por su nombre
    async function validateLocatorIsUnchecked(
      locatorName: string,
    ): Promise<void> {
      const locator: Locator = await page.getByRole("checkbox", {
        name: locatorName,
      });
      await expect(
        locator,
        `Expected checkbox "${locatorName}" to be unchecked`,
      ).not.toBeChecked();
    }

    // Expandir el arbol de elementos
    await expandTreeItem("Select Home Home");

    // Expandir el arbol de elementos de Documents
    await expandTreeItem("Select Documents Documents");

    // Expandir el arbol de elementos de Office
    await expandTreeItem("Select Office Office");
    await checkLocatorByName("Select Classified");
    await validateLocatorIsChecked("Select Classified");
    await uncheckLocatorByName("Select Classified");
    await validateLocatorIsUnchecked("Select Classified");
  });
  test("Form Test", async ({ page }) => {
    // Fill textboxes
    await page.getByRole("textbox", { name: "First Name" }).fill("John");
    await page.getByRole("textbox", { name: "Last Name" }).fill("Doe");
    await page
      .getByRole("textbox", { name: "Mobile Number" })
      .fill("1234567890");
    // Radio buttons
    await page.getByRole("radio", { name: "Other" }).check();
    // Checkboxes
    await page.getByRole("checkbox", { name: "Sports" }).check();
    await page.getByRole("checkbox", { name: "Reading" }).check();

    // Select dropdown
    await page.locator('div').filter({ hasText: /^Select State$/ }).nth(3).click();
    await page.getByRole('option', { name: 'NCR' }).click();
  });
});
