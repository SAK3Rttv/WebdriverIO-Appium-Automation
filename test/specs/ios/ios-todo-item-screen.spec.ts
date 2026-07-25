import ListScreen from '../../screenobjects/ios/list.screen';
import ItemScreen from '../../screenobjects/ios/ios.screen';

describe('Todo Items', () => {
    const todoListName = "Things to do today";
    const todoItemName = "Buy milk";

    before(async () => {
        // Create a new todo list
        await ListScreen.createListBtn.click();
        await ListScreen.listNameInput.addValue(todoListName);
        await ListScreen.createBtn.click();

        // assertion
        await expect(await ListScreen.listNameField(todoListName)).toBeExisting();

        // Open the newly created todo list
        await ItemScreen.getByAccessibilityId(todoListName).click();
    })

    it('Create a Todo Item', async () => {
        // Create a new todo item with a due date of tomorrow
        await ItemScreen.createItemDuoToTomorrow(todoItemName);

        // assertion
        await expect(await ItemScreen.getByAccessibilityId(todoItemName)).toBeExisting();

        const isAbsoluteExisting = await ItemScreen.getByAccessibilityId('Due July 25, 2026').isExisting();
        const isRelativeExisting = await ItemScreen.getByAccessibilityId('Due Tomorrow').isExisting();
        await expect(isAbsoluteExisting || isRelativeExisting).toBe(true);
    });
});