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
      console.log("data", data);
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
    csvString: ""
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
    async insertCsvVals(csvVals) {
      console.log("Sending payload with CSV vals");
      await chrome.tabs
        .executeScript(csvVals, { file: "payloads/insertCsvVals.js" })
    },
    async processCSV() {
      console.log("copyingCodes");
      console.log("this.csvString",this.csvString)

      let rowStrings = this.csvString.split("x");
      rowStrings.pop()
      console.log("rowStrings", rowStrings)
      let finalRows = []

      rowStrings.forEach((rowString) => {
        let rowObj = {}
        rowObj.reportingCode = rowString.split("\t")[0]
        rowObj.taskProfileId = rowString.split("\t")[1]
        rowObj.day1 = rowString.split("\t")[2]
        rowObj.day2 = rowString.split("\t")[3]
        rowObj.day3 = rowString.split("\t")[4]
        rowObj.day4 = rowString.split("\t")[5]
        rowObj.day5 = rowString.split("\t")[6]
        rowObj.day6 = rowString.split("\t")[7]
        rowObj.day7 = rowString.split("\t")[8]
        rowObj.day8 = rowString.split("\t")[9]
        rowObj.day9 = rowString.split("\t")[10]
        rowObj.day10 = rowString.split("\t")[11]
        rowObj.day11 = rowString.split("\t")[12]
        rowObj.day12 = rowString.split("\t")[13]
        rowObj.day13 = rowString.split("\t")[14]
        rowObj.day14 = rowString.split("\t")[15]

        finalRows.push(rowObj)
      })
      console.log(finalRows)


      chrome.storage.local.set({
        timeWarpRowsFromCsv: finalRows
      }, function () {
        chrome.tabs.executeScript(null, { file: "jquery.min.js" }, function () {
          chrome.tabs.executeScript({
            file: "./payloads/insertCsvVals.js"
          });
        });

      });



    },
  },
});


//Time Row Object
/*
[
  {
    reportingCode: "Hours Worked",
    taskProfileId: "EASTRAT",
    cashComp: "Cash"
    time: [ 14 data points]
  }
]
*/
