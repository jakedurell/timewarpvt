//win0divTR_WEEKLY_GRIDGP$0 for date range
// TASK_PROFILE_ID$0
//tdgbrTR_WEEKLY_GRID$0 to get time code count

;(function () {
    var allTimeCodes = []
    var allProfilesIds = []

    var dateRangeString = $('iframe#ptifrmtgtframe')
        .contents()
        .find('#win0divTR_WEEKLY_GRIDGP\\$0')
        .html()

    console.log(dateRangeString)

    let timeCodeCount = $('iframe#ptifrmtgtframe')
        .contents()
        .find('#tdgbrTR_WEEKLY_GRID\\$0 tbody')
        .children().length

    console.log(
        $('iframe#ptifrmtgtframe')
            .contents()
            .find('#tdgbrTR_WEEKLY_GRID\\$0 tbody tr')
    )

    for (let i = 1; i <= timeCodeCount; i++) {
        let reportingCodeRow = '#ftrTR_WEEKLY_GRID\\$0_row' + i
        let taskProfileRow = '#trTR_WEEKLY_GRID\\$0_row' + i
        let reportingCodeRowElement = $('iframe#ptifrmtgtframe')
            .contents()
            .find(reportingCodeRow)
            .children()
            .eq(15)
            .find('span')
            .html()
        let taskProfileRowElement = $('iframe#ptifrmtgtframe')
            .contents()
            .find(taskProfileRow)
            .children()
            .eq(2)
            .find('span')
            .html()

        if (reportingCodeRowElement) {
            let reportingCode = reportingCodeRowElement.toString()
            allTimeCodes.push(reportingCode)
        }

        if (taskProfileRowElement) {
            let profileId = taskProfileRowElement.toString()
            allProfilesIds.push(profileId)
        }
    }

    if (allProfilesIds.length > 0) {
        let profileString = ''
        console.log(allProfilesIds)

        for (let i = 0; i < allProfilesIds.length; i++) {
            profileString += `${allProfilesIds[i].toString()}\n`
            console.log(profileString)
        }
        //Create a textbox field where we can insert text to.
        var copyFrom = document.createElement('textarea')

        //Set the text content to be the text you wished to copy.
        copyFrom.textContent = profileString

        //Append the textbox field into the body as a child.
        //"execCommand()" only works when there exists selected text, and the text is inside
        //document.body (meaning the text is part of a valid rendered HTML element).
        document.body.appendChild(copyFrom)

        //Select all the text!
        copyFrom.select()

        //Execute command
        document.execCommand('copy')

        //(Optional) De-select the text using blur().
        copyFrom.blur()

        //Remove the textbox field from the document.body, so no other JavaScript nor
        //other elements can get access to this.
        document.body.removeChild(copyFrom)
    }

    console.log(allProfilesIds)
    console.log(allTimeCodes)
    alert(`${allProfilesIds.length} profile IDs have been copied.`)
})()
