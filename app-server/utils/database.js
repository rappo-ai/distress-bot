const { set: setObjectProperty } = require('lodash/object');

const {TrackerModel}=require('../db/schema/trackerSchema');
const logger = require('../logger');
const {spreadsheet_headers}=require('../runtimes/telegram/bot-definition');

 
async function add(store_data){

  const object_headers=[ "request_id" , "creation_time", "last_update_time", "status", "admin_thread_message_id", "admin_thread_message_text", "active_chats" ];
  const user_headers=spreadsheet_headers.filter( header => {
    return object_headers.indexOf(header) === -1;

  })
  
  const user_data = {};
  user_headers.forEach( item => {
    setObjectProperty(user_data, `${item}`, store_data[item]);
  })

  const tracker = {};
  object_headers.forEach( item => {
    setObjectProperty(tracker, `${item}`, store_data[item]);
  })
  setObjectProperty(tracker, `user_data`, user_data);

  const saved_tracker = new TrackerModel(tracker);
  await saved_tracker.save().then(() => logger.info('tracker saved to database'))
.catch(error => { 
  return logger.error(error);});

}

async function update(request_id, update_data){
   
  const filter = { request_id };
  await TrackerModel.findOneAndUpdate(filter, update_data, (err) => {
    if(err){
      return logger.error(err);
    }
    else{
      logger.info('tracker updated');
    }
  });

}

module.exports = {
  add,
  update
};