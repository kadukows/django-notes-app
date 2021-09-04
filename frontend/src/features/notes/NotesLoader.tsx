import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { RootState } from "../../store";
import Loader from "../loader/Loader";
import { getNotes } from "../notes/notesSlice";

function NotesLoader(): React.ReactElement {
    const notes = useSelector((state: RootState) => state.notesReducer);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (!notes.loaded && !notes.loading) {
            dispatch(getNotes());
        }
    }, []);

    const useSlice = () =>
        useSelector((state: RootState) => state.notesReducer);
    const notesLoaded = (state: RootState["notesReducer"]) => state.loaded;

    return <Loader precondition={notesLoaded} useSlice={useSlice} />;
}

export default NotesLoader;
