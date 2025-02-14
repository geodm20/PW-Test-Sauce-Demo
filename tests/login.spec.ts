import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { users, password } from '../utils/config';

test.beforeEach(async ({page}) => {
  await page.goto('/');
});

test('Correct login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(users.standard, password);
});
