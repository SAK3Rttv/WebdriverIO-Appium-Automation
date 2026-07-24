describe('Todo Items', () => {
    const todoListName = "Things to do today";
    it('Create to do list', async () => {
        await $('//*[@name="Create list"]').click();
		await $('//*[@value="List Name"]').addValue(todoListName);
		await $('~Create').click();

		await expect(await $("~" + todoListName)).toBeExisting();
    });

    it('Create a Todo Item', async () => {
        await $('~' + todoListName).click();


        await $('//*[@name="Create item"]').click();


        await $('//*[@value="Title"]').addValue("Buy milk");

        await $('//*[@value="Due"]').click();


        // const datePicker = await $("~Date Picker").click();

// 1. Clear any pending animations to ensure the layout is stable
// await driver.pause(2000);

// 2. Fetch the live layout source tree from the iOS device
// console.log("=== START OF APPLICATION XML SOURCE ===");
// const xmlSource = await driver.getPageSource();
// console.log(xmlSource);
// console.log("=== END OF APPLICATION XML SOURCE ===");

// 3. Fallback temporary workaround to keep your test passing right now
if (await driver.isKeyboardShown()) {
    await driver.hideKeyboard();
}
 // 1. Open the Date Picker (Tap 85% to the right side of the container)
const datePicker = await $('//XCUIElementTypeDatePicker');
await dynamicTap(datePicker, 0.85);
await driver.pause(1500); // Wait for calendar grid expansion

// await datePickerButton.waitForDisplayed({ timeout: 5000 });
// const location = await datePickerButton.getLocation();
// const size = await datePickerButton.getSize();
// const centerX = Math.floor(location.x + (size.width / 2));
// const centerY = Math.floor(location.y + (size.height / 2));
// await driver.executeScript('mobile: tap', [{
//     x: centerX,
//     y: centerY
// }]);
// await driver.executeScript('mobile: tap', [{ elementId: fallbackElement.elementId }]);


        // await datePicker.moveTo();

        // await driver.execute('mobile: tap', { x: 0, y: 0 });

// 1. Fetch exact runtime layout boundaries from BrowserStack device
// const location = await datePicker.getLocation();
// const size = await datePicker.getSize();

// 2. Mathematically compute center point
// const centerX = Math.round(location.x + (size.width / 2));
// const centerY = Math.round(location.y + (size.height / 2));

// 3. Fire the tap via native script passing calculated absolute coordinates
// This satisfies BrowserStack's mandatory x/y parameters without hardcoding!
// await driver.execute('mobile: tap', {
//     x: centerX,
//     y: centerY
// });



    });
    it('T3', async () => {
const date = new Date();
        // const [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
        // const tomorrowDay = date.getDate() + 1;
        // const dateElement = '**/XCUIElementTypeStaticText[`label CONTAINS "' + tomorrowDay + '"`]';


        // const dayCell = await $(`-ios class chain:${dateElement}`);
        const dayCell = await $('//XCUIElementTypeStaticText[@name="25"]');
        await dynamicTap(dayCell, 0.4);
        await driver.pause(1000);
        // await $("~Friday, July 24").click();
        await $("//XCUIElementTypeWindow[@index=2]").click();
        await $('~Create').click();

        // assertion
        await expect(await $("~Buy milk")).toBeExisting();
        await expect(await $('~Due July 25, 2026')).toBeExisting();
    });
})

// async function dynamicTap(element:any, xOffsetPercent = 0.5) {
//     await element.waitForDisplayed({ timeout: 5000 });

//     // Fetch coordinates and size using correct WebdriverIO methods
//     const location = await element.getLocation(); // Returns { x, y }
//     const size = await element.getSize();         // Returns { width, height }

//     // Calculate the target spot dynamically
//     const targetX = Math.floor(location.x + (size.width * xOffsetPercent));
//     const targetY = Math.floor(location.y + (size.height / 2));

//     // Execute the pointer action
//     await driver.action('pointer')
//         .move({ duration: 0, x: targetX, y: targetY })
//         .down({ button: 0 })
//         .pause(100)
//         .up({ button: 0 })
//         .perform();
// }

async function dynamicTap(element:any, xOffsetPercent = 0.5, yOffsetPercent = 0.5) {
    await element.waitForExist({ timeout: 5000 });

    // Fetch coordinates and size safely
    const location = await element.getLocation();
    const size = await element.getSize();

    // Calculate the target spot dynamically
    const targetX = Math.floor(location.x + (size.width * xOffsetPercent));
    const targetY = Math.floor(location.y + (size.height * yOffsetPercent));

    console.log(`[Bypassing Actions API] Tapping coordinates natively: X=${targetX}, Y=${targetY}`);

    // Native execution injects the click directly into the hardware layer without cleanup cycles
    await browser.executeScript('mobile: tap', [{
        x: targetX,
        y: targetY
    }]);
}