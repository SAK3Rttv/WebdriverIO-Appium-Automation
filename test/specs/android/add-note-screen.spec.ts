import AddNoteScreen from '../../screenobjects/android/add-note.screen';
import DeleteNoteScreen from '../../screenobjects/android/delete-note.screen';

describe('Add Notes', async () => {
    const noteTitle = 'Fav Anime List';
    const noteBody = '1. Naruto\n2. One Piece\n3. Bleach';

    before(async () => {
        await AddNoteScreen.skipTutorial();
    });

    it('add a note, save changes & verify note', async () => {
        await AddNoteScreen.addNote(noteTitle, noteBody);

        // assertion
        await expect(AddNoteScreen.editBtnInNote).toBeDisplayed();

        // deep equality assertion
        await expect(AddNoteScreen.viewNote).toHaveText(noteBody);

        // partial matching assertion
        await expect(AddNoteScreen.viewNote).toHaveText(expect.stringContaining('One Piece'));

        // multiple partial matching assertion (OR if any of the strings match then pass)
        await expect(AddNoteScreen.viewNote).toHaveText([
            expect.stringContaining('One Piece'),
            expect.stringContaining('Naruto'),
            expect.stringContaining('Bleach5')
        ]);

        await AddNoteScreen.backBtnInNote.click();
    })

    it('Delete note & verify note is deleted', async () => {
        const noteElement = await DeleteNoteScreen.searchNoteByTitle(noteTitle);
        await noteElement.click();

        await DeleteNoteScreen.menuBtnInNoteView.click();

        await DeleteNoteScreen.deleteOptionInMenu.click();

        await driver.acceptAlert();

        await DeleteNoteScreen.menuBtnInMainScreen.click();

        await DeleteNoteScreen.trashCanOptionInMenu.click();

        // assertion
        const deletedNoteElement = await DeleteNoteScreen.searchNoteByTitle(noteTitle);
        await expect(deletedNoteElement).toBeExisting();
    })
})