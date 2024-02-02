import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosconfig";


// ACTIONS : api calls
export const fetchAllpayments = createAsyncThunk(
  "payments/getpayments",
  async () => {
    const response = await axios.get(`getpayments`);
    // console.log(response)
    return response.data;
  }
);


export const Add_payment = createAsyncThunk(
    "payments/Add_payment",
    async () => {
    const response = await axios.post(`/Add_Payment`);
      // console.log(response.data)
      return response.data;
    }
  );

  export const Deletepayment = createAsyncThunk(
    'payments/Deletepayment',
     async (PaymentID) => {
     console.log(PaymentID)
      try {
        const response = await axios.get(`Delete_Payment/${PaymentID}`);
        // console.log(response);
        return response.data; 
      } catch (error) {
        console.log(error)
      }
  });


  export const Updatepayment = createAsyncThunk(
    'payments/Updatepayment',
     async ({ PaymentID, updatedData }) => {
     console.log(PaymentID)
     try {
      const response = await axios.post(`Update_Payment/${PaymentID}`, updatedData );
        // console.log(response.data);
        return response.data
        // return { student_ID, updatedData };
     } catch (error) {
      console.log(error.message);
     } 
  });

  export const GetPaymentsByStudentID = createAsyncThunk(
    "payments/GetPaymentsByStudentID",
    async (id) => {
      console.log(id)
      try {
        const response = await axios.get(`GetPaymentsByStudentID/${id}`);
        console.log(response);
        return response.data.Payments;
      } catch (error) {
        console.error("Error fetching meetings:", error);
        throw error; // Propagate the error to be caught by Redux Toolkit
      }
    }
  );
  

  





