const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { InventoryPage} = require('../pages/inventory.page');





test("SCENARIO #13:User should see the checkout overview with details such as payment, shipping info, price total.", async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Given:The user logged in ,has one product in the shopping cart, and "your information" checkout-step-one is filled', async () => 
    {
        await loginPage.successfulSigIn();
        await inventoryPage.addProduct()
        await inventoryPage.cartIcon().click();
        await (page.locator('[data-test="checkout"]')).click();
        await (page.getByPlaceholder('First Name')).fill("John");
        await (page.getByPlaceholder('Last Name')).fill("Doe");
        await (page.getByPlaceholder('Zip/Postal Code')).fill("123");
    });

    await test.step('When: The user clicks on "Continue" button ', async () => 
    {
        await (page.locator('[data-test="continue"]')).click();
    });

    await test.step('Then: The user is redirected to Checkout-step-two and the product details are visible in the "checkout overiview" section', async () => 
    {
        await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style ');
        await expect(page.locator('[data-test="item-quantity"]')).toContainText("1")
        await expect(page.locator('[data-test="inventory-item-price"]')).toContainText("29.99")

    });
});

test("SCENARIO #14:User should get notified when they fail to enter any of the checkout information.", async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Given:The user is logged in and has one product in the cart and is on the cart page and is on the checkout information page', async () => 
    {
        await loginPage.successfulSigIn();
        await inventoryPage.addProduct()
        await inventoryPage.cartIcon().click();
        await (page.locator('[data-test="checkout"]')).click();
        
    });

    await test.step('When: The user fills only first name and last name fields and keep the postal code empty and clicks on "Continue" button ', async () => 
    {
        await (page.getByPlaceholder('First Name')).fill("John");
        await (page.getByPlaceholder('Last Name')).fill("Doe");
        await (page.locator('[data-test="continue"]')).click();
        
    });

    await test.step('Then:  ', async () => 
    {
        await expect(page.locator('[data-test="error"]')).toContainText("Error: Postal Code is required")

    });
});

test("SCENARIO #15:User should get notified after placing a successful order.", async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Given:The user logged in ,has one product in the shopping cart, and "your information" checkout-step-one is filled and user clicked on "continue" button', async () => 
    {
        await loginPage.successfulSigIn();
        await inventoryPage.addProduct()
        await inventoryPage.cartIcon().click();
        await (page.locator('[data-test="checkout"]')).click();
        await (page.getByPlaceholder('First Name')).fill("John");
        await (page.getByPlaceholder('Last Name')).fill("Doe");
        await (page.getByPlaceholder('Zip/Postal Code')).fill("123");
        await (page.locator('[data-test="continue"]')).click();
    });

    await test.step('When: The user clicks on "Finish" button ', async () => 
    {
        await (page.locator('[data-test="finish"]')).click();
    });

    await test.step('Then:The user is redirected to "checkout complete" page and a thank you message is displayed  ', async () => 
    {
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
        await expect(page.locator('[data-test="complete-header"]')).toContainText("Thank you for your order!")
    });
});


