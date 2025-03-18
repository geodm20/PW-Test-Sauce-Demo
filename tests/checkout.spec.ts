import {test, expect} from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { Checkout } from "../pages/checkout.page";
import { users, password } from "../utils/config";

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

// TC12: Complete checkout
test("Complete checkout", async({page}) => {
    const checkoutPage = new Checkout(page);
    await checkoutPage.addRandomProductsToCart();
    await checkoutPage.goToCart();
    await checkoutPage.goToCheckout();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");

    await checkoutPage.fillForm();
    await checkoutPage.continueToCheckout();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");

    const totalPrice = await checkoutPage.getSubTotalPrice();
    const pricesSum = await checkoutPage.getPricesSum();
    expect(totalPrice).toEqual(pricesSum);

    await checkoutPage.clickOnFinishButton();
    const cartCount = await checkoutPage.getCartCount();
    expect(cartCount).toBeFalsy();
    const verifyCheckoutDone = await checkoutPage.verifyCheckoutDone();
    expect(verifyCheckoutDone).toBeTruthy();

    await checkoutPage.getBackHome();
    expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});