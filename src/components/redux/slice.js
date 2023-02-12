import { createSlice } from "@reduxjs/toolkit";
import { state } from "./mock";

export const counterSlice = createSlice({
  name: "counter",
  initialState: state,
  reducers: {
    punchIn: (state, { payload }) => {
      let data = payload.state;
      const loggedUsername = data.loggedUsername || localStorage.getItem("loggedUsername") != "undefined" ? localStorage.getItem("loggedUsername") : "";
      const selectedUserIndex = data.findIndex((tenant) => tenant.Tname === loggedUsername);
      let selectedUser = data[selectedUserIndex];
      const isNewDate = selectedUser.timesheet.findIndex(
        (record) => record.date === payload.date
      );
      let newTimeSheet = [...selectedUser.timesheet];
      if (isNewDate === -1) {
        newTimeSheet.push({
          date: payload.date,
          checkIn: payload.checkIn,
          checkOut: null,
        });
      } else {
        newTimeSheet.splice(isNewDate, 1, {
          ...newTimeSheet[isNewDate],
          date: payload.date,
          checkIn: payload.checkIn,
        });
      }
      let updatedTenantData = { ...selectedUser, timesheet: newTimeSheet };
      let updatedTenentsData = [...data];
      updatedTenentsData.splice(selectedUserIndex, 1, updatedTenantData);

      // state = { ...state, tenantsData: updatedTenentsData };
       state.tenantsData = updatedTenentsData;
    },

    punchOut: (state, { payload }) => {
      let data = payload.state;
      const loggedUsername = data.loggedUsername || localStorage.getItem("loggedUsername") != "undefined" ? localStorage.getItem("loggedUsername") : "";
      const selectedUserIndex = data.findIndex((tenant) => tenant.Tname === loggedUsername);
      let selectedUser = data[selectedUserIndex];
      const isNewDate = selectedUser.timesheet.findIndex(
        (record) => record.date === payload.date
      );
      let newTimeSheet = [...selectedUser.timesheet];
      if (isNewDate === -1) {
        newTimeSheet.push({
          date: payload.date,
          checkIn: null,
          checkOut: payload.checkOut,
        });
      } else {
        newTimeSheet.splice(isNewDate, 1, {
          ...newTimeSheet[isNewDate],
          date: payload.date,
          checkOut: payload.checkOut,
        });
      }
      let updatedTenantData = { ...selectedUser, timesheet: newTimeSheet };
      let updatedTenentsData = [...data];
      updatedTenentsData.splice(selectedUserIndex, 1, updatedTenantData);

      // state = { ...state, tenantsData: updatedTenentsData };
       state.tenantsData = updatedTenentsData;
    },
    messAvail: (state, { payload }) => {
      const loggedUsername =
        state.loggedUsername ||
        localStorage.getItem("loggedUsername") != "undefined"
          ? localStorage.getItem("loggedUsername")
          : "";
      const selectedUser = state.tenantsData.filter(
        (tenant) => tenant.Tname === loggedUsername
      );
      const newRecord = {
        ...selectedUser,
        messAvailData: selectedUser.messAvailData.push({
          date: payload.date,
          bf: payload.bf,
          lunch: payload.lunch,
          dinner: payload.dinner,
        }),
      };
      const updatedTenentsData = state.tenantsData.splice(
        state.tenantsData.findIndex(
          (tenant) => tenant.Tname === loggedUsername
        ),
        1,
        { newRecord }
      );
      state = { ...state, tenantsData: updatedTenentsData };
    },

    logIn: (state, { payload }) => {
      console.log(payload);
      localStorage.setItem("loggedUsername", payload.username);
      state = { ...state, loggedUsername: payload.username };
    },
  },
});

// Action creators are generated for each case reducer function
export const { punchIn, punchOut, messAvail, logIn } = counterSlice.actions;

export default counterSlice.reducer;
