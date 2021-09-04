import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth/authSlice";
import { notesReducer } from "./features/notes/notesSlice";
import { alertsReducer } from "./features/alerts/alertsSlice";
import { darkThemeProviderReducer } from "./features/darkThemeProvider/darkThemeProviderSlice";

export const store = configureStore({
    reducer: {
        authReducer,
        notesReducer,
        alertsReducer,
        darkThemeProviderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
