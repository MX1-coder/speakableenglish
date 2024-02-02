import { createSlice } from "@reduxjs/toolkit";
import { Create_Enquiry, Delete_Enquiry, FetchAll_Enquiry, Fetch_Student_Enquiry } from "../actions/enquiryActions";


let intialState = {
  enquirylist:[],
  enquiryDetails:[],
  Student_Enquiry:[],
  loading: false,
};

const enquirySlice = createSlice({
  name: "enquiry",
  initialState: intialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(Delete_Enquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(Delete_Enquiry.fulfilled, (state, action) => {
        // state.enquirylist = action.payload
        state.loading = false;
      })
      .addCase(Delete_Enquiry.rejected, (state) => {
        state.loading = false;
      })
      .addCase(FetchAll_Enquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchAll_Enquiry.fulfilled, (state, action) => {
        state.enquirylist = action.payload
        state.loading = false;
      })
      .addCase(FetchAll_Enquiry.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Create_Enquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(Create_Enquiry.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(Create_Enquiry.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Fetch_Student_Enquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(Fetch_Student_Enquiry.fulfilled, (state, action) => {
        state.Student_Enquiry = action.payload
        state.loading = false;
      })
      .addCase(Fetch_Student_Enquiry.rejected, (state) => {
        state.loading = false;
      })
      
  },
});

// export const { } = coursesSlice.actions;
export default enquirySlice.reducer;
