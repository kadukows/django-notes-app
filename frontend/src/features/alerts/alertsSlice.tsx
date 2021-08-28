import {
    createSlice,
    PayloadAction,
    ThunkAction,
    AnyAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface Alert {
    type: "warning" | "info";
    message: string;
}

interface AlertWithId extends Alert {
    id: number;
}

interface AlertsState {
    alerts: Array<AlertWithId>;
    currentId: number;
}

const initialState: AlertsState = {
    alerts: [],
    currentId: 1,
};

const alertsSlice = createSlice({
    name: "alerts",
    initialState,
    reducers: {
        addAlert(state, action: PayloadAction<Alert>) {
            state.alerts.push({
                id: state.currentId++,
                ...action.payload,
            });
        },
        removeAlert(state, action: PayloadAction<number>) {
            state.alerts = state.alerts.filter(
                (alert) => alert.id != action.payload
            );
        },
    },
});

export const { addAlert, removeAlert } = alertsSlice.actions;
export const alertsReducer = alertsSlice.reducer;

const TIMEOUT = 3000;

export const pushAlertAndPopAfterTimeout =
    (
        alert: Alert,
        timeout: number = TIMEOUT
    ): ThunkAction<any, {}, {}, AnyAction> =>
    (dispatch, getState) => {};
