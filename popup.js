// const moment = require('moment');
Vue.config.devtools = true;
let timeFromPeopleSoft = {};

chrome.runtime.onMessage.addListener(function (enteredTimeRows) {
  timeFromPeopleSoft = enteredTimeRows;

});

/**
 * Replaces console.log() statements with a wrapper that prevents the extension from logging
 * to the console unless it was installed by a developer. This will keep the console clean; a
 * practice recommended for chrome extensions.
 *
 * @param {any} data Data to log to the console
 * @todo find a way to make this reusuable, then delete the duplicate fn() in popup.js
 */
function devLog(data) {
  // see https://developer.chrome.com/extensions/management#method-getSelf
  chrome.management.getSelf(function (self) {
    if (self.installType == "development") {
      console.log(data);
    }
  });
}

//Vue app
var app = new Vue({
  el: "#filing-app",
  data: {
    settings: {},
    saved: {},
    currentEnteredTime: timeFromPeopleSoft,
    timeCodeArrays: [],
  },
  methods: {
    async addTimeTotals() {
      console.log("adding time totals");
      await chrome.tabs
        .executeScript(null, { file: "payloads/totalTime.js" })

    },
    async copyCodes() {
      console.log("copyingCodes");
      await chrome.tabs
        .executeScript(null, { file: "payloads/copyCodes.js" })
    },
  },
});
