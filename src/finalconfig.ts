import { test as base } from "@playwright/test";
import { ProductsPage } from "./pages/automationexercise/ProductsPage";
import { ProductDetailsPage } from "./pages/automationexercise/ProductDetails";
import { CartPage } from "./pages/automationexercise/CartPage";
export { expect } from "@playwright/test";

type Pages = {
    // Agregamos las paginas que vamos creando para poder usarlas en los tests
    productsPage: ProductsPage;
    productDetailsPage: ProductDetailsPage;
    cartPage: CartPage;
}

// Creamos una nueva instancia de test que extiende la 
// funcionalidad de Playwright Test y agrega nuestras páginas personalizadas

const test = base.extend<Pages>({
    // Agregamos las paginas que vamos creando para poder usarlas en los tests
    productsPage: async ({ page }, use) => await use(new ProductsPage(page)),
    productDetailsPage: async ({ page }, use) => await use(new ProductDetailsPage(page)),
    cartPage: async ({ page }, use) => await use(new CartPage(page)),
});

export { test };