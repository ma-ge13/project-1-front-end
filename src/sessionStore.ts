import { createSlice, configureStore } from "@reduxjs/toolkit";

export interface UserState {
    username: string,
    employeeId: string,
    firstName: string,
    lastName: string,
    isManager: boolean
}

const initialState: UserState = {
  username: null,
  employeeId: null,
  lastName: null,
  firstName: null,
  isManager: null
};

const sessionSlice = createSlice({
    name: "UserSession",
    initialState,
    reducers: {

        updateUser(state) {
            state.username = sessionStorage.getItem("username");
            state.employeeId = sessionStorage.getItem("employeeId");
            state.firstName = sessionStorage.getItem("firstName");
            state.lastName = sessionStorage.getItem("lastName");
            state.isManager = sessionStorage.getItem("isManager") === "true";
        }
    }
});

export const sessionStore = configureStore({ reducer: sessionSlice.reducer });
export const actions = sessionSlice.actions;