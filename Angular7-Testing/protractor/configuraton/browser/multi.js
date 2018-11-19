exports.config = {
    multiCapabilities: [{
        'browserName': 'firefox'
    }, {
        'browserName': 'chrome'
    }]
}


// Usage of multiple browsers
// browser.get('http://www.angular.io');
//
// // To create a new browser.
// var browser2 = browser.forkNewDriverInstance();
//
// var browser3 = browser.forkNewDriverInstance(true);