import { createSlice } from "@reduxjs/toolkit";
import { CreatePackage, Delete_Package, GetPackageByTeacherID,  fetchAllpackages, fetchPackage, updatePackage } from "../actions/packagesActions";



let intialState = {
  packageslist:[],
  packageDetails:[],
  currentPackage:[],
  Teacher_Packages:[],
  // hash:[],
  // Student_Packages:[],
  loading: false,
};

const packageSlice = createSlice({
  name: "package",
  initialState: intialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(Delete_Package.pending, (state) => {
        state.loading = true;
      })
      .addCase(Delete_Package.fulfilled, (state, action) => {
        // state.enquirylist = action.payload
        state.loading = false;
      })
      .addCase(Delete_Package.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAllpackages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllpackages.fulfilled, (state, action) => {
        state.packageslist = action.payload
        state.loading = false;
      })
      .addCase(fetchAllpackages.rejected, (state) => {
        state.loading = false;
      })
      .addCase(CreatePackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreatePackage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(CreatePackage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updatePackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updatePackage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchPackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPackage.fulfilled, (state, action) => {
        state.currentPackage = action.payload
        state.loading = false;
      })
      .addCase(fetchPackage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(GetPackageByTeacherID.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetPackageByTeacherID.fulfilled, (state, action) => {
        state.Teacher_Packages = action.payload
        state.loading = false;
      })
      .addCase(GetPackageByTeacherID.rejected, (state) => {
        state.loading = false;
      })
      // .addCase(GetPackageByStudentID.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(GetPackageByStudentID.fulfilled, (state, action) => {
      //   state.Student_Packages = action.payload
      //   state.loading = false;
      // })
      // .addCase(GetPackageByStudentID.rejected, (state) => {
      //   state.loading = false;
      // })
      // .addCase(Gethash.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(Gethash.fulfilled, (state, action) => {
      //   state.hash = action.payload
      //   state.loading = false;
      // })
      // .addCase(Gethash.rejected, (state) => {
      //   state.loading = false;
      // })
      
  },
});

// export const { } = coursesSlice.actions;
export default packageSlice.reducer;
