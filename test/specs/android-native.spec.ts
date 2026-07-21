describe('Android Native Feature Tests', () => {
    it('Access an Actitivy directly', async () => {
        await driver.startActivity(
            "io.appium.android.apis",
            "io.appium.android.apis.app.AlertDialogSamples");

        // Assertion
        await expect($('//*[@text="App/Alert Dialogs"]')).toBeExisting ();

    })

    it('Working with Dialog Boxes', async () => {

        // 1) *** Click on the first dialog by id= ***
        // await $('id=io.appium.android.apis:id/two_buttons').click();
    //-------------------------------------------------------------------------------------------------
        // 2) *** Click on first dialog by xpath ***
        // await $('//android.widget.Button[@resource-id="io.appium.android.apis:id/two_buttons"]').click();
    //-------------------------------------------------------------------------------------------------
        // 3) *** Click on first dialog by UiSelector ***
        // await $('android=new UiSelector().resourceId("io.appium.android.apis:id/two_buttons")').click();

        // Click on the first dialog by id=
        await $('id=two_buttons').click();

        // accept Alert
        await driver.acceptAlert();

        // assertion - alert is no longer present
        await expect($('id=alertTitle')).not.toBeExisting();
    })

    it('Vertical scrolling', async () => {
        await $('~App').click();
        await $('~Activity').click();


        // scroll to the end (not stable if elements gets moved)
        // await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5)');

        // scroll to an element with text "Secure Surfaces"
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Secure Surfaces")').click();

        // assertion
        await expect($('~Secure Dialog')).toBeExisting();
    })

    it('Horizontal scrolling', async () => {
        await driver.startActivity(
            "io.appium.android.apis",
            "io.appium.android.apis.view.Gallery1");

        // Horizontal scrolling
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()');
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollBackward()');

        await driver.pause(3000);
    })

    it.only('exercise test', async () => {

        driver.startActivity(
            "io.appium.android.apis",
            "io.appium.android.apis.view.DateWidgets1"
        );

        await $('id=dateDisplay').waitForExist({ timeout: 3000 });

        const dateDisplay = await $('id=dateDisplay');

        await $('id=pickDate').click();

        await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()').click();

        await $('android=new UiSelector().className("android.view.View").text("10")').click();

        await $('id=android:id/button1').click();

        // assertion
        // extract from dateDisplay the day of month
        const [month, day, year] = (await dateDisplay.getText()).split('-');
        await expect(day).toBe('10');
    })
})