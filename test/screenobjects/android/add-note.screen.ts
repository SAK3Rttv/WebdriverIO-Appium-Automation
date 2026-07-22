class AddNoteScreen {
    get skipBtn() {
        return $('id=btn_start_skip');
    }

    get addNoteTxt() {
        return $('id=empty_text');
    }

    get textOption() {
        return $('android=new UiSelector().text("Text")');
    }

    get textEditing() {
        return $('android=new UiSelector().text("Editing")');
    }

    get noteHeading() {
        return $('id=edit_title');
    }

    get noteBody() {
        return $('id=edit_note');
    }

    get backBtnInNote() {
        return $('id=back_btn');
    }

    get editBtnInNote() {
        return $('id=edit_btn');
    }

    get viewNote() {
        return $('id=view_note');
    }

    async saveNote() {
        await driver.back();
        await driver.back();
    }

    async addNote(title: string, body: string) {
        // click on add note text
        await this.addNoteTxt.click();

        // click on text option
        await this.textOption.click();

        // assertion
        await expect(this.textEditing).toBeDisplayed();

        // add note title
        await this.noteHeading.setValue(title);

        // add note body
        await this.noteBody.setValue(body);

        // save note
        await this.saveNote();
    }

    async skipTutorial() {
        await this.skipBtn.click();
        await expect(this.skipBtn).not.toBeDisplayed();
        await expect(this.addNoteTxt).toBeDisplayed();
    }
}

export default new AddNoteScreen();