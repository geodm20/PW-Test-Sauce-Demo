import { Page, Locator } from "@playwright/test";
import { Product } from "../utils/config";

export class ProductsPage {
    readonly page: Page;
    readonly productList: Locator;
    readonly filterButton: Locator;
    private sortValue: string = "";

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
        const productList = await this.productList.all(); // get an iterable array from the product list locator

        for (const product of productList) {
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

    // TC06 - TC07 methods

    async orderProducts(value: string) {
        await this.filterButton.selectOption(value);
        this.sortValue = value;
    }

    async arePricesInCorrectOrder() {
        const products = await this.verifyProductList();
        if (products.length <= 1) return true;
        let isCorrectOrder = true;
        let previousPrice = parseFloat(products[0].price?.replace("$", "") ?? "0");
        const remainingProducts = products.slice(1);

        for (const product of remainingProducts) {
            const currentPrice = parseFloat(product.price?.replace("$", "") ?? "0");
            
            if ((this.sortValue === "lohi" && currentPrice < previousPrice) || 
                (this.sortValue === "hilo" && currentPrice > previousPrice)) {
                isCorrectOrder = false;
                break;
            }
            
            previousPrice = currentPrice;
        }

        return isCorrectOrder;
    }

    // TC08 methods

    async clickOnRandomProduct() {
        const products = await this.productList.all();
        const productsCount = products.length;

        if (productsCount) 
        {
            // Choose random item with locators in a list
            const randomIndex = Math.floor(Math.random() * productsCount);
            const randomProduct = products[randomIndex];

            // Extract information from the selected item
            const randomProductDetails = {
                name: await randomProduct.locator("[data-test='inventory-item-name']").textContent(),
                image: await randomProduct.locator("[data-test$='-img']").getAttribute('src'),
                price: await randomProduct.locator("[data-test='inventory-item-price']").textContent()
            }
            
            await randomProduct.locator("a div").click();

            // Get info from the clicked random product
            const clickedRandomProductDetails = {
                name: await this.page.locator("[data-test='inventory-item-name']").textContent(),
                image: await this.page.locator("[data-test$='-img']").getAttribute('src'),
                price: await this.page.locator("[data-test='inventory-item-price']").textContent()
            }

            return {randomProductDetails, clickedRandomProductDetails};
        } 
        
        else return { randomProductDetails: null, clickedRandomProductDetails: null }
    }

}