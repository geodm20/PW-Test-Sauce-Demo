import {test, expect} from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { Checkout } from "../pages/checkout.page";
import { users, password } from "../utils/config";
import { verify } from "crypto";

test.beforeEach(async({page}) => {
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(users.standard, password.correct);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

// TC11: Submit empty fields on checkout form 
test("Submit empty fields on checkout form", async ({page}) => {
    const checkoutPage = new Checkout(page);
    await checkoutPage.addRandomProductsToCart();
    await checkoutPage.goToCart();
    await checkoutPage.goToCheckout();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");

    await checkoutPage.continueToCheckout();
    const verifyError = await checkoutPage.verifyFormErrorMessage();
    expect(verifyError).toBeTruthy();
});