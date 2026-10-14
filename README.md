# Playwright Course POM

Proyecto de automatización de pruebas end-to-end (E2E) con Playwright, siguiendo el patrón Page Object Model (POM). El objetivo principal es practicar pruebas funcionales sobre la aplicación SauceDemo, validando login, flujo de compra y manejo del carrito.

## Tecnologías

- Playwright
- TypeScript
- Page Object Model (POM)
- dotenv para variables de entorno
- Reportes HTML y JUnit de Playwright

## Estructura del proyecto

```text
playwright-course-pom/
├── .github/               # Configuración de GitHub y workflows
├── reports/               # Reportes generados por Playwright
├── src/
│   ├── data/              # Datos de prueba (usuarios, información de compra)
│   └── pages/             # Clases POM para cada pantalla
├── tests/                 # Casos de prueba de Playwright
├── .env                   # Variables de entorno locales
├── package.json           # Dependencias y scripts
├── playwright.config.ts   # Configuración principal de Playwright
├── pnpm-lock.yaml         # Lockfile del gestor de paquetes
├── README.md              # Documentación del proyecto
└── test-results/          # Resultados de ejecución de pruebas
```

## Casos de prueba incluidos

El proyecto cubre escenarios como:

- Login exitoso con distintos usuarios
- Login con usuario bloqueado
- Validación de errores en pantalla
- Agregar productos al carrito
- Eliminar productos del carrito
- Checkout con formulario obligatorio
- Compra exitosa con múltiples productos

## Configuración

La configuración de Playwright apunta por defecto a SauceDemo:

- URL base: `https://www.saucedemo.com/`
- Se puede sobrescribir con la variable `BASE_URL`

También se habilita dotenv para leer variables desde el archivo `.env`.

## Ejecución

Instalar dependencias:

```bash
pnpm install
```

Ejecutar todas las pruebas:

```bash
npx playwright test
```

Abrir la interfaz gráfica de Playwright:

```bash
pnpm test:ui
```

Abrir el reporte HTML:

```bash
pnpm report:open
```

## Scripts disponibles

En `package.json` se incluyen los siguientes scripts:

```json
{
  "scripts": {
    "test:ui": "playwright test --ui",
    "report:open": "playwright show-report"
  }
}
```

## Flujo de trabajo

El proyecto usa una estructura orientada a Page Object Model, donde cada pantalla tiene su propia clase, por ejemplo:

- `LoginPage`
- `InventoryPage`
- `CartPage`
- `CheckoutPage`
- `OverviewPage`
- `CheckoutComplete`

Esto ayuda a mantener los tests más legibles, reutilizables y fáciles de mantener.

## Consideraciones

- La ejecución está configurada para múltiples navegadores: Chromium, Firefox y WebKit.
- Se guardan screenshots y videos cuando una prueba falla.
- Se genera un reporte HTML y un archivo JUnit en `reports/results.xml`.

## Estado del proyecto

Este repositorio refleja un curso/práctica de automatización con Playwright con énfasis en buenas prácticas de testing E2E y diseño POM.
