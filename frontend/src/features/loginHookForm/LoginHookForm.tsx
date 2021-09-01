import * as React from "react";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { Redirect } from "react-router-dom";
import {
    CssBaseline,
    Grid,
    Paper,
    Typography,
    makeStyles,
    TextField,
    Button,
    LinearProgress,
    FormHelperText,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getUserWithToken } from "../auth/authSlice";

import { RootState } from "../../store";

interface Props {}

interface Inputs {
    username: string;
    password: string;
}

interface InputsError {
    username: Array<string>;
    password: Array<string>;
    non_field_errors: Array<string>;
}

const useStyles = makeStyles((theme) => ({
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

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
});

const fakeApiCall = (result: {}) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, ...result });
        }, 2000);
    });
};

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

const LoginHookForm = (props: Props) => {
    const classes = useStyles();
    const authState = useSelector((state: RootState) => state.authReducer);
    const dispatch = useDispatch();
    const [nonFieldError, setNonFieldError] = useState<Array<string>>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            const { username, password } = data;
            const response = await axios.post("/api/token/", {
                username,
                password,
            });
            console.log(response.data.token);
            dispatch(getUserWithToken(response.data.token));
        } catch (err: any | AxiosError<Partial<Error>>) {
            if (axios.isAxiosError(err)) {
                const error = err as AxiosError<Partial<InputsError>>;
                if (error.response?.data) {
                    const fieldList = ["username", "password"];
                    for (const field of fieldList) {
                        if (field in error.response.data) {
                            // @ts-ignore: shortcut to not have 'ifs' for username and password duplicated
                            setError(field, error.response.data[field]);
                        }
                    }

                    if (error.response.data.non_field_errors) {
                        setNonFieldError(error.response.data.non_field_errors);
                    }
                }
            }
        }
    };

    if (authState.isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <CssBaseline />
            <Grid container justifyContent="space-around">
                <Grid item>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Log in!
                        </Typography>
                        <form
                            className={classes.form}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Username"
                                error={!!errors.username}
                                helperText={errors.username?.message}
                                {...register("username")}
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                label="Password"
                                type="password"
                                {...register("password")}
                            />

                            {nonFieldError &&
                                getMappedComponents(
                                    FormHelperText,
                                    nonFieldError
                                )}

                            {isSubmitting && <LinearProgress />}

                            <Button
                                className={classes.submit}
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
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

export default LoginHookForm;
