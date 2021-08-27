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
