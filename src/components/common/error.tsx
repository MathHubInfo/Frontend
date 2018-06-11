import * as React from "react";

export interface IErrorData {
    hasError: boolean;
    error?: any;
    info?: React.ErrorInfo;
}

export function ErrorText(props: IErrorData) {
    // no error => nothing to return
    if (!props.hasError) { return <></>; }

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
        return (
            <>
                {error.toString()}. <br />
                We are sorry for the inconvenience.
            </>
        );
    }
}
