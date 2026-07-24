import ListScreen from '../../screenobjects/ios/list.screen';

describe('Todo List', () => {
    const listName = "Things to do today";

    xit('Create a Todo List', async () => {
        await ListScreen.createListBtn.click();
        await ListScreen.listNameInput.addValue(listName);
		await ListScreen.createBtn.click();

		await expect(await ListScreen.listNameField(listName)).toBeExisting();
    });
})