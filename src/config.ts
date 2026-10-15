import { test as base } from "@playwright/test";
import { LoginPage } from "./pages/saucedemo/LoginPage";
import { InventoryPage } from "./pages/saucedemo/InventoryPage";
import { CartPage } from "./pages/saucedemo/CartPage";
import { CheckoutPage } from "./pages/saucedemo/CheckoutPage";
import { OverviewPage } from "./pages/saucedemo/OverviewPage";
import { CheckoutCompletePage } from "./pages/saucedemo/CheckoutComplete";
import { iframePage } from "./pages/demoqa/iframePage";

type Pages = {
    // Agregamos las paginas que vamos creando para poder usarlas en los tests
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    overviewPage: OverviewPage;
    checkoutCompletePage: CheckoutCompletePage;
    // Agregamos las paginas que vamos creando para poder usarlas en los tests
    iframePage: iframePage;
}

export const test = base.extend<Pages>({
    // Agregamos las paginas que vamos creando para poder usarlas en los tests
    loginPage: async ({ page }, use) => await use(new LoginPage(page)),
    inventoryPage: async ({ page }, use) => await use(new InventoryPage(page)),
    cartPage: async ({ page }, use) => await use(new CartPage(page)),
    checkoutPage: async ({ page }, use) => await use(new CheckoutPage(page)),
    overviewPage: async ({ page }, use) => await use(new OverviewPage(page)),
    checkoutCompletePage: async ({ page }, use) => await use(new CheckoutCompletePage(page)),
    // Agregamos las paginas que vamos creando para poder usarlas en los tests
    iframePage: async ({ page }, use) => await use(new iframePage(page)),
});

export { expect } from "@playwright/test";