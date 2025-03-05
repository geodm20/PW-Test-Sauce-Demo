import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/products.page";
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
    const productsPage = new ProductsPage(page);
    const productsCount = await productsPage.verifyProductListCount();
    expect(productsCount).toEqual(6);

    const products = await productsPage.verifyProductList();
    const areProductDetailsValid = await productsPage.validateProductDetails(products);
    expect(areProductDetailsValid).toBeTruthy();
});

// TC06: Filter products by ascending price
test("Filter products by ascending price", async ({page}) => {
    const productsPage = new ProductsPage(page);
    await productsPage.orderProducts("lohi");
    const areAscending = await productsPage.arePricesInCorrectOrder();
    expect(areAscending).toBe(true);
});

// TC07: Filter products by descending price
test("Filter products by descending price", async ({page}) => {
    const productsPage = new ProductsPage(page);
    await productsPage.orderProducts("hilo");
    const areDescending = await productsPage.arePricesInCorrectOrder();
    expect(areDescending).toBe(true);
});

// TC08: View product details
test("View product details", async ({page}) => {
    const productsPage = new ProductsPage(page);
    const { randomProductDetails, clickedRandomProductDetails } = await productsPage.clickOnRandomProduct();

    expect(randomProductDetails).not.toBeNull();
    expect(clickedRandomProductDetails).not.toBeNull();
    expect(randomProductDetails).toEqual(clickedRandomProductDetails);
    
    if (clickedRandomProductDetails) { 
        const isProductDetailsValid = await productsPage.validateProductDetails([clickedRandomProductDetails]);
        expect(isProductDetailsValid).toBe(true);
    }
});