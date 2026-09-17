import { test, expect } from "@playwright/test";

const usernames: string[] = [
  "standard_user",
  "locked_out_user",
  "problem_user",
  "performance_glitch_user",
];

const users: { username: string; password: string }[] = [
  { username: "standard_user", password: "secret_sauce" },
  { username: "locked_out_user", password: "secret_sauce" },
  { username: "problem_user", password: "secret_sauce" },
  { username: "performance_glitch_user", password: "secret_sauce" },
];



test("Login with standard user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.locator("input#user-name").fill(users[0].username);
  await page.locator("//input[@id='password']").fill(users[0].password);

  await page.getByRole("button", { name: "Login" }).click();
});

test("Login with problem user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const { username, password } = users[2];

  await page.locator("input#user-name").fill(username);
  await page.locator("//input[@id='password']").fill(password);

  await page.getByRole("button", { name: "Login" }).click();
});

test("Login with locked out user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.locator("input#user-name").fill(users[1].username);
  await page.locator("//input[@id='password']").fill(users[1].password);

  await page.getByRole("button", { name: "Login" }).click();
});
