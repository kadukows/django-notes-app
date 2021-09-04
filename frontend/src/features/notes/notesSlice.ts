import axios from "axios";
import {
    createSlice,
    PayloadAction,
    ThunkAction,
    AnyAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface Note {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

interface NotesStates {
    notes: Array<Note>;
    loaded: boolean;
    loading: boolean;
}

const initialState: NotesStates = {
    notes: [],
    loaded: false,
    loading: false,
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
        updateNote(state, action: PayloadAction<Note>) {
            const found = state.notes.find(
                (note) => note.id == action.payload.id
            );
            if (found) {
                found.title = action.payload.title;
                found.content = action.payload.content;
            }
        },
        setLoaded(state) {
            state.loaded = true;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

const {
    addNote,
    removeNote,
    setNotes,
    resetNotes,
    updateNote,
    setLoaded,
    setLoading,
} = notesSlice.actions;
export const notesReducer = notesSlice.reducer;

export { updateNote, addNote };

export const getNotes =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch, getState) => {
        if (!getState().authReducer.isAuthenticated) {
            dispatch(setLoaded());
            return;
        }

        if (getState().notesReducer.loading) {
            return;
        }

        dispatch(setLoading(true));

        const config = {
            headers: {
                Authorization: `Token ${getState().authReducer.token}`,
            },
        };

        try {
            const res = await axios.get("/api/notes/", config);
            dispatch(setNotes(res.data));
        } catch (err: any) {
            dispatch(resetNotes());
        } finally {
            dispatch(setLoading(false));
            dispatch(setLoaded());
        }
    };
