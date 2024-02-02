const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
  Message: {
    type: String,
    required: true,
  },
  Student_ID: {
    type:mongoose.Types.ObjectId,
    ref:"student"
  },
  Teachers_ID: {
    type:mongoose.Types.ObjectId,
    ref:"teacher"
  },
  Rating: {
    type: Number,
    required: true,
  },
  Booking_ID: {
    type:mongoose.Types.ObjectId,
    ref:"booking"
  },
});

const feedbacks = mongoose.model('feedbacks', feedbackSchema);
module.exports = feedbacks;
