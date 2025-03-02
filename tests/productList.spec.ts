import { test, expect } from "@playwright/test";
import { ProductPage } from "../pages/product.page";
import { LoginPage } from "../pages/login.page";
import { users, password } from "../utils/config";

test.beforeEach(async ({page}) => {
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(users.standard, password.correct);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

// TC05: View all available products
test("View all available products", async ({page}) => {
    const productPage = new ProductPage(page);
    const productsCount = await productPage.verifyProductListCount();
    expect(productsCount).toEqual(6);

    const products = await productPage.verifyProductList();
    const areProductDetailsValid = await productPage.validateProductDetails(products);
    expect(areProductDetailsValid).toBeTruthy();
});