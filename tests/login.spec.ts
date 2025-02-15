import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { users, password } from '../utils/config';

let loginPage: LoginPage;

test.beforeEach(async ({page}) => {
  await page.goto('/');
  loginPage = new LoginPage(page);
});

// TC01: Login with valid credentials and logout successfully
test('Login with valid credentials and logout successfully', async ({ page }) => {
  await loginPage.login(users.standard, password.correct);
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  await loginPage.logout();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

// TC02: Login with locked user
test('Login with locked user', async ({ page }) => {
  await loginPage.login(users.locked, password.correct);
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

// TC03: Login with invalid user
test('Login with invalid user', async ({ page }) => {
  await loginPage.login(users.invalid, password.correct);
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
});

// TC04: Login without entering credentials
test('Login without entering credentials', async ({ page }) => {
  await loginPage.login("", "");
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText("Epic sadface: Username is required");
});