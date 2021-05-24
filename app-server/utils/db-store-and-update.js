const {spreadsheet_headers}=require('../runtimes/telegram/bot-definition');
const {TrackerModel}=require('../db/schema/trackerSchema');
const logger = require('../logger');
 
async function storeInDatabase(store_data){

  const object_headers=[ "request_id" , "creation_time", "last_update_time", "status", "admin_thread_message_id", "admin_thread_message_text", "active_chats" ];
  const user_headers=spreadsheet_headers.filter(function(header){
    return object_headers.indexOf(header) === -1;

  })
  
  const user_data = {};
  user_headers.forEach(function(item){
    user_data[item]=store_data[item];
  })
  
  const tracker = {};
  object_headers.forEach(function(item){
    tracker[item]=store_data[item];
  })
  tracker["user_data"]=user_data;

  const saved_tracker = new TrackerModel(tracker);
  await saved_tracker.save().then(() => logger.info('tracker saved to database'))
.catch(error => { 
  return logger.error(error);});

}

async function updateInDatabase(request_id,update_data){
   
  const filter = { request_id : `${request_id}` };
  await TrackerModel.findOneAndUpdate(filter,update_data,(err)=>{
    if(err){
      return logger.error(err);
    }
    else{
      logger.info('tracker updated');
    }
  });

}

module.exports = {
  storeInDatabase,
  updateInDatabase
};