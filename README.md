# WebdriverIO + Appium Mobile Automation

A mobile automation test framework built with WebdriverIO, Appium and TypeScript. This project demonstrates practical QA automation for Android and iOS mobile apps using local Appium execution and BrowserStack cloud validation.

---

## What this project includes

- End-to-end mobile automation using WebdriverIO v9
- Appium for Android and iOS automation
- TypeScript-based tests with strict typing
- Mocha test framework with `expect-webdriverio` assertion library
- Local Android emulator execution
- BrowserStack-based iOS execution
- Screen object design for reusable page abstractions
- Clean shared configuration and platform-specific config separation

---

## Key features

### Android automation
- Skips tutorial/onboarding flow
- Creates and saves a note in the ColorNote app
- Verifies note content using deep and partial match assertions
- Deletes a note and validates deletion flow

### iOS automation
- Uses BrowserStack for remote iOS device testing
- Demonstrates screen object pattern for a Todo List screen
- Shows how to keep test code modular and easy to maintain

### Quality practices
- Shared WebdriverIO config in `config/wdio.shared.conf.ts`
- Android config in `config/wdio.android.conf.ts`
- iOS BrowserStack config in `config/wdio.ios.conf.ts`
- Screen object abstraction in `test/screenobjects/ios/list.screen.ts`
- Strict TypeScript settings enabled in `tsconfig.json`

---

## Repository structure

- `app/android/` — Android APK used for local automation
- `config/` — WebdriverIO and Appium configuration
  - `wdio.shared.conf.ts`
  - `wdio.android.conf.ts`
  - `wdio.ios.conf.ts`
- `test/`
  - `specs/` — test cases
  - `screenobjects/` — screen/page objects
- `package.json` — project dependencies and scripts
- `tsconfig.json` — TypeScript compiler configuration

---

## Setup

1. Install dependencies:

```bash
npm install
```

2. Ensure Appium is installed and available for local Android execution.

3. Ensure the Android emulator is configured and the APK exists at:

```text
app/android/ColorNote Notepad.apk
```

---

## Run Android tests

```bash
npx wdio run ./config/wdio.android.conf.ts
```

---

## Run iOS tests on BrowserStack

Create a `.env` file in the repository root:

```env
BROWSERSTACK_USERNAME=your_browserstack_username
BROWSERSTACK_ACCESS_KEY=your_browserstack_access_key
BROWSERSTACK_APP_ID=your_browserstack_app_id
```

Then run:

```bash
npx wdio run ./config/wdio.ios.conf.ts
```

---

## What this demonstrates

- Practical mobile automation across Android and iOS platforms
- A maintainable test structure using screen object pattern and shared configs
- Modern TypeScript + WebdriverIO + Mocha automation with explicit assertions
- Real app behavior validation rather than only happy-path checks
- A solid foundation for adding more mobile test scenarios or CI support