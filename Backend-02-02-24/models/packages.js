const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
  Teacher_IDs: [
    {
    type: mongoose.Types.ObjectId,
    ref: "teacher",
    }
  ],
  Course_IDs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "courses",
    },
  ],
  Student_ID:{
    type:mongoose.Types.ObjectId,
    ref:"student",
  },
  Package_Name:{
    type:String,
    required:true,
  },
  Package_Amount: {
    type: Number,
    required: true,
  },
  Number_of_Lectures: {
    type: Number,
    required: true,
  }
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
