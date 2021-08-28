import axios from "axios";
import {
    createSlice,
    PayloadAction,
    ThunkAction,
    AnyAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface Note {
    id: number;
    title: string;
    content: string;
}

interface NotesStates {
    notes: Array<Note>;
}

const initialState: NotesStates = {
    notes: [],
};

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setNotes(state, action: PayloadAction<Array<Note>>) {
            state.notes = action.payload;
        },
        resetNotes(state) {
            state.notes = [];
        },
        addNote(state, action: PayloadAction<Note>) {
            state.notes.push(action.payload);
        },
        removeNote(state, action: PayloadAction<number>) {
            state.notes = state.notes.filter(
                (note) => note.id != action.payload
            );
        },
    },
});

export const { addNote, removeNote, setNotes, resetNotes } = notesSlice.actions;
export const notesReducer = notesSlice.reducer;

export const getNotes =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch, getState) => {
        if (!getState().authReducer.isAuthenticated) {
            return;
        }

        const config = {
            headers: {
                Authorization: `Token ${getState().authReducer.token}`,
            },
        };

        try {
            const res = await axios.get("/api/notes/", config);
            dispatch(setNotes(res.data));
        } catch (err: any) {
            dispatch(resetNotes);
        }
    };
