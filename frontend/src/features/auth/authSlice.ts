import axios from "axios";
import { AnyAction } from "redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store";

interface User {
    username: string;
}

interface AuthState {
    token: string;
    isLoading: boolean;
    isAuthenticated: boolean;
    user: User;
}

interface TokenAndUser {
    token: string;
    user: User;
}

const initialState = {
    token: localStorage.getItem("token"),
    isLoading: false,
    isAuthenticated: false,
    user: null,
} as AuthState;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setNewTokenAndUser(state, action: PayloadAction<TokenAndUser>) {
            localStorage.setItem("token", action.payload.token);
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        resetTokenAndUser(state) {
            localStorage.removeItem("token");
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        setIsLoading(state) {
            state.isLoading = true;
        },
    },
});

export const { resetTokenAndUser, setIsLoading, setNewTokenAndUser } =
    authSlice.actions;
export const authReducer = authSlice.reducer;

export const getUserWithToken =
    (token: string): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch, getState) => {
        const config = {
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        try {
            const res = await axios.get("/api/user/", config);
            const user = { username: res.data["username"] } as User;
            dispatch(setNewTokenAndUser({ user, token }));
        } catch (err) {
            //console.log(err);
            dispatch(resetTokenAndUser());
        }
    };

export const getUserWithCurrentToken =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
    (dispatch, getState) => {
        dispatch(getUserWithToken(getState().authReducer.token));
    };

export const loginUser =
    (
        username: string,
        password: string
    ): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch, getState) => {
        dispatch(setIsLoading());

        const data = { username, password };

        try {
            const res = await axios.post("/api/token/", data);
            const token = res.data.token;
            if (!token) {
                throw new Error("Wrong token");
            }
            dispatch(getUserWithToken(token));
        } catch (err) {
            console.log(err);
            dispatch(resetTokenAndUser());
        }
    };
