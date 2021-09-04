import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    DataGrid,
    GridColDef,
    GridValueFormatterParams,
    GridValueGetterParams,
} from "@mui/x-data-grid";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import { getNotes } from "./notesSlice";

import { RootState } from "../../store";

const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 90 },
    { field: "title", headerName: "Title", width: 150 },
    {
        field: "created_at",
        headerName: "Time",
        width: 140,
        valueFormatter: (params: GridValueFormatterParams) => {
            const date = new Date(params.value as string);
            return date.toDateString();
        },
    },
    {
        field: "edit",
        headerName: "Edit",
        sortable: false,
        width: 160,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <Button
                    to={`/notes/${params.getValue(params.id, "id")}`}
                    component={RouterLink}
                >
                    Edit
                </Button>
            );
        },
    },
];

const NotesDataGrid = () => {
    const notes = useSelector((state: RootState) => state.notesReducer);
    const auth = useSelector((state: RootState) => state.authReducer);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getNotes());
    }, [auth]);

    return (
        <DataGrid
            rows={notes.notes}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            style={{
                height: 400,
                width: "100%",
            }}
        />
    );
};

export default NotesDataGrid;
