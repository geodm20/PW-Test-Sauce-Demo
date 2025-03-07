import { type Page, type Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly menuButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole("textbox", { name: "Username"});
        this.passwordInput = page.getByRole("textbox", { name: "Password"});
        this.loginButton = page.getByRole("button", { name: "Login"});
        this.errorMessage = page.locator("[data-test=error]");
        this.menuButton = page.locator("#react-burger-menu-btn");
        this.logoutButton = page.getByRole("link", { name: "Logout"});
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async logout() {
        await this.menuButton.click();
        await this.logoutButton.click();
    }

    async getErrorMessage() {
        return this.errorMessage;
    }

}