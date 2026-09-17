import { test, expect, Page } from "@playwright/test";
import { User, usuarios } from "./data/usuarios";

// Traer los usuarios desde el archivo data/usuarios.ts

// Llamar el usuario desde el array con su type
test("Login with standard user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const user: User = usuarios[0];

  await page.locator("input#user-name").fill(user.username);
  await page.locator("//input[@id='password']").fill(user.password);

  await page.getByRole("button", { name: "Login" }).click();
});

// Llamar el usuario desde el array con destructuring
test("Login with problem user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const { username, password, isActive } = usuarios[2];

  await page.locator("input#user-name").fill(username);
  await page.locator("//input[@id='password']").fill(password);

  await page.getByRole("button", { name: "Login" }).click();
  console.log(`Is user active? ${isActive}`);
});

// Llamar el usuario desde el array con destructuring -> Solo el username
test("Login with locked out user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const { username } = usuarios[1];

  await page.locator("input#user-name").fill(username);
  await page.locator("//input[@id='password']").fill("secret_sauce");

  await page.getByRole("button", { name: "Login" }).click();

});
