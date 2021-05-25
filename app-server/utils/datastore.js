const { get: getObjectProperty } = require('lodash/object');

const { add: addToDatabase, update: updateDatabase } = require('./database');
const { addRow, updateRow } = require('./google-sheets');

function getSheetData(store_data) {
  let sheet_data = Object.assign({}, store_data);
  if (sheet_data["request_data"]) {
    delete sheet_data["request_data"];
  }
  return Object.assign(sheet_data, { ...getObjectProperty(store_data, "request_data", {}) });
}

async function add(store_data) {
  await addToDatabase(store_data);
  await addRow(process.env.SPREADSHEET_ID, getSheetData(store_data));
}

async function update(request_id, store_data) {
  await updateDatabase(request_id, store_data);
  await updateRow(process.env.SPREADSHEET_ID, { key: "request_id", value: request_id }, getSheetData(store_data));
}

module.exports = {
  add,
  update,
};