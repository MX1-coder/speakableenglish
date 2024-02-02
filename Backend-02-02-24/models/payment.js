const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  Student_ID: {
    type: mongoose.Types.ObjectId,
    ref: "student"
  },
  Package_ID: {
    type: mongoose.Types.ObjectId,
    ref: "Package"
  },
  Purchase_Amount: {
    type: Number,
    required: true,
  },
  Booking_ID: {
    type: mongoose.Types.ObjectId,
    ref: "bookings"
  },
  Status: {
    type: String,
    required: true,
    enum: ["PENDING", "FULFILLED", "CANCELLED"]
  },
  Method: {
    type: String,
    required: true,
    enum: ["UPI", "CREDITCARD", "DEBITCARD"]
  },
}, {
  timestamps: true,
});

const payments = mongoose.model('payments', paymentSchema);
module.exports = payments;
