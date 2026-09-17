import { test, expect, Page } from "@playwright/test";

type User = {
  username: string;
  password: string;
};

const users: User[] = [
  { username: "standard_user", password: "secret_sauce" },
  { username: "locked_out_user", password: "secret_sauce" },
  { username: "problem_user", password: "secret_sauce" },
  { username: "performance_glitch_user", password: "secret_sauce" },
];

// Function to get a user by username (function <nombre> <parametros> : <tipo de retorno>)
function getUserFunction(username: string): User | undefined {
  return users.find((user) => user.username === username);
}

// Arrow function to get a user by username (const <nombre> = (<parametros>) : <tipo de retorno> => { return ... })
const getUserArrowFunction = (username: string): User | undefined => {
  return users.find((user) => user.username === username);
}

// Validate function -> Async function (async <nombre> (<parametros>) : Promise<<tipo de retorno>> { return ... })
async function validateError(page: Page): Promise<boolean>{
  return await page.locator('[data-test="error"]').isVisible();
}


test("Login with standard user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const standardUser: User | undefined = getUserFunction("standard_user");

  await page.locator("input#user-name").fill(standardUser?.username || "");
  await page.locator("//input[@id='password']").fill(standardUser?.password || "");

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

  const lockedOutUser: User | undefined = getUserArrowFunction("locked_out_user");

  await page.locator("input#user-name").fill(lockedOutUser?.username || "");
  await page.locator("//input[@id='password']").fill(lockedOutUser?.password || "");

  await page.getByRole("button", { name: "Login" }).click();

  const result: boolean = await validateError(page);
  
  // Las aserciones en playwright se hacen con expect
  // expect(<valor>, <mensaje de error>).toBe(<valor esperado>)

  expect(result, 'Expected error message found = true').toBeTruthy();
});
