import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosconfig";



export const Delete_Enquiry = createAsyncThunk(
    "Enquiry/Delete_Enquiry",
    async (id) => {
      const response = await axios.get(`Delete_Enquiry_Student/${id}`);
      // console.log(response)
      return response.data.enquirylist
    }
);

export const FetchAll_Enquiry = createAsyncThunk(
    "Enquiry/FetchAll_Enquiry",
    async () => {
      const response = await axios.get(`getenquiries`);
      // console.log(response)
      return response.data
    }
);

export const Create_Enquiry = createAsyncThunk(
  "Enquiry/Create_Enquiry",
  async (data) => {
    const response = await axios.post(`Create_Enquiry`, data );
    // console.log(response)
    return response.data.enquirylist
  }
);

export const Fetch_Student_Enquiry = createAsyncThunk(
  "Enquiry/Fetch_Student_Enquiry",
  async (Email) => {
    const response = await axios.get(`Fetch_Enquiry_Student/${Email}`);
    // console.log(response)
    return response.data.Enquiry
  }
);

  
  