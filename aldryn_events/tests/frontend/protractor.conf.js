/*!
 * @author:    Divio AG
 * @copyright: http://www.divio.ch
 */

'use strict';
/* global browser */

// #############################################################################
// CONFIGURATION
var baseConf = require('./base.conf');
var formatTaskName = baseConf.formatTaskName;
var browsers = baseConf.sauceLabsBrowsers;

var config = {
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path': require('phantomjs').path
    },

    onPrepare: function () {
        // Set Angular site flag to disable Angular-specific features
        browser.ignoreSynchronization = true;
    },

    // Name of the process executing this capability.  Not used directly by
    // protractor or the browser, but instead pass directly to third parties
    // like SauceLabs as the name of the job running this test
    name: 'aldryn-events integration tests',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 240000
    }

};

if (process.env.CI || process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
    config.capabilities = null;
    config.sauceUser = process.env.SAUCE_USERNAME;
    config.sauceKey = process.env.SAUCE_ACCESS_KEY;
    config.multiCapabilities = Object.keys(browsers).map(function (key) {
        var browserCapability =  browsers[key];
        browserCapability['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER;
        browserCapability.name = formatTaskName(browserCapability.browserName);
        return browserCapability;
    });
}

exports.config = config;
