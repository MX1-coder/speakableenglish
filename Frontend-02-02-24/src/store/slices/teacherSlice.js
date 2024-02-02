import { createSlice } from "@reduxjs/toolkit";
import { AddNewTeacher, DeleteTeacher, fetch1teacher, fetch5Teachers,fetchTeacherDetails,GetTeachers, imageUpload, Signup_Teacher_By_Admin, Update_Teacher_By_Availability, updateTeacher } from "../actions/teachersActions";

let intialState = {
  Teacherslist:[],
  TeacherDetails:[],
  AllTeacherlist:[],
  Teacher:[],
  Teacher_Bookings:[],
  loading: false,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState: intialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch5Teachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetch5Teachers.fulfilled, (state, action) => {
        state.Teacherslist = action.payload
        state.loading = false;
      })
      .addCase(fetch5Teachers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchTeacherDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeacherDetails.fulfilled, (state, action) => {
        state.TeacherDetails = action.payload
        state.loading = false;
      })
      .addCase(fetchTeacherDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetch1teacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetch1teacher.fulfilled, (state, action) => {
        state.Teacher = action.payload
        state.loading = false;
      })
      .addCase(fetch1teacher.rejected, (state) => {
        state.loading = false;
      })
      .addCase(GetTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetTeachers.fulfilled, (state, action) => {
        state.Teacherslist = action.payload;
        state.AllTeacherlist = action.payload
        state.loading = false;
      })
      .addCase(GetTeachers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(AddNewTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddNewTeacher.fulfilled, (state, action) => {
        state.Teacherslist = action.payload;
        state.AllTeacherlist.push(action.payload)
        state.loading = false;
      })
      .addCase(AddNewTeacher.rejected, (state) => {
        state.loading = false;
      })
      .addCase(imageUpload.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(imageUpload.rejected, (state) => {
        state.loading = false;
      })
      .addCase(DeleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.AllTeacherlist = state.AllTeacherlist.filter((teacher) => teacher.id !== action.payload);
      })
      .addCase(DeleteTeacher.rejected, (state, action) => {
        // state.status = 'failed';
        state.loading = false;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        const {teacherId, updatedData} = action.payload;
        const updatedTeacherIndex = state.AllTeacherlist.findIndex((teacher) => teacher._id === teacherId);
      
        if (updatedTeacherIndex !== -1) {
          const updatedTeacher = { ...state.AllTeacherlist[updatedTeacherIndex], ...updatedData };
          state.AllTeacherlist = [
            ...state.AllTeacherlist.slice(0, updatedTeacherIndex),
            updatedTeacher,
            ...state.AllTeacherlist.slice(updatedTeacherIndex + 1),
          ];
        }
      
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(Update_Teacher_By_Availability.fulfilled, (state, action) => {
        const {teacherId, updatedData} = action.payload;
        const updatedTeacherIndex = state.AllTeacherlist.findIndex((teacher) => teacher._id === teacherId);
      
        if (updatedTeacherIndex !== -1) {
          const updatedTeacher = { ...state.AllTeacherlist[updatedTeacherIndex], ...updatedData };
          state.AllTeacherlist = [
            ...state.AllTeacherlist.slice(0, updatedTeacherIndex),
            updatedTeacher,
            ...state.AllTeacherlist.slice(updatedTeacherIndex + 1),
          ];
        }
      
      })
      .addCase(Update_Teacher_By_Availability.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(Signup_Teacher_By_Admin.pending, (state) => {
        state.loading = true;
      })
      .addCase(Signup_Teacher_By_Admin.fulfilled, (state, action) => {
        state.Teacherslist = action.payload;
        state.AllTeacherlist.push(action.payload)
        state.loading = false;
      })
      .addCase(Signup_Teacher_By_Admin.rejected, (state) => {
        state.loading = false;
      })
  },
});

// export const { } = teacherSlice.actions;
export default teacherSlice.reducer;
