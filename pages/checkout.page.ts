import { type Page, type Locator } from '@playwright/test';
import { Person } from "../utils/config";
import { randomPeople } from "../utils/config";

export class Checkout {
    readonly page: Page;
    readonly productContainer: Locator;
    readonly cartIcon: Locator;
    readonly checkoutButton: Locator;
    readonly continueCheckout: Locator;
    readonly formErrorMessage: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly person: Person[];
    readonly subTotalPrice: Locator;
    readonly priceContainer: Locator;
    readonly finishButton: Locator;
    readonly doneTitle: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productContainer = page.locator("[data-test='inventory-item']");
        this.cartIcon = page.locator("[data-test='shopping-cart-link']");
        this.checkoutButton = page.getByRole("button", {name: "Checkout"});
        this.continueCheckout = page.getByRole("button", {name: "Continue"});
        this.formErrorMessage = page.getByText("Error: First Name is required");
        this.firstName = page.getByPlaceholder("First Name");
        this.lastName = page.getByPlaceholder("Last Name");
        this.postalCode = page.getByPlaceholder("Zip/Postal Code");
        this.person = randomPeople;
        this.subTotalPrice = page.locator("[data-test='subtotal-label']");
        this.priceContainer = page.locator("[data-test='inventory-item-price']");
        this.finishButton = page.getByRole("button", {name: "Finish"});
        this.doneTitle = page.getByTitle("Thank you for your order!");
        this.backHomeButton = page.getByRole("button", {name: "Back Home"});
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

    async fillForm() {
        const randomIndex = Math.floor(Math.random() * randomPeople.length);
        const randomPerson = this.person[randomIndex];

        await this.firstName.fill(randomPerson.firstName);
        await this.lastName.fill(randomPerson.lastName);
        await this.postalCode.fill(randomPerson.postalCode);
    }

    async getSubTotalPrice() {
        const priceText = await this.subTotalPrice.textContent();
        if (priceText) return parseFloat(priceText.replace("Item total: $", "")).toFixed(2);
        else return 0;
    }

    async getPricesSum() {
        let prices = await this.priceContainer.all();
        let pricesCount = prices.length;
        let totalSum = 0;

        if (pricesCount) {
            for (const price of prices) {
                const priceText = await price.textContent();
                if (priceText) totalSum += parseFloat(priceText.replace("$", ""));
            }
        }

        return totalSum.toFixed(2);
    }

    async clickOnFinishButton() {
        await this.finishButton.click();
    }

    async verifyCheckoutDone() {
        if (this.doneTitle) return true;
        else false;
    }

    async getBackHome() {
        await this.backHomeButton.click();
    }
}