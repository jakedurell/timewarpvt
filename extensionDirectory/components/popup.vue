<script>

export default {
  // el: '#filing-app',
  data() {
    return {
      settings: {},
      saved: {},
      currentEnteredTime: {},
      timeCodeArrays: [],
      csvString: ""
    }
  },
  mounted() {
    chrome.runtime.onMessage.addListener(function (enteredTimeRows) {
      currentEnteredTime = enteredTimeRows;
    });
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
      console.log("this.csvString", this.csvString)

      let rowStrings = this.csvString.split("x");
      rowStrings.pop()
      console.log("rowStrings", rowStrings)
      let finalRows = []

      rowStrings.forEach((rowString) => {
        let rowObj = {}
        rowObj.reportingCode = rowString.split("\t")[0].trim()
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
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          if (tabs.length === 0) return;

          let currentTabId = tabs[0].id;

          fetch(chrome.runtime.getURL("payloads/insertCsvVals.js"))
            .then(response => console.log("Insert File exists!", response))
            .catch(error => console.error("Inset File not found!", error));

          fetch(chrome.runtime.getURL("jquery.min.js"))
            .then(response => console.log("jquery File exists!", response))
            .catch(error => console.error("jquery File not found!", error));

          chrome.scripting.executeScript({ target: { tabId: currentTabId }, files: ["jquery.min.js"] }, function () {
            chrome.scripting.executeScript({
              target: { tabId: currentTabId },
              files: ["payloads/insertCsvVals.js"]
            });
          });
        })

      });



    },
  },
};
</script>

<template>
  <div id="filing-app">
    <div id="coverDiv" class="empty-state">
      <div class="popup-edition-wrap">
        <img class="logo-main" src="logo.png">
        <p class="popup-edition">timeWarpVt 1.0</p>
      </div>
      <p class="popup-edition authors">created by Durell, Saniyo, and Bovee</p>
      <div class="function-menu inset text-center button-div">
        <!-- <button v-on:click="addTimeTotals" class="popup-button btn btn-primary">
          Total it<i class="fas fa-plus-circle"></i>
        </button>
        <button v-on:click="" class="popup-button btn btn-primary">
          Squeeze<br /><i class="fas fa-file"></i>
        </button> -->
        <a id="" class="title-page__link" target="_blank"
          href="https://vthr.erp.state.vt.us/psp/HRPRD/?cmd=login&languageCd=ENG&">
          <p id="">
            <b>SoV Peoplesoft Time Entry <i class="fas fa-external-link-alt"></i></b>
          </p>
          <!-- <p>{{currentEnteredTime}}</p> -->
        </a>
        <div class="fav-box">
          <div class="csv-copy">
            <button v-on:click="processCSV" class="popup-button btn btn-primary">
              Paste CSV to Timesheet<br /><i class="fas fa-file"></i>
            </button>
            <input v-model="csvString" />
          </div>
          <br />
          <button v-on:click="copyCodes" class="popup-button btn btn-primary">
            Copy Codes from Completed Timesheet
            <br />
            <i class="fas fa-file"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  width: 475px;
  height: auto;
  box-sizing: border-box;
}

body:before {
  content: '';
  border: 2px solid grey;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  pointer-events: none;
}

button {
  outline: none;
}

.pet-label,
.pet-details {
  margin: 0;
}

#edit-petitioner {
  margin-left: 20px;
  height: 30px;
}

.pet-item .btn {
  padding: 0 1rem;
}

.pet-detail {
  padding: 0px 5px 0px 5px;
  word-break: break-all;
  width: 60%;
}

p.pet-detail {
  margin: 0;
}

.pet-item {
  display: flex;
  margin-top: 5px;
  align-items: baseline;
}

.pet-label {
  width: 100px;
  padding-left: 15px;
  font-size: 14px;
  font-weight: bold;
  font-family: Helvetica, Arial, sans-serif;
}

.pet-label-info {
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
  font-weight: bold;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  text-decoration: none;
}

.pet-label-info a,
.pet-label-info a:hover,
.pet-label-info a:link,
.pet-label-info a:active,
.pet-label-info a:visited {
  text-decoration: none;
}

.pet-label-info .card {
  display: block;
}

.fa-exclamation-triangle {
  color: red;
}

.pet-detail[contenteditable='true'] {
  outline: 1px solid black;
}

.count-cards {
  margin-bottom: 15px;
}

.accordion {
  white-space: normal;
  text-decoration: none !important;
}

.empty-state {
  width: 100%;
  height: 100%;
  background-color: white;
  /* position:fixed; */
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  top: 0;
  left: 0;
  border: 2px solid grey;
}

.inset {
  padding-left: 2px;
  padding-right: 2px;
}

#bottomText {
  position: relative;
  font-size: 0.75rem;
  z-index: 100;
}

.popTop {
  display: flex;
  flex-direction: row;
  width: 100%;
}

#defendantInfo {
  width: 70%;
}

#logoDiv {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-start;
  align-items: center;
  width: 25%;
}

#logoDiv .logos {
  width: 50px;
}

#logoDivCover {
  display: flex;
  flex-direction: row;
  align-content: center;
  text-align: center;
  width: 100%;
  margin-top: 40px;
}

#mainButtonDiv {
  position: relative;
  z-index: 0;
}

#code4btv {
  width: 20%;
  height: 20%;
  display: block;
  margin-left: 100px;
  margin-right: auto;
}

#legal-aid {
  width: 40%;
  height: 40%;
  display: block;
  margin-left: auto;
  margin-right: 60px;
}

#introText {
  margin-top: 10px;
  width: 80%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid grey;
}

.card-header__disposition-date {
  white-space: nowrap;
  font-size: 14px;
}

.title-page__link {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 70%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

#vtCourtsOnlineA {
  position: relative;
  z-index: 99;
}

.section-label {
  margin: 5px 10px;
  font-weight: bold;
}

hr {
  margin-top: 2px !important;
}

.dates-box {
  display: flex;
  flex-direction: row;
}

.single-date {
  outline: 1px solid blue;
  padding: 2px;
}

.card-body {
  padding: 2px !important;
  font-size: 14px;
  font-family: Helvetica, Arial, sans-serif;
}

.card-body p {
  display: flex;
  flex-direction: row;
  margin: 1px !important;
}

.card-body .table th,
.card-body .table td {
  padding: 4px;
}

.clear-data {
  width: 100px;
  margin-bottom: 3px;
  margin: 10px 5px 10px 5px;
  align-self: center;
}

.reset-settings {
  font-weight: 500;
  color: #777777;
  cursor: pointer;
}

.reset-settings:hover {
  color: #222222;
}

.button-div {
  display: flex;
  flex-direction: row;
  width: auto;
  justify-content: center;
  margin: 15px 10px 5px 10px;
  text-align: center;
}

.button-div button {
  margin: 5px;
}

.add-docket-info {
  width: 158px;
}

.create-documents {
  width: 250px;
}

/* Count Cards */
.card {
  margin-bottom: 0.5rem;
}

.card .card-header {
  padding: 0.5rem;
  -webkit-appearance: none;
  cursor: pointer;
}

.card-header__column {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.card-header__title-row {
  position: relative;
  display: flex;
  flex-direction: row;
  align-content: stretch;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  margin-bottom: 0.5rem;
}

.card-header__title-row p {
  margin-bottom: 0;
}

.card-header__title-row .btn {
  white-space: normal;
  text-align: left;
  padding: 0;
}

.card-header__meta-data {
  width: 55%;
  hyphens: auto;
}

.card-header__select {
  width: 45%;
  margin-left: 0.5rem;
}

.card-header__select select {
  width: 100%;
}

.card-header__bottom-row {
  display: flex;
  flex-direction: row;
}

.card-header__pills-row {
  display: flex;
  flex-direction: row;
  width: 95%;
  margin: 0;
}

.card-header__bottom-row i {
  color: Red;
}

.card-header__description {
  text-decoration: none !important;
  color: black !important;
}

.card-header__description.btn-link:hover {
  text-decoration: none !important;
  color: black !important;
}

/* Pills */

.pill {
  min-width: 50px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}

.pill.pill--rounded {
  border-radius: 500px;
  margin: 0;
  padding: 0;
  margin-right: 5px;
  padding: 0px 5px 0px 5px;
}

.pill.pill--outline-green {
  border: 2px solid #2fa54a;
  color: #2fa54a;
  background-color: transparent;
}

.pill.pill--outline-black {
  border: 2px solid #555;
  color: #555;
  background-color: transparent;
}

.fav-box {
  border: solid 2px #222222;
  max-width: 50%;
  min-height: 50px;
  margin: 10px auto 20px auto;
  position: relative;
}

.fav-box .btn-copy {
  font-weight: 800;
  font-family: 'open sans';
  margin: -20px 5px 5px 10px;
  position: absolute;
  top: 5px;
}

.csv-copy input {
  border: red 3px solid;
  height: 25px;
}

.function-menu {
  display: flex;
  flex-direction: column;
}

.popup-edition-wrap {
  margin: auto;
  width: 300px;
  font-weight: 800;
  font-family: 'open sans';
  font-size: 40px;
  display: flex;
  flex-direction: row;
}

.logo-main {
  max-width: 75px;
  margin: 10px;
}

.authors {
  margin: auto;
  width: 300px;
  text-align: center;
}
</style>