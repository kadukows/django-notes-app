import * as React from "react";
import * as ReactHookForm from "react-hook-form";
import { AxiosError } from "axios";
import { FormHelperText } from "@material-ui/core";

export function composeWithClassName<
    ComponentType extends React.FunctionComponent<any>
>(Component: ComponentType, customClass: string) {
    type P = Parameters<ComponentType>[0];
    return ({ className, ...rest }: P) =>
        React.createElement(Component, {
            className: customClass + " " + className,
            ...rest,
        });
}

export const sleep = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const maxArray = (arr: Array<any>, cmp: Function) => {
    if (arr.length < 1) {
        return null;
    }

    let res = arr[0];

    for (const obj of arr) {
        if (!cmp(res, obj)) {
            res = obj;
        }
    }

    return res;
};

export function maxCmpToReducer(cmp: Function) {
    return (cur: any, next: any) => {
        return cmp(cur, next) ? next : cur;
    };
}

export function handleErrors<InputsError, Inputs, Fields extends string>(
    fields: Fields[],
    error: AxiosError<InputsError>["response"],
    setError: ReactHookForm.UseFormSetError<Inputs>,
    setNonFieldError: (n: string[]) => void
) {
    for (const field of fields) {
        console.log("error.data: ", error.data);
        if (field in error.data) {
            // @ts-ignore
            for (const msg of error.data[field]) {
                // @ts-ignore
                setError(field, {
                    message: msg,
                });
            }
        }
    }

    // @ts-ignore
    if (error.data.non_field_errors) {
        // @ts-ignore
        setNonFieldError(error.data.non_field_errors);
    }
}

export function renderNonFieldErrors(nonFieldErrors: string[]) {
    let i = 1;
    return (
        <>
            {nonFieldErrors.map((error) => (
                <FormHelperText error key={i++}>
                    {error}
                </FormHelperText>
            ))}
        </>
    );
}
