import * as React from 'react'

import { Message, Icon } from 'semantic-ui-react'
import {CreateLazyContainer, Loader} from "utils/lazy"

/**
 * A loading component for a given element
 * @param title Title of element to load
 */
function LoadingComponent(title: String) {
    return () =>
        (<Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
                <Message.Header>Loading { title }</Message.Header>
                This should not take more than a couple seconds. 
            </Message.Content>
        </Message>);
}

function ErrorComponent(props: {error: any}) {

    // in debugging mode, log the error to the console
    // so that we can inspect it easily
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.error(props.error);
    }
    
    return <Message negative icon>
        <Icon name='exclamation triangle' />
        <Message.Content>
            <Message.Header>Something went wrong</Message.Header>
            Reload the page to try again.
        </Message.Content>
    </Message>;
}

export function Loader<P>(title: string, loader: Loader<P>) {
    return CreateLazyContainer(loader, LoadingComponent(title), ErrorComponent);
} 