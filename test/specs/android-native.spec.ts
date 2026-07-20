describe('Android Native Feature Tests', () => {
    it('Access an Actitivy directly', async () => {
        await driver.startActivity(
            "io.appium.android.apis",
            "io.appium.android.apis.app.AlertDialogSamples");


        // Debug pause screen 3s
        await driver.pause(3000);


        // Assertion
        await expect($('//*[@text="App/Alert Dialogs"]')).toBeExisting ();

    })
})