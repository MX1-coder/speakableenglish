import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosconfig";


// ACTIONS : api calls
export const fetchAllmeetings = createAsyncThunk(
  "meetings/fetchAllmeetings",
  async () => {
    const response = await axios.get(`getmeetings`);
    // console.log(response);
    return response.data;
  }
);

export const Create_meetings = createAsyncThunk(
  "meetings/Create_meetings",
  async ({ CreatedBy_ID, formData}) => {
    console.log(CreatedBy_ID)
    try {
      // console.log(CreatedBy_ID,formData)
  const response = await axios.post(`Create_Meeting/${CreatedBy_ID}`, formData);
  // console.log(response);
  return response.data;
} catch (err) {
  console.log(err);
}
}
);

  export const Deletemeeting = createAsyncThunk(
    'meetings/Deletemeeting',
     async (meeting_ID) => {
      try {
        const response = await axios.get(`Delete_meeting/${meeting_ID}`);
        // console.log(response);
        return response.data.deletedmeeting; 
      } catch (error) {
        console.log(error)
      }
  });


  export const updatemeeting = createAsyncThunk(
    'meeting/updatemeeting',
     async ({ meeting_ID, updatedData }) => {
    // console.log(meeting_ID)
    try {
      const response = await axios.post(`Update_meeting/${meeting_ID}`, updatedData );
        // console.log(response.data);
        return response.data
        // return { student_ID, updatedData };
    } catch (error) {
      console.log(error.message);
    }
  });










