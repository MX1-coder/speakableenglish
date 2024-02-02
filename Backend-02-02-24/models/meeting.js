const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema({
  Atande_ID: [{
    type:mongoose.Types.ObjectId,
    ref:["student","admin","user","teacher"],
  }],
  Teacher_ID: [{
    type:mongoose.Types.ObjectId,
    ref:"teacher"
  }],
  Joining_Url: {
    type: String,
  },
  Status: {
    type: String,
    required: true,
  },
  Created_By: [{
    type:mongoose.Types.ObjectId,
    ref:["student","admin","user","teacher"],
  }],
});

const Meeting = mongoose.model('Meeting', meetingSchema);
module.exports = Meeting;
