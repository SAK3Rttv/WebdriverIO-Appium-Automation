describe('Add Notes', async () => {
    const noteTitle = 'Fav Anime List';
    const noteBody = '1. Naruto\n2. One Piece\n3. Bleach';

    it('Skip tutorial', async () => {
        await $('id=btn_start_skip').click();

        // assertion
        await expect($('id=btn_start_skip')).not.toBeDisplayed();
        await expect($('id=empty_text')).toBeDisplayed();
    });

    it('add a note, save changes & verify note', async () => {
        await $('id=empty_text').click();

        await $('android=new UiSelector().text("Text")').click();

        await expect($('android=new UiSelector().text("Editing")')).toBeDisplayed();

        // add note title
        await $('id=edit_title').setValue(noteTitle);

        // add note body
        await $('id=edit_note').setValue(noteBody);

        // save note
        await driver.back();
        await driver.back();

        // assertion
        await expect($('id=edit_btn')).toBeDisplayed();

        // deep equality assertion
        await expect($('id=view_note')).toHaveText(noteBody);

        // partial matching assertion
        await expect($('id=view_note')).toHaveText(expect.stringContaining('One Piece'));

        // multiple partial matching assertion (OR if any of the strings match then pass)
        await expect($('id=view_note')).toHaveText([
            expect.stringContaining('One Piece'),
            expect.stringContaining('Naruto'),
            expect.stringContaining('Bleach5')
        ]);

        await $('id=back_btn').click();
    })

    it('Delete note & verify note is deleted', async () => {
        await $(`android=new UiSelector().resourceId("com.socialnmobile.dictapps.notepad.color.note:id/title").text("${noteTitle}")`).click();

        await $('id=menu_btn').click();

        await $('android=new UiSelector().resourceId("com.socialnmobile.dictapps.notepad.color.note:id/text").text("Delete")').click();

        await driver.acceptAlert();

        await $('id=icon_nav').click();

        await $('android=new UiSelector().resourceId("com.socialnmobile.dictapps.notepad.color.note:id/text").text("Trash Can")').click();

        await expect($(`android=new UiSelector().resourceId("com.socialnmobile.dictapps.notepad.color.note:id/title").text("${noteTitle}")`)).toBeExisting();
    });
})