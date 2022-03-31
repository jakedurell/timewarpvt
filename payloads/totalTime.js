//win0divTR_WEEKLY_GRIDGP$0 for date range
// TASK_PROFILE_ID$0
//tdgbrTR_WEEKLY_GRID$0 to get time code count

(function () {
  var allCodeAllDayObject = {};
  var dateRangeString = $("iframe#ptifrmtgtframe")
    .contents()
    .find("#win0divTR_WEEKLY_GRIDGP\\$0")
    .html();

  console.log(dateRangeString);

  let timeCodeCount = $("iframe#ptifrmtgtframe")
    .contents()
    .find("#tdgbrTR_WEEKLY_GRID\\$0 tbody tr").length;

  for (let day = 1; day <= 14; day++) {
    for (let j = 0; j < timeCodeCount; j++) {
      let timeFieldCode = "#QTY_DAY" + day + "\\$" + j;
      let timeCode = $("iframe#ptifrmtgtframe")
        .contents()
        .find("#TASK_PROFILE_ID\\$" + j)
        .val();

      let hrsWorked = Number(
        $("iframe#ptifrmtgtframe").contents().find(timeFieldCode).val()
      );
      if (allCodeAllDayObject[timeCode]) {
        allCodeAllDayObject[timeCode].push(hrsWorked);
      } else {
        allCodeAllDayObject[timeCode] = [];
        allCodeAllDayObject[timeCode].push(hrsWorked);
      }
    }
  }
  console.log(allCodeAllDayObject);

  chrome.runtime.sendMessage(allCodeAllDayObject)

})();


