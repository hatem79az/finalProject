const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { InventoryPage} = require('../pages/inventory.page');




test("SCENARIO #4:User should be logged out once Logout button is pressed", async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Given: The user is logged in with correct credintials and on the inventory page', async () => 
    {
        await loginPage.successfulSigIn();
    });

    await test.step('When: the user expands the side menu and clicks on (Logout) option', async () => 
    {
        await inventoryPage.sideMenuOpen().click();
        await inventoryPage.logOut().click();
    });

    await test.step('Then: The user is redirected to the login page', async () => 
    {
        await expect(page).toHaveURL("https://www.saucedemo.com/");

    });
});

test("SCENARIO #5:User should be able to filter the inventory according to the option chosen", async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Given:The user is logged in with correct credintials and on the inventory page', async () => 
    {
        await loginPage.successfulSigIn();
    });

    await test.step('When: The user navigates to the filter dropdown section and changes the filter option', async () => 
    {
        await inventoryPage.filterBtn().click();
        await expect(page.locator('//*[@id="inventory_container"]/div/div[1]/div[2]/div[1]')).toContainText("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style");
        await inventoryPage.filterBtn().selectOption('lohi');

    });

    await test.step('Then: The product display section changes to reflect the filter selected ', async () => 
    {
        await expect(page.locator('//*[@id="inventory_container"]/div/div[1]/div[2]/div[1]')).toContainText("Rib snap infant onesie for the junior automation");

    });
});

test("SCENARIO #6:User should see the correct product details such as image, product name, description and price on the inventory page", async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Given:The user is logged in with correct credintials and on the inventory page', async () => 
    {
        await loginPage.successfulSigIn();
    });

    // await test.step('When: ', async () => 
    // {

    // });

    await test.step('Then: The products are displayedon the inventory container', async () => 
    {
        await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
        await expect(page.getByText('$29.99')).toContainText("29.99");
        await expect(page.locator('[data-test="item-4-title-link"]')).toContainText("Sauce Labs Backpack");
        
        
    });
});



test("SCENARIO #8:User should see the cart icon update accordingly when adding a product to the cart.", async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Given: The user is logged in with correct credintials and on the inventory page with zero products added  ', async () => 
    {
        await loginPage.successfulSigIn();
        
    });

    await test.step('When:The user adds product(s) to their cart ', async () => 
    {
        await expect(page.locator('#shopping_cart_container > a > span')).toBeHidden();
        await inventoryPage.addProduct()
    });

    await test.step('Then: The cart icon displays the accurate number of products on the cart icon', async () => 
    {
        
        await expect(page.locator('#shopping_cart_container > a > span')).toContainText('1');
        await expect(page.locator('#shopping_cart_container > a > span')).toBeVisible();
    });
});



test("SCENARIO #10: User should be able to remove the added product from cart on the inventory page.", async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Given: The user is logged in & has one product added to the cart  ', async () => 
    {
        await loginPage.successfulSigIn();
        await inventoryPage.addProduct();
        await expect(page.locator('#shopping_cart_container > a > span')).toContainText('1');
    });

    await test.step('When: The user clicks on "remove" button for that product ', async () => 
    {
        await inventoryPage.removeFromCart().click();
    });

    await test.step('Then: The product is removed from the cart  ', async () => 
    {
        await expect(page.locator('#shopping_cart_container > a > span')).toBeHidden();

    });
});

test("SCENARIO #Extra1: User should be able to reset the app from the side menu", async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Given: The user is logged in & has one product added to the cart  ', async () => 
    {
        await loginPage.successfulSigIn();
        await inventoryPage.addProduct();
        await expect(page.locator('#shopping_cart_container > a > span')).toContainText('1');
    });

    await test.step('When: The user opens the side menu and clicks on "Reset App state', async () => 
    {
        await inventoryPage.sideMenuOpen().click();
        await inventoryPage.resetApp().click();
    });

    await test.step('Then: The product is removed from the cart', async () => 
    {
        await expect(page.locator('#shopping_cart_container > a > span')).toBeHidden();

    });
});

test("SCENARIO #Extra2: User should be able to be redirected to the main saucelabs website", async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Given: The user is logged in & has one product added to the cart  ', async () => 
    {
        await loginPage.successfulSigIn();
        await inventoryPage.addProduct();
        await expect(page.locator('#shopping_cart_container > a > span')).toContainText('1');
    });

    await test.step('When: The user opens the side menu and clicks on "Reset App state', async () => 
    {
        await inventoryPage.sideMenuOpen().click();
        await inventoryPage.about().click();
    });

    await test.step('Then: The product is removed from the cart', async () => 
    {
        await expect(page).toHaveURL("https://saucelabs.com/");

    });
});
