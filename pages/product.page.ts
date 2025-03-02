import { Page, Locator } from "@playwright/test";
import { Product } from "../utils/config";

export class ProductPage {
    readonly page: Page;
    readonly productList: Locator;
    readonly filterButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.productList = page.locator('[data-test="inventory-item"]');
        this.filterButton = page.locator('[data-test="product-sort-container"]');
    }

    // TC05 methods

    async verifyProductListCount() {
        return this.productList.count();
    }

    async verifyProductList() {
        const products: Product[] = [];
        const productElements = await this.productList.all(); // get an iterable array from the product list locator

        for (const product of productElements) {
            const name = await product.locator("[data-test='inventory-item-name']").textContent();
            const image = await product.locator("[data-test$='-img']").getAttribute('src');
            const price = await product.locator("[data-test='inventory-item-price']").textContent();
            products.push({name, image, price});
        }

        return products;
    }

    async validateProductDetails(products: Product[]) {
        let isValid = true;
        
        for (const product of products) {
            if (!product.name || 
                !product.image?.match(/.*\.jpg/) || 
                !product.price?.match(/\$\d+\.\d+/)) {
                isValid = false;
                break;
            }
        }
        
        return isValid;
    }

    // TC06 methods

    async orderProductsFromLowToHigh(value: string) {
        await this.filterButton.selectOption(value);
    }

    async arePricesInAscendingOrder() {
        const products = await this.verifyProductList();
        let previousPrice = 0;
        let isAscending = true;

        for (const product of products) {
            const currentPrice = parseInt(product.price?.replace("$", "") ?? "0");
            if (currentPrice < previousPrice) {
                isAscending = false;
                break
            }
            previousPrice = currentPrice;
        }

        return isAscending;
    }

}