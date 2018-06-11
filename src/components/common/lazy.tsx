import * as React from "react";

import { Button, Icon, Message } from "semantic-ui-react";

import { ErrorText, IErrorData } from "./error";

import { Module, ReactComponent } from "../../types/types";

import { default as Loadable, LoadingComponentProps } from "react-loadable";

interface ILWProps {
    loadingTitle?: string;
    loadingMessage?: string;

    timeoutTitle?: string;
    timeoutMessage?: string;
    retryMessage?: string;

    errorTitle?: string;
    errorMessage?: string | true;
}

/* LoadWithPromise<T> wrapper */
type LPProps<T> = ILWProps & ILCProps<T> & { title?: string };

interface ILCProps<T> {
    promise: () => Promise<T>;
    children: (data: T) => React.ReactNode;
}

type ILWPState = {
    isComponentMounted: false;
} | {
    isComponentMounted: true;
    loadable?: React.ReactNode;
};

const timeout = 10000;

export class LoadWithPromise<T> extends React.Component<LPProps<T>, ILWPState> {
    constructor(props: LPProps<T>) {
        super(props);
        this.state = {isComponentMounted: false};
    }

    public componentDidMount() {

        // create a spinning loader
        const loading = createSpinningLoader({
            loadingTitle: this.props.loadingTitle,
            loadingMessage: this.props.loadingMessage,

            timeoutTitle: this.props.timeoutTitle,
            timeoutMessage: this.props.timeoutMessage,

            errorTitle: this.props.errorTitle,
            errorMessage: this.props.errorMessage,
        });

        const loader = () => this.props.promise().then((data) => (props: {}) => <>{this.props.children(data)}</>);
        const LoaderComponent = Loadable({ loader, loading, timeout });
        this.setState({ isComponentMounted: true, loadable: <LoaderComponent />});
    }

    public componentWillUnmount() {
        this.setState({ isComponentMounted: false});
    }

    public render() {
        return this.state.isComponentMounted ? this.state.loadable : null;
    }
}

/* Lazy<P> wrapper */
export function Loader<P>(
    title: string,
    loader: () => Promise<Module<ReactComponent<P> | React.SFC<P>>>, props?: ILWProps,
): ReactComponent<P> {
    const lprops = {
        ...props,

        loadingTitle: (props && props.loadingTitle) || `Loading ${title}`,
        errorTitle: (props && props.errorTitle) || `Failed to load ${title}`,
    };

    // create a loader
    const loading = createSpinningLoader(lprops);
    // and a loadable
    return Loadable({ loader, loading, timeout});
}

/** A Loading Component for use with react-loadable */
export function createSpinningLoader(
    text: ILWProps,
) {
    return class extends React.Component<LoadingComponentProps, IErrorData & {reloading: boolean}> {
        constructor(props: LoadingComponentProps) {
            super(props);
            this.state = { reloading: false, hasError: false };
        }

        public componentDidCatch(error: Error, info: React.ErrorInfo) {
            this.setState({ hasError: true, error, info});
        }

        /** renders an uncaught error in the child component */
        private renderError() {
            return (
                <Message negative icon>
                    <Icon name="exclamation triangle" />
                    <Message.Content>
                        <Message.Header>{text.errorTitle || "Something went wrong"}</Message.Header>
                        <ErrorText message={text.errorMessage} {...this.state} />
                    </Message.Content>
                </Message>
            );
        }

        /** renders a loading element */
        private renderLoader() {
            const isProduction = process.env.NODE_ENV === "production";

            const props = this.props;

            if (props.error) {
                // in production, we simply show the error message
                // in devel, we show the proper error description
                const message = isProduction ?
                    (text.errorMessage || "Sorry for the inconvenience") :
                    props.error.toString();

                return (
                    <Message negative icon>
                        <Icon name="exclamation triangle" />
                        <Message.Content>
                            <Message.Header>{
                                text.errorTitle || "Something went wrong"
                            }</Message.Header>
                            {message}
                        </Message.Content>
                    </Message>
                );
            } else if (props.timedOut) {
                const doRetry = () => {
                    this.setState({reloading: true});
                    props.retry();
                };

                return (
                    <Message icon>
                        <Icon name="circle notched" loading />
                        <Message.Content>
                            <Message.Header>{
                                text.timeoutTitle || "Loading is taking longer than usual"
                            }</Message.Header>
                            <Button
                                secondary
                                size="mini"
                                loading={this.state.reloading}
                                onClick={doRetry}
                            >
                                Try again
                            </Button>
                            {
                                this.state.reloading ?
                                    (text.retryMessage || "Retrying ...") :
                                    (text.timeoutMessage || "You can try again or re-load the page. ")
                            }
                        </Message.Content>
                    </Message>
                );
            } else if (props.pastDelay) {
                return (
                    <Message icon>
                        <Icon name="circle notched" loading />
                        <Message.Content>
                            <Message.Header>{
                                text.loadingTitle || "Loading"
                            }</Message.Header>

                            {
                                text.loadingMessage || "This should not take more than a couple seconds. "
                            }
                        </Message.Content>
                    </Message>
                );
            } else {
                return null;
            }
        }

        public render() {
            if (this.state.hasError) {
                return this.renderError();
            } else {
                return this.renderLoader();
            }
        }
    };
}
