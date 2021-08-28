import * as React from "react";
import { Button, makeStyles, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { pushAlert } from "./alertsSlice";
import { gridClasses } from "@mui/x-data-grid";

interface Props {}

/*
function composeWithClassName<C>(component: C, composedClass: string) {
    type Props = React.ComponentProps<C>;
    return ({ className, ...rest }: Props) =>
        React.createElement(component, {
            className: `${composedClass} ${className}`,
            ...rest,
        });
}*/

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(1, 0),
        display: "flex",
        justifyContent: "center",
    },
    button: {
        margin: theme.spacing(2, 1),
    },
}));

const AlertWidget = (props: Props) => {
    const classes = useStyles();

    const MyButton = (props: React.ComponentProps<typeof Button>) => (
        <Button variant="contained" color="primary" {...props} />
    );
    const dispatch = useDispatch();

    const onInfo = () => {
        dispatch(
            pushAlert({
                type: "info",
                message: "This is simple info alert",
            })
        );
    };

    const onWarning = () => {
        dispatch(
            pushAlert({
                type: "warning",
                message: "This is simple warnin alert",
            })
        );
    };

    return (
        <div className={classes.paper}>
            <MyButton onClick={onInfo}>Info</MyButton>
            <MyButton onClick={onWarning} color="secondary">
                Warning
            </MyButton>
        </div>
    );
};

export default AlertWidget;
