const mongoose = require('mongoose');
 
const TrackerSchema= new mongoose.Schema({
  request_id : String,
  creation_time: String,
  last_update_time : String,
  status : String,
  admin_thread_message_id : String,
  admin_thread_message_text: String,
  active_chats: String,
  user_data : {
    type : Map,
    of : String
  }

});

const TrackerModel = mongoose.model('Tracker',TrackerSchema);

module.exports = {
    TrackerModel
  };