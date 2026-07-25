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

    get createBtn() {
        return $('~Create');
    }

    get nextMonthBtn() {
        return $('~Next month');
    }

    getByAccessibilityId(accessibilityId: string) {
        return $(`~${accessibilityId}`);
    }

    async selectNextDate() {
        const tomorrowDay = new Date().getDate() + 1;
        const dayCell = await this.getByAccessibilityId(tomorrowDay.toString());
        if (!(await dayCell.isExisting())) {
            await this.selectFirstDateOfNextMonth();
            return;
        }
        await dynamicTap(dayCell, 0.4);
    }

    async selectFirstDateOfNextMonth() {
        await dynamicTap(await this.nextMonthBtn, 0.4);
        const firstDayCell = await this.getByAccessibilityId('1');
        await dynamicTap(firstDayCell, 0.4);
    }

    async openDatePicker() {
        await dynamicTap(await this.datePicker, 0.85);
    }

    async confirmDatePicker() {
        await $("//XCUIElementTypeWindow[@index=2]").click();
    }

    async createItemDuoToTomorrow(title: string) {
        // Create a new todo item
        await this.createItemBtn.click();

        // Add title for todo item
        await this.itemTitleInput.addValue(title);

        // Add date for todo item
        await this.itemDueInput.click();

        // Open the Date Picker (Tap 85% to the right side of the container)
        await this.openDatePicker();

        // Select tomorrow's date
        await this.selectNextDate();

        // Confirm the date selection by focus on other window
        await this.confirmDatePicker();

        // Create todo item
        await this.createBtn.click();
    }
}

export default new ItemScreen();