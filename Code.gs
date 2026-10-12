/**
 * WEDDING RSVP — Google Apps Script backend
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
