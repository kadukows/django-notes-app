import * as React from "react";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import {
    Grid,
    Typography,
    Paper,
    TextField,
    LinearProgress,
    FormHelperText,
    Button,
    makeStyles,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { RootState } from "../../store";
import { handleErrors } from "../helpers";
import { addAlertWithoutId } from "../alerts/alertsSlice";

interface Inputs {
    username: string;
    password: string;
    password2: string;
}

interface InputsError {
    username: Array<string>;
    password: Array<string>;
    non_field_errors: Array<string>;
}

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    password2: yup
        .string()
        .required()
        .test("equal", "Passwords do not match!", function (v) {
            const ref = yup.ref("Password");
            return v !== this.resolve(ref);
        }),
});

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
    field: {
        marginTop: theme.spacing(2),
    },
}));

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [nonFieldError, setNonFieldError] = React.useState<Array<string>>([]);
    const classes = useStyles();
    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
        //mode: "onBlur",
    });

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        console.log("onSubmit()");
        try {
            const { username, password } = data;
            const res = await axios.post("/api/user/", {
                username,
                password,
            });
            dispatch(
                addAlertWithoutId({
                    type: "info",
                    message: "Successfully registered",
                    closeable: true,
                })
            );
            history.push("/");
        } catch (err: any | AxiosError<Partial<InputsError>>) {
            if (axios.isAxiosError(err)) {
                const error = err as AxiosError<Partial<InputsError>>;
                console.log(error);
                if (error.response?.data) {
                    handleErrors(
                        ["username", "password"],
                        error.response,
                        setError,
                        setNonFieldError
                    );

                    /*
                    const data = error.response.data;
                    if (data.username) {
                        //setError("username", {message: })
                        for (const msg of data.username) {
                            setError("username");
                        }
                    }
                    */
                }
            }
        }
    };

    console.log("errors.username?.message", errors.username?.message);

    return (
        <Grid container justifyContent="center">
            <Grid item md={6} sm={9} xs={12}>
                <Paper className={classes.paper}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant="h5">Register</Typography>

                        <TextField
                            variant="outlined"
                            label={"Username"}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                            fullWidth
                            disabled={isSubmitting}
                            className={classes.field}
                            {...register("username")}
                        />

                        <TextField
                            variant="outlined"
                            label={"Password"}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            fullWidth
                            disabled={isSubmitting}
                            className={classes.field}
                            type="password"
                            {...register("password")}
                        />

                        <TextField
                            variant="outlined"
                            label={"Repeat password"}
                            error={!!errors.password2}
                            helperText={errors.password2?.message}
                            fullWidth
                            disabled={isSubmitting}
                            className={classes.field}
                            type="password"
                            {...register("password2")}
                        />

                        <Grid
                            item
                            container
                            justifyContent="flex-end"
                            direction="row"
                            className={classes.field}
                        >
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default RegisterForm;
