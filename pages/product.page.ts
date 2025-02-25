import { Page, Locator } from "@playwright/test";
import { Product } from "../utils/config";

export class ProductPage {
    readonly page: Page;
    readonly productList: Locator;

    constructor (page: Page) {
        this.page = page;
        this.productList = page.locator('[data-test="inventory-item"]');
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
    
    async verifyProductListCount() {
        return this.productList.count();
    }

}