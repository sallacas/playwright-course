import { test, expect } from '@playwright/test';

test('create first login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('input#user-name').fill('standard_user');
  await page.locator('//input[@id=\'password\']').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
});