class ItemScreen {
    get createItemBtn() {
        return $('~Create item');
    }

    get itemTitleInput() {
        return $('//*[@value="Title"]');
    }

    get itemDueInput() {
        return $('//*[@value="Due"]');
    }

    get datePicker() {
        return $('~Date Picker');
    }

    get createBtn() {
        return $('~Create');
    }

    getByAccessibilityId(accessibilityId: string) {
        return $(`~${accessibilityId}`);
    }

    async confirmDatePicker() {
        await $("//XCUIElementTypeWindow[@index=2]").click();
    }

    async createItem(title: string, dueDate: Date) {
        // await this.createItemBtn.click();
        // await this.itemTitleInput.addValue(title);
        // await this.itemDueInput.click();
        // await this.selectDate(dueDate);
        // await this.createBtn.click();
    }
}

export default new ItemScreen();