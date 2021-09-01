import {
    createSlice,
    PayloadAction,
    ThunkAction,
    AnyAction,
    nanoid,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { sleep, maxCmpToReducer } from "../helpers";

export interface Alert {
    type: "warning" | "info";
    closeable: boolean;
    message: string;
}

export interface AlertWithId extends Alert {
    id: string;
}

interface AlertsState {
    alerts: Array<AlertWithId>;
}

const initialState: AlertsState = {
    alerts: [],
};

const alertsSlice = createSlice({
    name: "alerts",
    initialState,
    reducers: {
        addAlert(state, action: PayloadAction<AlertWithId>) {
            state.alerts.push(action.payload);
        },
        addAlertWithoutId(state, action: PayloadAction<Alert>) {
            state.alerts.push({
                id: nanoid(),
                ...action.payload,
            });
        },
        removeAlert(state, action: PayloadAction<string>) {
            state.alerts = state.alerts.filter(
                (alert) => alert.id != action.payload
            );
        },
    },
});

export const { addAlert, removeAlert, addAlertWithoutId } = alertsSlice.actions;
export const alertsReducer = alertsSlice.reducer;

const TIMEOUT = 3000;

function alertIdCmp(lhs: AlertWithId, rhs: AlertWithId) {
    return lhs.id < rhs.id;
}

export const pushAlertAndPopAfterTimeout =
    (
        alert: Alert,
        timeout: number = TIMEOUT
    ): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch, getState) => {
        const id = nanoid();
        dispatch(addAlert({ id, ...alert }));
        await sleep(TIMEOUT);
        dispatch(removeAlert(id));
    };
