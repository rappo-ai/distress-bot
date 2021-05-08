const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../client_secret.json'); // Authentication Credentials

// sheetCache = {};

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
    const ssid = process.env.SPREADSHEET_ID // Spreadsheet ID
    // console.log(ssid);
    const doc = new GoogleSpreadsheet(ssid);
    // console.log(dateFormat((new Date())))
    // console.log(new Date().toLocaleString("en-IN", { timeZone: 'Asia/Kolkata' }))
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // loads document properties and worksheets
    // sheetCache[ssid]["spreadsheet"] = doc;
    // bot_definition.spreadsheet_keys contains the spreadhseet headers
    const sheet = await doc.sheetsByTitle[process.env.SHEET_NAME] ? await doc.sheetsByTitle[process.env.SHEET_NAME] : await doc.addSheet({ title: process.env.SHEET_NAME, headerValues: bot_definition.spreadsheet_keys });
    // sheetCache[ssid]["sheet"] = sheet;
}

// add a row to the Spreadsheet with ssid value
async function addRow(ssid, dictionary) {

    const doc = new GoogleSpreadsheet(ssid);
    // const doc = sheetCache[ssid]["spreadsheet"];
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // loads document properties and worksheets

    // calls sheet object named SHEET_NAME
    // const sheet = sheetCache[ssid]["sheet"]
    // try {
    //     const sheet = await doc.sheetsByTitle[process.env.SHEET_NAME];
    // }
    // catch (e) {
    //     const sheet = await doc.addSheet({ title: process.env.SHEET_NAME, headerValues: bot_definition.spreadsheet_keys });
    // }

    // const sheet = await doc.sheetsByTitle[process.env.SHEET_NAME] ? await doc.sheetsByTitle[process.env.SHEET_NAME] : await doc.addSheet({ title: process.env.SHEET_NAME, headerValues: bot_definition.spreadsheet_keys });
    const sheet = await doc.sheetsByTitle[process.env.SHEET_NAME]

    // attaches datetime stamp and marks case as unresolved (since its just added)
    // dictionary["date"] = new Date().toLocaleString("en-IN", { timeZone: 'Asia/Kolkata' });
    dictionary["date"] = dateFormat(new Date())
    dictionary["resolved"] = "No";

    const newRow = await sheet.addRow(dictionary);


    // console.log(dictionary["name"]+ " added successfully to spreadsheet. RFID of the person: "+ dictionary["covid_test_srf"]);

}

module.exports = { createSpreadsheet, addRow };