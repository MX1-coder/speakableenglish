const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  Note_for_teacher: {
    type: String,
    required: true,
  },
  Student_ID: {
    type: mongoose.Types.ObjectId,
    ref: 'student',
  },
  Package_ID: {
    type: mongoose.Types.ObjectId,
    ref:'Package',
  },
  Teacher_ID: {
    type: mongoose.Types.ObjectId,
    ref: 'teacher',
  },
  Meeting_ID: {
    type: mongoose.Types.ObjectId,
    ref: 'Meeting',
  },
  Status: {
    type: String,
    require: true,
  },
  Scheduled_Date: {
    type: String,
    require: true,
  },
  Time_Slot: {
    Start_time: {
      type: String,
      require: false,
    },
    End_time: {
      type: String,
      require: false,
    },
  },
});

const bookings = mongoose.model('bookings', bookingSchema);
module.exports = bookings;
