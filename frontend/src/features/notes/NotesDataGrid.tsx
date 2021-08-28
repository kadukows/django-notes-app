import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    DataGrid,
    GridColDef,
    GridValueFormatterParams,
} from "@mui/x-data-grid";
import { Grid } from "@material-ui/core";
import { getNotes } from "./notesSlice";

import { RootState } from "../../store";

const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 90 },
    { field: "title", headerName: "Title", width: 150 },
];

const NotesDataGrid = () => {
    const notes = useSelector((state: RootState) => state.notesReducer);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getNotes());
    });

    return <div></div>;
};

export default NotesDataGrid;
