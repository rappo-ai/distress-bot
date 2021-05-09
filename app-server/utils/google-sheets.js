const fs = require('fs').promises;
const { GoogleSpreadsheet } = require('google-spreadsheet');

const sheetCache = {};

async function createSpreadsheet(update, chat_tracker, global_store, bot_definition) {
  const ssid = process.env.SPREADSHEET_ID; // Spreadsheet ID

  const doc = new GoogleSpreadsheet(ssid);

  const creds = await fs.readFile("../client_secret.json", 'utf8');
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = await doc.sheetsByTitle[process.env.SHEET_NAME] || await doc.addSheet({ title: process.env.SHEET_NAME, headerValues: bot_definition.spreadsheet_keys });
  sheetCache[ssid] = { doc, sheet };
}

// add a row to the Spreadsheet with ssid value
async function addRow(ssid, dictionary) {
  const sheet = sheetCache[ssid]["sheet"];
  return sheet.addRow(dictionary);
}

module.exports = { createSpreadsheet, addRow };