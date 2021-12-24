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
      $("iframe#ptifrmtgtframe").contents().find(timeFieldCode).val('5')
      if (allCodeAllDayObject[timeCode]) {
        allCodeAllDayObject[timeCode].push(hrsWorked);
      } else {
        allCodeAllDayObject[timeCode] = [];
        allCodeAllDayObject[timeCode].push(hrsWorked);
      }
    }
  }
  console.log(allCodeAllDayObject);

  /// Add total row
  $("iframe#ptifrmtgtframe")
    .contents()
    .find("#ftrTR_WEEKLY_GRID\\$0_row13")
    .after(getTotalRow());
})();

function getTotalRow() {
  let blob =
    '<tr id="ftrTR_WEEKLY_GRID$0_row13">' +
    '<td align="right" style="white-space: nowrap;" height="25" class="PSLEVEL1GRIDODDROW PSGRIDFIRSTCOLUMN">' +
    '<div id="win0divQTY_DAY1$12"><input type="text" name="QTY_DAY1$12" id="QTY_DAY1$12" tabindex="900" value="" class="PSEDITBOX" style="width:87px; text-align:right; " maxlength="20"></div>' +
    "</td></tr>";

  return blob;
}
