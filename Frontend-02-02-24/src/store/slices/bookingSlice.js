import { createSlice } from "@reduxjs/toolkit";
import { fetchAllbookings, Add_booking, Updatebooking, Deletebooking, GetBookingsByStudentID, GetBookingsByTeacherID } from "../actions/bookingActions";

let intialState = {
  loading: false,
  bookinglist:[],
  Allbookinglist:[],
  StudentID_Booking:[],
  Teacher_Bookings:[]
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: intialState,
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllbookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllbookings.fulfilled, (state, action) => {
        state.bookinglist = action.payload;
        state.Allbookinglist = action.payload
        state.loading = false;
      })
      .addCase(fetchAllbookings.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Add_booking.fulfilled, (state, action) => {
        // state.Allbookinglist = action.payload;
        // console.log(action.payload)
        state.Allbookinglist.push(action.payload)
        state.loading = false;
      })
      .addCase(Add_booking.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Deletebooking.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload)
        state.Allbookinglist = state.Allbookinglist.filter((Booking) => Booking._id !== action.payload._id);
      })
      .addCase(Deletebooking.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(Updatebooking.fulfilled, (state, action) => {
        const {BookingID, updatedData } = action.payload;
        // console.log(BookingID,updatedData);
        // console.log(action.payload)
        const updatedBookingIndex = state.Allbookinglist.findIndex((Booking) => Booking._id === BookingID);
      
        if (updatedBookingIndex !== -1) {
          const updatedBooking = { ...state.Allbookinglist[updatedBookingIndex], ...updatedData };
          state.Allbookinglist = [
            ...state.Allbookinglist.slice(0, updatedBookingIndex),
            updatedBooking,
            ...state.Allbookinglist.slice(updatedBookingIndex + 1),
          ];
        }
      })
      .addCase(Updatebooking.rejected, (state, action) => {
          state.loading = false;
          // state.error = action.error.message;
      })
      .addCase(GetBookingsByStudentID.fulfilled, (state, action) => {
        state.loading = false;
        state.StudentID_Booking = action.payload
      })
      .addCase(GetBookingsByStudentID.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(GetBookingsByTeacherID.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetBookingsByTeacherID.fulfilled, (state, action) => {
        state.Teacher_Bookings = action.payload;
        state.loading = false;
      })
      .addCase(GetBookingsByTeacherID.rejected, (state) => {
        state.loading = false;
      })
      
    // Add other cases if needed
  },
});

// export const { } = bookingSlice.actions;
export default bookingSlice.reducer;

