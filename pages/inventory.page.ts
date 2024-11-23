import {expect, Page} from "@playwright/test"

exports.InventoryPage = class InventoryPage
{
    page: Page;
    
        constructor(page: Page)
        {
            this.page = page;
        }


        //locators
        sideMenuOpen = () => this.page.getByRole('button', { name: 'Open Menu' });
        sideMenuClose = () => this.page.getByRole('button', { name: 'Close Menu' })
        logOut = () => this.page.locator('[data-test="logout-sidebar-link"]')
        resetApp = () => this.page.locator('[data-test="reset-sidebar-link"]')
        about = () => this.page.locator('[data-test="about-sidebar-link"]')
        filterBtn = () => this.page.locator('[data-test="product-sort-container"]')
        addToCart = () => this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        removeFromCart = () => this.page.locator('[data-test="remove-sauce-labs-backpack"]');
        itemInCartCount = () => this.page.locator('/html/body/div/div/div/div[1]/div[1]/div[3]/a/span')
        loginBtn = () => this.page.locator('[data-test="login-button"]');
        cartIcon = () => this.page.locator('[data-test="shopping-cart-link"]')


        //actions


        async addProduct(){
            await   this.addToCart().click();
            
        }




}