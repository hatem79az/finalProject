const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { InventoryPage} = require('../pages/inventory.page');






test("SCENARIO #7:User should see the added product in their cart.", async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Given: The user is logged in and on the inventory page and has one product added', async () => 
    {
        await loginPage.successfulSigIn();
        await inventoryPage.addProduct()
        
    });

    await test.step('When: The user clicks on the cart icon', async () => 
    {
        await inventoryPage.cartIcon().click();
        
    });

    await test.step('Then: the user is redirected to the cart page and the added product is displayed', async () => 
    {
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
        await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style ');
        await expect(page.locator('[data-test="item-quantity"]')).toContainText("1")
    });
});




test("SCENARIO #9:User should be able to remove the added product on the cart page.", async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Given: The user is logged in and has one product added to the cart and is on the cart page', async () => 
    {
        await loginPage.successfulSigIn();
        await inventoryPage.addProduct()
        await inventoryPage.cartIcon().click();
        
    });

    await test.step('When: The user clicks on "Remove" button in the product section ', async () => 
    {
        await (page.locator('[data-test="remove-sauce-labs-backpack"]')).click();
    });

    await test.step('Then: the product is removed and the shopping cart is empty  ', async () => 
    {
        await expect(page.locator('[data-test="inventory-item"]')).toBeHidden();
        await expect(page.locator('#shopping_cart_container > a > span')).toBeHidden();

    });
});



test("SCENARIO #12: User should be able to continue shopping from the cart page.", async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Given: The user is logged in and has one product in the cart and is on the cart page', async () => 
    {
        await loginPage.successfulSigIn();
        await inventoryPage.addProduct()
        await inventoryPage.cartIcon().click();
        
    });

    await test.step('When: The user clicks on "Checkout" button ', async () => 
    {
        await (page.locator('[data-test="checkout"]')).click();
    });

    await test.step('Then: The user is redirected to checkout-step-one page to fill information', async () => 
    {
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
        await expect(page.locator('[data-test="title"]')).toContainText("Checkout: Your Information")

    });
});
