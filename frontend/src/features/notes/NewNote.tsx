import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { addNote, Note } from "./notesSlice";
import { RootState } from "../../store";

import NoteForm from "./NoteForm";
import { addAlertWithoutId } from "../alerts/alertsSlice";

interface Props {}

const NewNote = (props: Props) => {
    const auth = useSelector((state: RootState) => state.authReducer);
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Token ${auth.token}`,
        },
    };

    return (
        <NoteForm
            makeRequest={async (dispatch, history, data) => {
                const res: AxiosResponse<Note> = await axios.post(
                    "/api/notes/",
                    data,
                    config
                );

                dispatch(addNote(res.data));
                dispatch(
                    addAlertWithoutId({
                        type: "info",
                        message: `Added a note: "${res.data.title}"`,
                        closeable: true,
                    })
                );
                history.push("/notes");
            }}
        />
    );
};

export default NewNote;
