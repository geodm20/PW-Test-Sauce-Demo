import { type Page, type Locator } from '@playwright/test';

export class Cart {
    readonly page: Page;
    readonly productContainer: Locator;
    readonly cartIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productContainer = page.locator("[data-test='inventory-item']");
        this.cartIcon = page.locator("[data-test='shopping-cart-link']");

    }

    async addRandomProductsToCart() {
        let products = await this.productContainer.all();
        const productsCount = products.length;
        let addedProducts = 0;

        if (productsCount) 
        {
            let randomCount = Math.floor(Math.random() * productsCount) + 1;
            // Unsort the product locator list and select a random number of them based on randomCount
            let randomProducts = products.sort(() => Math.random() - 0.5).slice(0, randomCount);

            for (const product of randomProducts) {
                await product.getByRole("button", {name: "Add to cart"}).click();
                addedProducts++;
            }

            return addedProducts;
        }
    }

    async getCartCount() {
        const badgeText = await this.cartIcon.textContent();
        if (badgeText) return parseInt(badgeText);
        return 0;
    }

    async goToCart() {
        await this.cartIcon.click();
    }

    async removeProductsFromCart() {
        let removeButtons = await this.productContainer.all();

        while (removeButtons.length > 0) {
            // Always click first element since they're dynamic
            await removeButtons[0].getByRole("button", {name: "Remove"}).click();
            // Update the iterable variable on every iteration to prevent waits for unexisting locators
            removeButtons = await this.productContainer.all();
        }
    }

    async verifyProductsAreRemoved() {
        const products = await this.productContainer.all();
        const productsCount = products.length;
        if (!productsCount) return true;
        return false;
    }

}