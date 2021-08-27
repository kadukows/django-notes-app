import * as React from "react";
import axios from "axios";
import {
    Paper,
    makeStyles,
    styled,
    Typography,
    LinearProgress,
    Button,
    Grid,
    FormHelperText,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField as FormikTextField } from "formik-material-ui";
import { useDispatch } from "react-redux";
import { getUserWithToken } from "../auth/authSlice";
import { Lock as LockIcon } from "@material-ui/icons";
import { composeWithClassName } from "../helpers";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
    textField: {
        margin: theme.spacing(1),
    },
}));

const MyTypography = styled(Typography)(({ theme }) => ({
    margin: theme.spacing(2),
    textAlign: "center",
}));

interface Values {
    username: string;
    password: string;
}

const initialValues = {
    username: "",
    password: "",
} as Values;

function getFormErrorList(nonFieldErrors: Array<string>) {
    let i = 0;
    return (
        <>
            {nonFieldErrors.map((error) => {
                i += 1;
                return (
                    <FormHelperText error key={i}>
                        {error}
                    </FormHelperText>
                );
            })}
        </>
    );
}

const LoginCard = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const MyFormikTextField = composeWithClassName(
        (props) => <FormikTextField variant="outlined" {...props} />,
        classes.textField
    );

    return (
        <Paper className={classes.paper} elevation={3}>
            <MyTypography variant="h5">
                <LockIcon />
                <br />
                Sign In
            </MyTypography>

            <Formik
                initialValues={initialValues}
                validate={(values: Values) => {
                    const errors: Partial<Values> = {};

                    if (!values.username) {
                        errors.username = "Required";
                    }

                    if (!values.password) {
                        errors.password = "Required";
                    }

                    return errors;
                }}
                onSubmit={(
                    values: Values,
                    { setSubmitting, setErrors, setStatus }
                ) => {
                    setTimeout(async () => {
                        try {
                            const res = await axios.post("/api/token/", values);
                            dispatch(getUserWithToken(res.data.token));
                        } catch (err) {
                            if (err.response) {
                                setStatus(err.response.data);
                            }
                        } finally {
                            setSubmitting(false);
                        }
                    }, 500);
                }}
            >
                {({ submitForm, isSubmitting, status }) => (
                    <Form>
                        <Field
                            component={MyFormikTextField}
                            name="username"
                            label="Username"
                        />
                        <br />
                        <Field
                            component={MyFormikTextField}
                            name="password"
                            type="Password"
                            label="Password"
                        />
                        <br />
                        {status ? (
                            <>
                                {getFormErrorList(status.non_field_errors)}
                                <br />
                            </>
                        ) : (
                            ""
                        )}
                        {isSubmitting && (
                            <LinearProgress className={classes.textField} />
                        )}
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Paper>
    );
};

export default LoginCard;
