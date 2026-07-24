describe('Todo Items', () => {
    const todoListName = "Things to do today";
    const todoItemName = "Buy milk";
    it('Create to do list', async () => {
        await $('//*[@name="Create list"]').click();
        await $('//*[@value="List Name"]').addValue(todoListName);
        await $('~Create').click();

        await expect(await $("~" + todoListName)).toBeExisting();
    });

    it('Create a Todo Item', async () => {
        await $('~' + todoListName).click();
        await $('//*[@name="Create item"]').click();
        await $('//*[@value="Title"]').addValue(todoItemName);
        await $('//*[@value="Due"]').click();

        // Open the Date Picker (Tap 85% to the right side of the container)
        const datePicker = await $('//XCUIElementTypeDatePicker');
        await dynamicTap(datePicker, 0.85);
        // await driver.pause(1500); // Wait for calendar grid expansion

    });
    it('T3', async () => {
        const date = new Date();
        const tomorrowDay = date.getDate() + 1;
        const dateElement = '**/XCUIElementTypeStaticText[`label CONTAINS "' + tomorrowDay + '"`]';


        const dayCell = await $(`-ios class chain:${dateElement}`);
        await dynamicTap(dayCell, 0.4);
        await $("//XCUIElementTypeWindow[@index=2]").click();
        await $('~Create').click();

        // assertion
        await expect(await $("~" + todoItemName)).toBeExisting();

        const isAbsoluteExisting = await $('~Due July 25, 2026').isExisting();
        const isRelativeExisting = await $('~Due Tomorrow').isExisting();
        await expect(isAbsoluteExisting || isRelativeExisting).toBe(true);
    });
})


// async function dynamicTap(element: any, xOffsetPercent = 0.5, yOffsetPercent = 0.5) {
//     await element.waitForExist({ timeout: 5000 });

//     // Fetch coordinates and size safely
//     const location = await element.getLocation();
//     const size = await element.getSize();

//     // Calculate the target spot dynamically
//     const targetX = Math.floor(location.x + (size.width * xOffsetPercent));
//     const targetY = Math.floor(location.y + (size.height * yOffsetPercent));

//     console.log(`[Bypassing Actions API] Tapping coordinates natively: X=${targetX}, Y=${targetY}`);

//     // Native execution injects the click directly into the hardware layer without cleanup cycles
//     await browser.executeScript('mobile: tap', [{
//         x: targetX,
//         y: targetY
//     }]);
// }