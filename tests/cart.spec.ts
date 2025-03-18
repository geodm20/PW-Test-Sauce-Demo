import {test, expect} from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { Cart } from "../pages/cart.page";
import { users, password } from "../utils/config";

test.beforeEach(async ({page}) => {
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(users.standard, password.correct);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

// TC09: Verify added products on cart
test("Verify added products on cart", async ({page}) => {
    const cartPage = new Cart(page);
    const addedItems = await cartPage.addRandomProductsToCart();
    const cartItems = await cartPage.getCartCount();
  
    expect(cartItems).toBe(addedItems);
});

// TC10: Remove products from cart
test("Remove products from cart", async ({page}) => {
    const cartPage = new Cart(page);
    await cartPage.addRandomProductsToCart();
    await cartPage.goToCart();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    
    await cartPage.removeProductsFromCart();
    const cartItems = await cartPage.getCartCount();
    expect(cartItems).toBeFalsy();
    expect(await cartPage.verifyProductsAreRemoved()).toBeTruthy();
});