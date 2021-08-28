import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth/authSlice";
import { notesReducer } from "./features/notes/notesSlice";
import { alertsReducer } from "./features/alerts/alertsSlice";

export const store = configureStore({
    reducer: { authReducer, notesReducer, alertsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
/*
export type RootState {

}
*/
