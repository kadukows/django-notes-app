import * as React from "react";
import { useDispatch } from "react-redux";

import { getUserWithCurrentToken } from "./authSlice";

interface Props {}

const ToggleGetUserUponLoading = (props: Props) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getUserWithCurrentToken());
    }, []);

    return <></>;
};

export default ToggleGetUserUponLoading;
