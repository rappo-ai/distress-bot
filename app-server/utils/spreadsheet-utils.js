const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../client_secret.json'); // Authentication Credentials

const sheetCache = {};

function dateFormat(unixTs) {
    return new Date(unixTs).toLocaleString("en-GB",
        {
            timeZone: "Asia/Kolkata",
            year: 'numeric', month: 'short', day: 'numeric',
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        }
    );
}

async function createSpreadsheet(update, chat_tracker, global_store, bot_definition) {
    // TBD - initialization code (such as for spreadsheets)
    const ssid = process.env.SPREADSHEET_ID; // Spreadsheet ID

    const doc = new GoogleSpreadsheet(ssid);

    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // loads document properties and worksheets

    const sheet = await doc.sheetsByTitle[process.env.SHEET_NAME] || await doc.addSheet({ title: process.env.SHEET_NAME, headerValues: bot_definition.spreadsheet_keys });
    sheetCache[ssid] = { doc, sheet };
}

// add a row to the Spreadsheet with ssid value
async function addRow(ssid, dictionary) {
        const sheet = sheetCache[ssid]["sheet"]
        dictionary["date"] = dateFormat(new Date());
        dictionary["resolved"] = "No";
        const newRow = await sheet.addRow(dictionary);   
}

module.exports = { createSpreadsheet, addRow };