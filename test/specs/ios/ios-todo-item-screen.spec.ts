import ListScreen from '../../screenobjects/ios/list.screen';
import ItemScreen from '../../screenobjects/ios/ios.screen';

// import { dynamicTap } from '../../utils/dynamicTap';
describe('Todo Items', () => {
    const todoListName = "Things to do today";
    const todoItemName = "Buy milk";
    it('Create to do list', async () => {
        await ListScreen.createListBtn.click();
        await ListScreen.listNameInput.addValue(todoListName);
        await ListScreen.createBtn.click();

        await expect(await ListScreen.listNameField(todoListName)).toBeExisting();
    });

    it('Create a Todo Item', async () => {
        // Open existing todo list
        await ItemScreen.getByAccessibilityId(todoListName).click();

        // Create a new todo item
        await ItemScreen.createItemBtn.click();

        // Add title for todo item
        await ItemScreen.itemTitleInput.addValue(todoItemName);

        // Add date for todo item
        await ItemScreen.itemDueInput.click();

        // Open the Date Picker (Tap 85% to the right side of the container)
        const datePicker = await ItemScreen.datePicker;
        await dynamicTap(datePicker, 0.85);

        // Select tomorrow's date
        const tomorrowDay = new Date().getDate() + 1;
        const dateElement = '**/XCUIElementTypeStaticText[`label CONTAINS "' + tomorrowDay + '"`]';
        const dayCell = await $(`-ios class chain:${dateElement}`);
        await dynamicTap(dayCell, 0.4);

        // Confirm the date selection by focus on other window
        ItemScreen.confirmDatePicker();

        // Create todo item
        await $('~Create').click();

        // assertion
        await expect(await ItemScreen.getByAccessibilityId(todoItemName)).toBeExisting();

        const isAbsoluteExisting = await ItemScreen.getByAccessibilityId('Due July 25, 2026').isExisting();
        const isRelativeExisting = await ItemScreen.getByAccessibilityId('Due Tomorrow').isExisting();
        await expect(isAbsoluteExisting || isRelativeExisting).toBe(true);
    });
})


async function dynamicTap(element: any, xOffsetPercent = 0.5, yOffsetPercent = 0.5) {
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