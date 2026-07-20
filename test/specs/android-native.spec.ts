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
})