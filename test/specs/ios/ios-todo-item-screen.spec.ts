import ListScreen from '../../screenobjects/ios/list.screen';
import ItemScreen from '../../screenobjects/ios/ios.screen';

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
        await ItemScreen.openDatePicker();

        // Select tomorrow's date
        await ItemScreen.selectNextDate();

        // Confirm the date selection by focus on other window
        await ItemScreen.confirmDatePicker();

        // Create todo item
        await ItemScreen.createBtn.click();

        // assertion
        await expect(await ItemScreen.getByAccessibilityId(todoItemName)).toBeExisting();

        const isAbsoluteExisting = await ItemScreen.getByAccessibilityId('Due July 25, 2026').isExisting();
        const isRelativeExisting = await ItemScreen.getByAccessibilityId('Due Tomorrow').isExisting();
        await expect(isAbsoluteExisting || isRelativeExisting).toBe(true);
    });
})