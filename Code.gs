/**
 * WEDDING RSVP — Google Apps Script backend
 *
 * SETUP:
 * 1. Go to https://sheets.google.com and create a new blank spreadsheet.
 *    Name it something like "Wedding RSVPs".
 * 2. In that sheet: Extensions > Apps Script.
 * 3. Delete any starter code and paste this entire file in.
 * 4. Click Deploy > New deployment.
 *    - Type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 5. Click Deploy, authorize the permissions when prompted.
 * 6. Copy the Web App URL it gives you.
 * 7. Paste that URL into index.html where it says
 *    const RSVP_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
 *
 * Every RSVP submission will appear as a new row in a sheet tab called "RSVPs"
 * (created automatically the first time someone submits).
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('RSVPs');

    if (!sheet) {
      sheet = ss.insertSheet('RSVPs');
      sheet.appendRow([
        'Timestamp', 'Name', 'Group', 'Language',
        'Attending', 'Afterparty Attending',
        'Dietary Notes', 'Message'
      ]);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.group || '',
      data.language || '',
      data.attending || '',
      data.afterpartyAttending || '',
      data.dietary || '',
      data.message || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: lets you sanity-check the deployment by visiting the Web App URL directly in a browser.
function doGet(e) {
  return ContentService.createTextOutput('Wedding RSVP endpoint is live.');
}
