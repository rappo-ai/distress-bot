const { get: getObjectProperty } = require('lodash/object');

const { add: addToDatabase, update: updateDatabase } = require('./database');
const { addRow, updateRow } = require('./google-sheets');

async function add(store_data) {
    
  await addToDatabase(store_data);
  await addRow(process.env.SPREADSHEET_ID, store_data);

}
  
async function update(request_id, update_data){
  
  const update_data_sheet = {
    status : update_data["status"],
    last_update_time : update_data["last_update_time"],
    ...getObjectProperty(update_data, `user_data`, {})
  };

  await updateDatabase(request_id, update_data);
  await updateRow(process.env.SPREADSHEET_ID, { key: "request_id", value: request_id }, update_data_sheet);

}

module.exports = {
  add,
  update,
};