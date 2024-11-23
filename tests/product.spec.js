const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { InventoryPage} = require('../pages/inventory.page');



test("SCENARIO #11:User should be able to remove the added product from cart on the specific product page.", async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Given:The user is logged in and on the inventory page and has one product added , and clicked on the added product to move to the product page', async () => 
    {
        await loginPage.successfulSigIn();
        await inventoryPage.addProduct();
        await (page.locator('[data-test="item-4-title-link"]')).click();
    });

    await test.step('When: The user clicks on the "remove" button  ', async () => 
    {
        await expect(page.locator('#shopping_cart_container > a > span')).toContainText('1');
        await (page.locator('[data-test="remove"]')).click();
    });

    await test.step('Then: The item is removed from the shopping cart and the shopping cart counter is empty  ', async () => 
    {
        await expect(page.locator('#shopping_cart_container > a > span')).toBeHidden();

    });
});

