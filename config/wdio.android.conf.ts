const path = require('path');
import {config} from './wdio.shared.conf';

//
// ====================
// Runner Configuration
// ====================
// WebdriverIO supports running e2e tests as well as unit and component tests.
// config.protocol = 'http';
// config.hostname = '127.0.0.1';
// config.path = '/';
config.port = 4723;

// Test runner services
// Services take over a specific job you don't want to take care of. They enhance
// your test setup with almost no effort. Unlike plugins, they don't add new
// commands. Instead, they hook themselves up into the test process.
config.services = ['appium', 'visual'];


// ============
// Specify Test Files
// ============
config.specs = [
    '../test/specs/android/**/*.ts'
];


// ============
// Capabilities
// ============
config.capabilities = [
   {
        // capabilities for local Appium web tests on an Android Emulator
        platformName: 'Android',
        'appium:avd': 'Medium_Phone',
        'appium:avdLaunchTimeout': 180000,
        'appium:avdReadyTimeout': 180000,
        'appium:deviceName': 'Android GoogleAPI Emulator',
        'appium:platformVersion': '12.0',
        'appium:automationName': 'UiAutomator2',
        'appium:uiautomator2ServerLaunchTimeout': 120000,
        'appium:adbExecTimeout': 120000,
        'appium:app': path.join(process.cwd(), './app/android/ColorNote Notepad.apk'),
        'appium:autoGrantPermissions': true,
        'appium:autoAcceptAlerts': true,
        'appium:clearDeviceLogsOnStart': true
    } as any
]

exports.config = config;