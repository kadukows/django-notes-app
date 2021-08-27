import axios from "axios";
import { AnyAction } from "redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store";
import { getUserWithToken } from "../auth/authSlice";

type FieldErrors = Array<string>;

interface UsernameAndPasswordErrors {
    username?: FieldErrors;
    password?: FieldErrors;
    non_field_errors?: FieldErrors;
}

interface LoginState {
    isLoading: boolean;
    errors: {};
}

const initialState = {
    isLoading: false,
    errors: {},
} as LoginState;

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setErrors(state, action: PayloadAction<UsernameAndPasswordErrors>) {
            state.errors = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
});

export const { setErrors, setIsLoading } = loginSlice.actions;
export const loginRedudcer = loginSlice.reducer;

export const postLoginForm =
    (
        username: string,
        password: string
    ): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch, getState) => {
        const data = { username, password };
        dispatch(setIsLoading(true));
        try {
            const res = await axios.post("/api/token/", data);
            dispatch(getUserWithToken(res.data.token));
        } catch (err) {
            if (err.response) {
                dispatch(setErrors(err.response.data));
            } else {
                console.log(err);
            }
        }
    };
