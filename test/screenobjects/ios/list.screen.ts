class ListScreen {
    get createListBtn() {
        return $('//*[@name="Create list"]');
    }

    get listNameInput() {
        return $('//*[@value="List Name"]');
    }

    get createBtn() {
        return $('~Create');
    }

    listNameField(listName: string) {
        return $(`~${listName}`);
    }
}

export default new ListScreen();