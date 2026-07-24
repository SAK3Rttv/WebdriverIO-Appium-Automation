import { dynamicTap } from '../../utils/helper';

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

    async openDatePicker() {
        await dynamicTap(await this.datePicker, 0.85);
    }

    get createBtn() {
        return $('~Create');
    }

    getByAccessibilityId(accessibilityId: string) {
        return $(`~${accessibilityId}`);
    }

    async selectNextDate() {
        const tomorrowDay = new Date().getDate() + 1;
        const dateElement = '**/XCUIElementTypeStaticText[`label CONTAINS "' + tomorrowDay + '"`]';
        const dayCell = await $(`-ios class chain:${dateElement}`);
        await dynamicTap(dayCell, 0.4);
    }

    async confirmDatePicker() {
        await $("//XCUIElementTypeWindow[@index=2]").click();
    }

    async createItemDuoToTomorrow(title: string) {
        await this.createItemBtn.click();
        await this.itemTitleInput.addValue(title);
        await this.itemDueInput.click();
        await this.openDatePicker();
        await this.selectNextDate();
        await this.confirmDatePicker();
        await this.createBtn.click();
    }
}

export default new ItemScreen();