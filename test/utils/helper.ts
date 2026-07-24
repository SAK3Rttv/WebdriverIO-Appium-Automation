export async function dynamicTap(element: any, xOffsetPercent = 0.5, yOffsetPercent = 0.5) {
    await element.waitForExist({ timeout: 5000 });

    // Fetch coordinates and size safely
    const location = await element.getLocation();
    const size = await element.getSize();

    // Calculate the target spot dynamically
    const targetX = Math.floor(location.x + (size.width * xOffsetPercent));
    const targetY = Math.floor(location.y + (size.height * yOffsetPercent));

    console.log(`[Bypassing Actions API] Tapping coordinates natively: X=${targetX}, Y=${targetY}`);

    // Native execution injects the click directly into the hardware layer without cleanup cycles
    await browser.executeScript('mobile: tap', [{
        x: targetX,
        y: targetY
    }]);
}