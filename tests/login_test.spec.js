const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');




test("SCENARIO #1:User should be able to log in with standard user given the correct credentials.", async ({page}) => {
    const loginPage = new LoginPage(page);
    await test.step('Given: The user is on the login page  ', async () => 
    {
        await loginPage.goto();
    });

    await test.step('When: The user enters correct credintials & clicks on the login button', async () => 
    {
        await loginPage.validUserLogin();
    });

    await test.step('Then: The user is redirected to the inventory page', async () => 
    {
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(page.locator('[data-test="title"]')).toHaveText("Products");
    });
});

test("SCENARIO #2:User should not be able to access the e-shop inventory without logging in. ", async ({page}) => {
    await test.step('Given: The user did not log in using the login page  ', async () => 
    {
     
    });

    await test.step('When: the user launches the "incognito" browser and inserts the url for the inventory page ', async () => 
    {
        await page.goto("https://www.saucedemo.com/inventory.html");
    });

    await test.step('Then: The user is redirected to the login page and a warning message is displayed.', async () => 
    {
        await expect(page).toHaveURL("https://www.saucedemo.com/");
        await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface");

    });
});

test("SCENARIO #3:User whose access is denied (locked_out_user) should not be able to log in. ", async ({page}) => {
    const loginPage = new LoginPage(page);
    await test.step('Given: The user is on the login page', async () => 
    {
        await loginPage.goto()
    });

    await test.step('When:The user enters with (locked_out_user) username and correct passsword and clicks on the login button ', async () => 
    {
        await loginPage.lockedUserLogin();
    });

    await test.step('Then: The user is blocked from being redirected to the inventory page and a warning message appears  ', async () => 
    {
        await expect(page).toHaveURL("https://www.saucedemo.com/");
        await expect(page.locator('[data-test="error"]')).toContainText("Sorry, this user has been locked out.");
    });
});


