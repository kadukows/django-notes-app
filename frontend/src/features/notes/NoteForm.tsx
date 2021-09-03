import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { Note, updateNote } from "./notesSlice";
import {
    makeStyles,
    Grid,
    CssBaseline,
    Paper,
    Typography,
    TextField,
    FormHelperText,
    LinearProgress,
    Button,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { RootState } from "../../store";
import { addAlertWithoutId } from "../alerts/alertsSlice";

interface Inputs {
    title: string;
    content: string;
}

interface InputsError {
    title?: Array<string>;
    content?: Array<string>;
    non_field_errors: Array<string>;
}

const schema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required(),
});

const useStyles = makeStyles((theme) => ({
    textField: {
        height: 400,
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(1, 1),
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface Params {
    id: string;
}

const NoteForm = () => {
    const params = useParams<Params>();
    const id = parseInt(params.id);
    const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const [nonFieldError, setNonFieldError] = React.useState<Array<string>>([]);
    const classes = useStyles();
    const history = useHistory();

    const note = state.notesReducer.notes.find((note) => note.id == id);

    React.useEffect(() => {
        if (!note) {
            dispatch(
                addAlertWithoutId({
                    type: "warning",
                    message: `Note with id: ${id} not found`,
                    closeable: true,
                })
            );
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
        mode: "onBlur",
        defaultValues: {
            title: note?.title,
            content: note?.content,
        },
    });

    function setErrorField(field: "title" | "content", errors: InputsError) {
        if (errors[field]) {
            for (const errorMessage of errors[field]) {
                setError(field, {
                    type: "manual",
                    message: errorMessage,
                });
            }
        }
    }

    function getMappedComponents(component: any, texts: Array<String>) {
        let i = 1;
        return (
            <>
                {texts.map((s) =>
                    React.createElement(component, { key: i++, error: true }, s)
                )}
            </>
        );
    }

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Token ${state.authReducer.token}`,
            },
        };

        try {
            const res: AxiosResponse<Note> = await axios.put(
                `/api/notes/${id}/`,
                data,
                config
            );
            dispatch(updateNote(res.data));
            dispatch(
                addAlertWithoutId({
                    type: "info",
                    message: `Update a note: "${note.title}"`,
                    closeable: true,
                })
            );
            history.push("/notes");
        } catch (err: any | AxiosError<InputsError>) {
            if (axios.isAxiosError(err)) {
                const error: AxiosError<InputsError> = err;
                if (error.response?.data) {
                    setErrorField("title", error.response.data);
                    setErrorField("content", error.response.data);
                }

                if (error.response.data.non_field_errors) {
                    setNonFieldError(error.response.data.non_field_errors);
                }
            }
        }
    };

    if (!note) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <CssBaseline />
            <Grid container justifyContent="space-around">
                <Grid item>
                    <Paper className={classes.paper}>
                        <Typography></Typography>
                        <form
                            className={classes.form}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                label="Title"
                                fullWidth
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                {...register("title")}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                label="Content"
                                fullWidth
                                multiline
                                error={!!errors.content}
                                helperText={errors.content?.message}
                                {...register("content")}
                            />

                            {nonFieldError &&
                                getMappedComponents(
                                    FormHelperText,
                                    nonFieldError
                                )}

                            {isSubmitting && <LinearProgress />}

                            <Button
                                className={classes.submit}
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                disabled={isSubmitting}
                            >
                                Submit
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default NoteForm;
