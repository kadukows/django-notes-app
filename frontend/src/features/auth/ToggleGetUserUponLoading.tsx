import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserWithToken } from "./authSlice";
import { RootState } from "../../store";

interface Props {}

const ToggleGetUserUponLoading = (props: Props) => {
    const token = useSelector((state: RootState) => state.authReducer.token);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getUserWithToken(token));
    }, []);

    return <></>;
};

export default ToggleGetUserUponLoading;
