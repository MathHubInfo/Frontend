import * as React from "react";

import { Icon, Message } from "semantic-ui-react";

import { Module, ReactComponent } from "../../types/types";
import { ILCProps, Lazy, LoadWithPromise as LoadWithPromiseI } from "../../utils/lazy";

interface ILWProps {
    loadingTitle?: string;
    loadingMessage?: string;

    errorTitle?: string;
    errorMessage?: string | true;
}

/* LoadWithPromise<T> wrapper */
type LPProps<T> = ILWProps & ILCProps<T> & { title?: string };

export class LoadWithPromise<T> extends React.Component<LPProps<T>> {
    public render() {
        const { title, loadingTitle, loadingMessage, errorTitle, errorMessage, ...cprops} = this.props;

        const onLoading = (p: {}) => (
            <LoadingComponent
                title={loadingTitle || (title && `Loading ${title}`)}
                message={loadingMessage}
            />
        );

        const onReject = (p: {reason?: any}) => (
            <ErrorComponent
                reason={p.reason}
                title={errorTitle || `Error loading ${title}`}
                message={(errorMessage === true) ? (p.reason ? p.reason.toString() : undefined) : errorMessage}
            />
        );

        const lwpprops = {
            ...cprops,
            onLoading,
            onReject,
        };

        return <LoadWithPromiseI {...lwpprops} />;
    }
}

/* Lazy<P> wrapper */
export function Loader<P>(
    title: string,
    loader: () => Promise<Module<ReactComponent<P>>>, props?: ILWProps,
): ReactComponent<P> {
    const { loadingTitle, loadingMessage, errorTitle, errorMessage } = (props || {}) as ILWProps;

    const onLoading = (p: {}) => (
        <LoadingComponent
            title={loadingTitle || (title && `Loading ${title}`)}
            message={loadingMessage}
        />
    );

    const onReject = (p: {reason?: any}) => (
        <ErrorComponent
            reason={p.reason}
            title={errorTitle || `Error Loading ${title}`}
            message={(errorMessage === true) ? (p.reason ? p.reason.toString() : undefined) : errorMessage}
        />
    );

    return Lazy(loader, {
        onLoading,
        onReject,
    });
}

/* Loading Components */

function LoadingComponent(props: {title?: string, message?: string}) {
    return (
        <Message icon>
            <Icon name="circle notched" loading />
            <Message.Content>
                <Message.Header>{props.title || "Loading"}</Message.Header>
                {props.message || "This should not take more than a couple seconds. "}
            </Message.Content>
        </Message>
    );
}

function ErrorComponent(props: {reason: any, title?: string, message?: string}) {

    // in debugging mode, log the error to the console
    // so that we can inspect it easily
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.error(props.reason);
    }

    return (
        <Message negative icon>
            <Icon name="exclamation triangle" />
            <Message.Content>
                <Message.Header>{props.title || "Something went wrong"}</Message.Header>
                {props.message || ""}
            </Message.Content>
        </Message>
    );
}
