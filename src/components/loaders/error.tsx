import * as React from "react";

export interface IErrorData {
    hasError: boolean;
    error?: any;
    info?: React.ErrorInfo;
}

/**
 * Displays an error to a developer or to a user
 */
export default function ErrorText(props: IErrorData & {message?: string | true}) {
    // no error => nothing to return
    if (!props.hasError) { return null; }

    const error = props.error ? props.error.toString() : "An unknown error occured";
    const info = props.info!;

    // in development mode, log all the things
    if (process.env.NODE_ENV !== "production") {
        // tslint:disable-next-line:no-console
        console.log("An error occured, please see below for details. ");
        // tslint:disable-next-line:no-console
        console.error(props.error);
        // tslint:disable-next-line:no-console
        console.error(info);

        return (
            <>
                An error occured: {error}. <br />
                Component Stack: <br />
                {info.componentStack.split("\n").map((l) => <>{l}<br /></>)}.
            </>
        );
    } else {
        const message = props.message === true ? error.toString() : (props.message || "");
        return <>{message}</>;
    }
}
