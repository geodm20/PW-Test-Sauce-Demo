import { type Page, type Locator } from '@playwright/test';

export class Cart {
    readonly page: Page;
    readonly addToCart: Locator;
    readonly cartCounter: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCart = page.locator("[data-test='inventory-item']");
        this.cartCounter = page.locator('.shopping_cart_badge');
    }

    async addRandomProductsToCart() {
        let products = await this.addToCart.all();
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
        const badgeText = await this.cartCounter.textContent();
        if (badgeText) return parseInt(badgeText);
        return 0;
    }

}