const mongoose = require('mongoose');
 
const {spreadsheet_headers}=require('../../runtimes/telegram/bot-definition');

const TrackerSchema= new mongoose.Schema;

const headers={};
spreadsheet_headers.forEach(function(header) {
  headers[header]=String;
  
})
TrackerSchema.add(headers); 

const TrackerModel = mongoose.model('Tracker',TrackerSchema);

module.exports = {
    TrackerModel
  };
 