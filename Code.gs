/**********************************************************************
 * HISAB-KHATA — Google Apps Script backend
 * Connects the GitHub website to your Google Sheet (acts as the database)
 *
 * SETUP (one time):
 *  1. Create a Google Sheet. In row 1 of "Sheet1" put these headers
 *     (exactly, in this order):
 *        id | date | member | flow | category | amount | note
 *  2. In the Sheet menu: Extensions > Apps Script. Delete any code,
 *     paste THIS whole file, and Save.
 *  3. Click Deploy > New deployment > type "Web app".
 *        - Execute as:  Me
 *        - Who has access:  Anyone
 *     Deploy, authorise, and COPY the Web app URL.
 *  4. Paste that URL into CONFIG.APPS_SCRIPT_URL in index.html.
 *
 * Re-deploy (Deploy > Manage deployments > edit > Deploy) after any
 * code change so the new version goes live.
 **********************************************************************/

var SHEET_NAME = "Sheet1";
var HEADERS = ["id", "date", "member", "flow", "category", "amount", "note"];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  // ensure headers exist
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
  return sh;
}

/* ---- READ: GET ?action=list ---- */
function doGet(e) {
  try {
    var sh = getSheet_();
    var values = sh.getDataRange().getValues();
    var out = [];
    for (var r = 1; r < values.length; r++) {
      var row = values[r];
      if (!row[0]) continue;
      out.push({
        id: String(row[0]),
        date: formatDate_(row[1]),
        member: row[2],
        flow: row[3],
        category: row[4],
        amount: Number(row[5]) || 0,
        note: row[6] || ""
      });
    }
    return json_({ ok: true, data: out });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/* ---- WRITE: POST {action:"add", entry:{...}} ---- */
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.action === "add" && body.entry) {
      var en = body.entry;
      var sh = getSheet_();
      sh.appendRow([
        en.id || String(Date.now()),
        en.date || "",
        en.member || "",
        en.flow || "",
        en.category || "",
        Number(en.amount) || 0,
        en.note || ""
      ]);
      return json_({ ok: true });
    }
    return json_({ ok: false, error: "Unknown action" });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function formatDate_(d) {
  if (d instanceof Date) {
    return Utilities.formatDate(d, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  return String(d || "");
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
