import * as React from 'react'

import { Message, Icon } from 'semantic-ui-react'
import { ComponentWithPromise, ComponentWithPromiseState, LazyComponent, Loader} from "utils/lazy"

/**
 * A loading component for a given element
 * @param title Title of element to load
 */
function LoadingComponent(props: {title: String}) {
    return <Message icon>
        <Icon name='circle notched' loading />
        <Message.Content>
            <Message.Header>Loading { props.title }</Message.Header>
            This should not take more than a couple seconds. 
        </Message.Content>
    </Message>;
}

function ErrorComponent(props: {error: any, title: string, message: string}) {

    // in debugging mode, log the error to the console
    // so that we can inspect it easily
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.error(props.error);
    }
    
    return <Message negative icon>
        <Icon name='exclamation triangle' />
        <Message.Content>
            <Message.Header>{props.title || "Something went wrong" }</Message.Header>
            { props.message || props.error }
        </Message.Content>
    </Message>;
}

/**
 * Creates an asyncronously loading component
 * @param title Title of object to load
 * @param loader Promise to load components
 */
export function Loader<P>(title: string, loader: Loader<P>) {
    return class Loader extends LazyComponent<P> {
        Component() { return loader() }

        renderLoading() {
            return <LoadingComponent title={title} />
        }

        renderError(error: any) {
            return <ErrorComponent error={error} title={`Unable to load ${title}`} message="Please reload the page to try again" />;
        }
    };
}

/**
 * A class that can be used to implement components which load data via promises
 */
export abstract class PromiseComponent<P, T, S extends ComponentWithPromiseState<T> = ComponentWithPromiseState<T>, SS = never> extends ComponentWithPromise<P, T, S> {
    protected abstract loadingTitle: string

    protected errorTitle: string = "Something went wrong"
    protected errorMessage: string = ""

    protected renderLoading(): React.ReactNode {
        return <LoadingComponent title={this.loadingTitle} />
    }
    protected renderError(error: any): React.ReactNode {
        return <ErrorComponent error={error} title={this.errorTitle} message={this.errorMessage} />;
    }
}