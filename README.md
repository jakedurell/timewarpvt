# Timewarp

This project originated as a way to allow state workers to more easily complete their timesheets.

## Setup for local development - Manifest 3

If you are a programmer and are interested in how the extension works, it's easy to run locally too. For more information on how you can pitch in (because that would be super helpful) visit the `#expunge-vt` channel in [Code for BTV's Slack](http://cfbtv-slackin.herokuapp.com/).

1. Clone the github repo, navigate to the `extensionDirectory` folder and run "npm install".

1. Open [chrome://extensions/](chrome://extensions/) on your chrome browser.

1. Use NVM install or similar app to ensure you are using node 19.2.0.

1. cd into extension directory, and run the following:
   - npm install
   - npm run build

1. Ensure "Developer mode" is switched on in the top right of the screen.

1. Select `Load unpacked` from the top left, and select the `extensionDirectory/build` folder from the project folder.

1. Open your timesheet in your browser.

1. While viewing the sample docket page, click the chrome extension icon to begin using the exention.

1. Familiarlize yourself with [how chrome extensions work](./README_EXTENSIONS_OVERVIEW.md).

## Contact Us

This tool was created by Jacob Durell.

Please send questions, comments, or feedback to jacob.durell@vermont.gov
