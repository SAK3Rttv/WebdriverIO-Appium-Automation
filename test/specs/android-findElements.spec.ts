describe('Android Elements Tests', () => {
    it('Find element by accessibility id', async () => {
        // find element by accessibility id
        const appOption = await $('~App');

        // click on element
        await appOption.click();

        // assertion
        const actionBar = await $('~Action Bar');
        await expect(actionBar).toBeExisting();
    })

    it('Find element by class name', async () => {
        // find element by class name
        const classNameElement = await $('android.widget.TextView');

        console.log(await classNameElement.getText());

        // Assertion
        await expect(classNameElement).toHaveText('API Demos');
    })

    xit('Find element by xpath', async () => {
        // find element by xpath - (//tagname=[@attribute=value])
        await $('//android.widget.TextView[@content-desc="Alert Dialogs"]').click();

        // find by resource id
        await $('//android.widget.Button[@resource-id="io.appium.android.apis:id/select_button"]').click();

        // find by text
        await $('//android.widget.TextView[@text="Command two"]').click();

        // find by class - assertion
        const textAssertion = await $('android.widget.TextView');
        await expect(textAssertion).toHaveText('You selected: 1 , Command two');
    });

    it('Find elements by UIAutomator', async () => {
	    // find by text contains
		await $('android=new UiSelector().textContains("Alert")').click();
    })

    it('Find multiple elements', async () => {
        const expectedList = [
            "API Demos", "Access'ibility",
            "Accessibility", "Animation",
            "App", "Content",
            "Graphics", "Media",
            "NFC", "OS",
            "Preference", "Text",
            "Views"
        ]
        const actualList = []

        // find multiple elements
        const textList = await $$('android.widget.TextView');

        // loop through them
        for (const element of textList) {
            actualList.push(await element.getText());
        }

        // assert the list
        await expect(actualList).toEqual(expectedList);
    })

	it.only('Execrices input field', async () => {
        // access the auto complete screen
	    await $("~Views").click();
		await $("~Auto Complete").click();
		await $("~1. Screen Top").click();

        // enter the country name in the input field
        const inputField = await $("id=io.appium.android.apis:id/edit");
        await inputField.click();
        await inputField.setValue("can");

        // Select autocomplete option
        // add these two options into config
        // to allow select from popup windows using xpath
        // appium:enableMultiWindows, appium:enableTopmostWindowFromActivePackage
        const dropdownList = await $("//android.widget.ListView");
        const canadaOption = await dropdownList.$("//android.widget.TextView[contains(@text, 'Canada')]");
        await canadaOption.waitForExist({ timeout: 3000 });
        await canadaOption.click();



        // Verift the country name
        await expect(inputField).toHaveText("Canada", {ignoreCase: true});
    })
})