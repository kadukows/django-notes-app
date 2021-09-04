import * as React from "react";
import { Grid, Button, Paper, Typography, makeStyles } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import NotesDataGrid from "./NotesDataGrid";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
}));

const NotePage = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container direction="column" spacing={2}>
                <Grid item container justifyContent="flex-start">
                    <Typography component="h5" variant="h5">
                        Notes
                    </Typography>
                </Grid>

                <Grid item>
                    <NotesDataGrid />
                </Grid>

                <Grid item container justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/notes/new"
                    >
                        New note
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default NotePage;
