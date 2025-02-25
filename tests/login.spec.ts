import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { users, password } from '../utils/config';

test.beforeEach(async ({page}) => {
  await page.goto('/');
});

// TC01: Login with valid credentials and logout successfully
test('Login with valid credentials and logout successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(users.standard, password.correct);
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  await loginPage.logout();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

// TC02: Login with locked user
test('Login with locked user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(users.locked, password.correct);
  await expect(await loginPage.getErrorMessage()).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

// TC03: Login with invalid user
test('Login with invalid user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(users.invalid, password.correct);
  await expect(await loginPage.getErrorMessage()).toHaveText("Epic sadface: Username and password do not match any user in this service");
});

// TC04: Login without entering credentials
test('Login without entering credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("", "");
  await expect(await loginPage.getErrorMessage()).toHaveText("Epic sadface: Username is required");
});