import { test, expect } from "@playwright/test";

test("Fill form for text-box page", async ({ page }) => {
  await page.goto("https://demoqa.com/text-box");
});

test("Select radio button page", async ({ page }) => {
  // Ejercicio de Juan
  await page.goto("https://demoqa.com/radio-button");
  // Hacer el check en una opción y validar el mensaje
});

test("Click on buttons page", async ({ page }) => {
  // Ejercicio de Edinsson
  await page.goto("https://demoqa.com/buttons");
  // Hacer click en los botones y validar el mensaje dbClick, rightClick, click
});

test("Login with problem user in saucedemo", async ({ page }) => {
  // Ejericio de Katherin
  await page.goto("https://www.saucedemo.com/");

  // Hacer login con el usuario problem_user y validar que se muestre el mensaje de error
  
  // Validar los mensajes de error que se muestran en la página
});

test("Login in saucedemo page", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");

  await page.getByRole("button", { name: "Login" }).click();
});

test("Fill practice form page", async ({ page }) => {
  // Ejericio de Practica
  await page.goto("https://demoqa.com/automation-practice-form");

  // Fill text fields
  // La estructura para hacer un fill es page -> selector (locator o un getBy) -> fill

  await page.getByPlaceholder("First Name").fill("Juan");
  await page.getByPlaceholder("Last Name").fill("Perez");
  await page.getByPlaceholder("name@example.com").fill("example@mail.com");
  await page.getByPlaceholder("Mobile Number").fill("1234567890");
  // Seleccionamos un subject y presionamos enter para que se agregue al input
  // then() -> ejecutar una vez que se complete la acción anterior
  await page
    .locator("#subjectsInput")
    .fill("Maths")
    .then(() => {
      page.keyboard.press("Enter");
    });
  await page
    .getByPlaceholder("Current Address")
    .fill("123 Main St, City, Country");

  // Radio buttons
  // La estructura para hacer un check (Seleccionar un radio button o checkbox)
  // es page -> selector (locator o un getBy) -> check

  // Se usa exact: true para que solo seleccione el radio button con el nombre exacto "Male"
  await page.getByRole("radio", { name: "Male", exact: true }).check();
  // Checkboxes
  // La diferencia entre un radio button y un checkbox es que un radio button solo permite seleccionar una opción, mientras que un checkbox permite seleccionar varias opciones.
  // es page -> selector (locator o un getBy) -> check
  await page.getByRole("checkbox", { name: "Sports" }).check();
  await page.getByRole("checkbox", { name: "Reading" }).check();
  await page.getByRole("checkbox", { name: "Music" }).check();
  // Upload file
  const filePath = "tests/testfile.txt"; // Ruta del archivo a subir
  await page.setInputFiles("#uploadPicture", filePath);
  
  // Select State and City
  // Options
  await page
    .locator("div")
    .filter({ hasText: /^Select State$/ })
    .nth(3)
    .click();
  // Hacer click en la opción deseada
  // Se puede usar getByRole con name para seleccionar la opción por su nombre
  await page.getByRole("option", { name: "NCR" }).click();

  await page.getByRole("button", { name: "Submit" }).click();
  
  // Validar que se muestre el mensaje de éxito
  await expect(page.getByText("Thanks for submitting the form")).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
});
