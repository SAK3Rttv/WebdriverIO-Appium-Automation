class DeleteNoteScreen {
    async NavigateToMainScreen() {
        driver.startActivity('com.socialnmobile.dictapps.notepad.color.note'
            , 'com.socialnmobile.colornote.activity.Main');
    }

    async searchNoteByTitle(noteTitle: string) {
        return $(`android=new UiSelector().resourceId("com.socialnmobile.dictapps.notepad.color.note:id/title").text("${noteTitle}")`);
    }

    get menuBtnInNoteView() {
        return $('id=menu_btn');
    }

    get deleteOptionInMenu() {
        return $('android=new UiSelector().resourceId("com.socialnmobile.dictapps.notepad.color.note:id/text").text("Delete")');
    }

    get trashCanOptionInMenu() {
        return $('android=new UiSelector().resourceId("com.socialnmobile.dictapps.notepad.color.note:id/text").text("Trash Can")');
    }

    get menuBtnInMainScreen() {
        return $('id=icon_nav');
    }
}

export default new DeleteNoteScreen();