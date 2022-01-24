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
  firstName: null,
  lastName: null,
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
            state.isManager = Boolean(sessionStorage.getItem("isManager"));
        }
    }
});

export const sessionStore = configureStore({ reducer: sessionSlice.reducer });
export const actions = sessionSlice.actions;