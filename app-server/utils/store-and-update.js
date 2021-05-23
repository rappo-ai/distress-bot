const { addRow, updateRow } = require('./google-sheets');
const { storeInDatabase, updateInDatabase } = require('./db-store-and-update');

async function storeInSheetAndDatabase(store_data) {
    
  await storeInDatabase(store_data);
  await addRow(process.env.SPREADSHEET_ID, store_data);

}
  
async function updateInSheetAndDatabase(request_id, update_data_sheet,update_data_database){
  
  await updateInDatabase(request_id,update_data_database);
  await updateRow(process.env.SPREADSHEET_ID, { key: "request_id", value: request_id }, update_data_sheet);

}

module.exports = {
  storeInSheetAndDatabase,
  updateInSheetAndDatabase,
};