const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../client_secret.json'); // Authentication Credentials
// import { createSpreadsheet, diag } from 'spreadsheet-utils.js';
sheetCache = {};

function checkCache(){

}

export async function initSpreadsheet(update, chat_tracker, global_store, bot_definition) {
    // TBD - initialization code (such as for spreadsheets)
    const ssid = process.env.SPREADSHEET_ID // Spreadsheet ID
    const doc = new GoogleSpreadsheet(ssid);
    sheetCache[ssid]["spreadsheet"] = doc;
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // loads document properties and worksheets

    // bot_definition.spreadsheet_keys contains the spreadhseet headers
    const sheet = await doc.sheetsByTitle[process.env.SHEET_NAME] ? await doc.sheetsByTitle[process.env.SHEET_NAME] : await doc.addSheet({ title: process.env.SHEET_NAME, headerValues: bot_definition.spreadsheet_keys });
    sheetCache[ssid]["sheet"] = sheet;
}

// add a row to the Spreadsheet with ssid value
export async function addRow(ssid, dictionary){
  
    const doc = new GoogleSpreadsheet(ssid);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // loads document properties and worksheets
    
    // calls sheet object named SHEET_NAME
    const sheet = // await doc.sheetsByTitle[process.env.SHEET_NAME];
  
    // attaches datetime stamp and marks case as unresolved (since its just added)
    dictionary["date"] = new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
    dictionary["resolved"] = "No";
    
    const newRow = await sheet.addRow(dictionary); 
  
    // console.log(dictionary["name"]+ " added successfully to spreadsheet. RFID of the person: "+ dictionary["covid_test_srf"]);
  
  }