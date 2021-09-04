import * as React from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import { Note, updateNote } from "./notesSlice";
import { addAlertWithoutId } from "../alerts/alertsSlice";
import RedirectWithAlert from "../alerts/RedirectWithAlert";
import NoteForm from "./NoteForm";

interface Params {
    id: string;
}

function NoteDetailEdit(): React.ReactElement {
    const params = useParams<Params>();
    const id = parseInt(params.id);
    const notes = useSelector((state: RootState) => state.notesReducer);
    const auth = useSelector((state: RootState) => state.authReducer);

    const note = notes.notes.find((note) => note.id === id);

    if (!note) {
        return (
            <RedirectWithAlert
                to="/notes"
                alert={{
                    type: "warning",
                    message: `Note with id: "${id}" does not exist`,
                    closeable: true,
                }}
            />
        );
    }

    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Token ${auth.token}`,
        },
    };

    return (
        <NoteForm
            title={note.title}
            content={note.content}
            makeRequest={async (dispatch, history, data) => {
                const res: AxiosResponse<Note> = await axios.put(
                    `/api/notes/${id}/`,
                    data,
                    config
                );
                dispatch(updateNote(res.data));
                dispatch(
                    addAlertWithoutId({
                        type: "info",
                        message: `Updated a note: "${res.data.title}"`,
                        closeable: true,
                    })
                );
                history.push("/notes");
            }}
        />
    );
}

export default NoteDetailEdit;
