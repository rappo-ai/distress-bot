const mongoose = require('mongoose');


const trackerSchema= new mongoose.Schema({
  last_update_time: String,
  srf_id: String,
  requirement: String,
  spo2: Number,
  needs_cylinder: String,
  covid_test_result: String,
  ct_scan_done: String,
  ct_score:Number,
  bed_type:String,
  bu_number: String,
  name: String,
  age: Number,
  gender: String,
  blood_group: String,
  mobile_number: Number,
  alt_mobile_number: String,
  address: String,
  hospital_preference: String,
  registered_1912_108: String,
  request_id: String,
  creation_time: String,
  forward_message: String,


  });
const Tracker = mongoose.model('Tracker',trackerSchema);


module.exports = {
    trackerSchema,
    Tracker
  };