import * as React from "react";

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
