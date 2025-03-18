import { type Page, type Locator } from '@playwright/test';

export class Checkout {
    readonly page: Page;
    readonly productContainer: Locator;
    readonly cartIcon: Locator;
    readonly checkoutButton: Locator;
    readonly continueCheckout: Locator;
    readonly formErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productContainer = page.locator("[data-test='inventory-item']");
        this.cartIcon = page.locator("[data-test='shopping-cart-link']");
        this.checkoutButton = page.getByRole("button", {name: "Checkout"});
        this.continueCheckout = page.getByRole("button", {name: "Continue"});
        this.formErrorMessage = page.getByText("Error: First Name is required");
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

    async goToCart() {
        await this.cartIcon.click();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async continueToCheckout() {
        await this.continueCheckout.click();
    }

    async verifyFormErrorMessage() {
        if (this.formErrorMessage) return true;
        else return false;
    }
}