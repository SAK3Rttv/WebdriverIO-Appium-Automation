describe('IOS Find Element', () => {
    it('find element by accessibility id', async () => {
        await $('Alert Views').click();
        await $('Simple').click();

        await expect(await driver.getAlertText()).toContain("A Short Title Is Best");
    });

    it('find by tag name', async () => {
        // single element
        const textFirstElement = await $('XCUIElementTypeStaticText');

        // multiple elements
        const textElements = await $$('XCUIElementTypeStaticText');

        for (const textElement of textElements) {
            console.log(await textElement.getText());
        }
    });

    it('find element by xpath', async () => {
        // xpath - (//tagename[@attribute='value'])

        await $('//*[@name="Alert Views"]').click();
        await $('//*[@name="Simple"]').click();
        await expect(await driver.getAlertText()).toContain("A Short Title Is Best");
    });

    it('find element by class chain', async () => {
        const alertText = '**/CUIElementTypeStaticText[`label == "Alert View"`]';
        const alertText2 = '**/XCUIElementTypeStaticText[`label CONTAINS "Alert"`]';


        await $(`-ios class chain:${alertText}`).click();
        await $('//*[@label="Simple"]').click();
        await expect(await driver.getAlertText()).toContain("A Short Title Is Best");
    });

    it('find element by predicate string', async () => {
        // const alertText = 'label == "Alert View"';
        const alertText = 'value BEGINSWITH[c] "alert"';

        await $(`-ios predicate string:${alertText}`).click();
        await $('//*[@label="Simple"]').click();
        await expect(await driver.getAlertText()).toContain("A Short Title Is Best");
    });

    it.only('Exercise: Enter text in the search field', async () => {
        await $('~Search').click();
        await $('~Default').click();
        await $('//XCUIElementTypeSearchField').addValue("I love this course!");

        await expect($('//XCUIElementTypeSearchField')).toHaveAttr('value');

        await $('~Clear text').click();
        await expect($('//XCUIElementTypeSearchField')).not.toHaveAttr('value');
    });
})