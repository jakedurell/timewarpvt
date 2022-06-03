//win0divTR_WEEKLY_GRIDGP$0 for date range
// TASK_PROFILE_ID$0
//tdgbrTR_WEEKLY_GRID$0 to get time code count

;(async function () {
    await chrome.storage.local.get('timeWarpRowsFromCsv', function (csvObjs) {
        var allTimeCodes = []
        var allProfilesIds = []

        var dateRangeString = $('iframe#ptifrmtgtframe')
            .contents()
            .find('#win0divTR_WEEKLY_GRIDGP\\$0')
            .html()

        console.log(`Current date range: & ${dateRangeString}`)

        let timeCodeCount = $('iframe#ptifrmtgtframe')
            .contents()
            .find('#tdgbrTR_WEEKLY_GRID\\$0 tbody')
            .children().length
        console.log(timeCodeCount)
        console.log(`timeCodeCount: ${timeCodeCount}`)

        let csvCount = csvObjs.timeWarpRowsFromCsv.length
        console.log(`csvCount: ${csvCount}`)

        if (timeCodeCount > csvCount) {
            alert(
                'please reduce the number of rows to ' &
                    csvObjs.length &
                    ' before continuing'
            )
        } else if (timeCodeCount < csvCount) {
            console.log(`Need to add ${csvCount - timeCodeCount} rows`)
            let rowsToAdd = csvCount - timeCodeCount
            alert(`You have ${rowsToAdd} more rows to add`)
            window.frames[0].document.getElementById('ADD_PB$0').click()
        }
        // console.log(
        //     $('iframe#ptifrmtgtframe')
        //         .contents()
        //         .find('#tdgbrTR_WEEKLY_GRID\\$0 tbody tr')
        // )

        // console.log(
        //     $('iframe#ptifrmtgtframe')
        //         .contents()
        //         .find('#trTR_WEEKLY_GRID\\$0_row1')
        //         .children()
        //         .eq(2)
        //         .find('span')
        //         .html()
        //         .toString()
        // )
        // for (let i = 1; i <= timeCodeCount; i++) {
        //     let reportingCodeRow = '#ftrTR_WEEKLY_GRID\\$0_row' + i
        //     let reportingCode = $('iframe#ptifrmtgtframe')
        //         .contents()
        //         .find(reportingCodeRow)
        //         .children()
        //         .eq(15)
        //         .find('span')
        //         .html()
        //         .toString()
        //     allTimeCodes.push(reportingCode)

        //     let taskProfileRow = '#trTR_WEEKLY_GRID\\$0_row' + i
        //     let profileId = $('iframe#ptifrmtgtframe')
        //         .contents()
        //         .find(taskProfileRow)
        //         .children()
        //         .eq(2)
        //         .find('span')
        //         .html()
        //         .toString()
        //     allProfilesIds.push(profileId)
        // }

        // console.log(allProfilesIds)
        // console.log(allTimeCodes)
    })
})()
