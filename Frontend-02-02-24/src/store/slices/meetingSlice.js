import { createSlice } from "@reduxjs/toolkit";
import { Create_meetings, Deletemeeting,fetchAllmeetings, updatemeeting } from "../actions/meetingActions";


let intialState = {
  loading: false,
  meetinglist:[],
  Allmeetinglist: [],
};

const meetingsSlice = createSlice({
  name: "meetings",
  initialState: intialState,
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllmeetings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllmeetings.fulfilled, (state, action) => {
        state.meetinglist = action.payload;
        state.Allmeetinglist = action.payload
        state.loading = false;
      })
      .addCase(fetchAllmeetings.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Deletemeeting.pending, (state) => {
        state.loading = true;
      })
      .addCase(Deletemeeting.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload)
        state.Allmeetinglist = state.Allmeetinglist.filter((meeting) => meeting._id !== action.payload._id);
        // console.log(state.Allmeetinglist)
      })
      .addCase(Deletemeeting.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(Create_meetings.pending, (state) => {
        state.loading = true;
      })
      .addCase(Create_meetings.fulfilled, (state, action) => {
        state.Allmeetinglist.push(action.payload)
        state.loading = false;
      })
      .addCase(Create_meetings.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updatemeeting.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatemeeting.fulfilled, (state, action) => {
        const { meeting_ID, updatedData } = action.payload;
        // console.log(meeting_ID,updatedData);
        // console.log(action.payload)
        const updatedmeetingIndex = state.Allmeetinglist.findIndex((meeting) => meeting._id === meeting_ID);
      
        if (updatedmeetingIndex !== -1) {
          const updatedmeeting = { ...state.Allmeetinglist[updatedmeetingIndex], ...updatedData };
          state.Allmeetinglist = [
            ...state.Allmeetinglist.slice(0, updatedmeetingIndex),
            updatedmeeting,
            ...state.Allmeetinglist.slice(updatedmeetingIndex + 1),
          ];
        }
      })
      .addCase(updatemeeting.rejected, (state, action) => {
        state.loading = true;
      })      
    // Add other cases if needed
  },
});

// export const { } = meetingsSlice.actions;
export default meetingsSlice.reducer;
