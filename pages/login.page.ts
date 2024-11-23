import {expect, Page} from "@playwright/test"

exports.LoginPage = class LoginPage
{
    page: Page;
    
        constructor(page: Page)
        {
            this.page = page;
        }

        async goto()
        {
            await this.page.goto("https://www.saucedemo.com/");
        }
        //locators
        usernameField = () => this.page.getByPlaceholder("Username");
        passwordField = () => this.page.getByPlaceholder("Password");
        loginBtn = () => this.page.locator('[data-test="login-button"]');
        
        //actions
        async validUserDetails(){
            await this.usernameField().fill("standard_user");
            await this.passwordField().fill("secret_sauce");
        }
        
        async lockedUserDetails(){
            await this.usernameField().fill("locked_out_user");
            await this.passwordField().fill("secret_sauce");
        }

        async validUserLogin(){
            await   this.validUserDetails()
            await   this.loginBtn().click()
        }

        async lockedUserLogin(){
            await   this.lockedUserDetails()
            await   this.loginBtn().click()
        }

        async successfulSigIn(){
            await this.goto();
            await this.validUserLogin();
        }


}