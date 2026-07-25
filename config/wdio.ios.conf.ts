import {config} from './wdio.shared.conf';
require('dotenv').config();

//
// ====================
// Runner Configuration
// ====================
// WebdriverIO supports running e2e tests as well as unit and component tests.
config.protocol = 'https';
config.hostname = 'hub.browserstack.com';
config.path = '/wd/hub';
config.port = 443;

// Test runner services
// Services take over a specific job you don't want to take care of. They enhance
// your test setup with almost no effort. Unlike plugins, they don't add new
// commands. Instead, they hook themselves up into the test process.
config.services = ['browserstack'];

// BrowserStack auth
config.user = process.env.BROWSERSTACK_USERNAME;
config.key = process.env.BROWSERSTACK_ACCESS_KEY;


// ============
// Specify Test Files
// ============
// /**/ mean Searches the ios folder and all of its subfolders.
config.specs = [
    '../test/specs/ios/*item-screen*.ts'
];

// ============
// Capabilities
// ============
config.capabilities = [
    {
        platformName: 'iOS',
        'appium:automationName': 'XCUITest',
        'appium:deviceName': 'iPhone 14 Pro Max',
        'appium:platformVersion': '16',
        'appium:app': process.env.BROWSERSTACK_APP_ID,
        'bstack:options': {
            projectName: 'BrowserStack Samples',
            buildName: 'browserstack build',
            sessionName: 'BStack iOS'
        }
    } as any
]

exports.config = config;