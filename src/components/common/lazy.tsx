import * as React from 'react'

import { Message, Icon } from 'semantic-ui-react'

import {LoadWithPromise as LoadWithPromiseI, LCProps, Lazy} from "utils/lazy"
import {Module, ReactComponent} from "utils/types"

interface LWProps {
    loadingTitle?: string
    loadingMessage?: string

    errorTitle?: string
    errorMessage?: string | true
}

/* LoadWithPromise<T> wrapper */
type LPProps<T> = LWProps & LCProps<T> & { title?: string }

export class LoadWithPromise<T> extends React.Component<LPProps<T>> {
    render() {
        const { title, loadingTitle, loadingMessage, errorTitle, errorMessage, ...cprops} = this.props
        
        const onLoading = (p: {}) => <LoadingComponent
            title={loadingTitle || (title && `Loading ${title}`) }
            message={loadingMessage} 
        />

        const onReject = (p: {reason?: any}) => <ErrorComponent 
            reason={p.reason} 
            title={ errorTitle || `Error Loading ${title}`} 
            message={ (errorMessage === true) ? (p.reason ? p.reason.toString() : undefined) : errorMessage } 
        />

        const lwpprops = {
            ...cprops, 
            onLoading: onLoading, 
            onReject: onReject
        }

        return <LoadWithPromiseI {...lwpprops} />
    }
}

/* Lazy<P> wrapper */
export function Loader<P>(title: string, loader: () => Promise<Module<ReactComponent<P>>>, props?: LWProps): ReactComponent<P> {
    const { loadingTitle, loadingMessage, errorTitle, errorMessage } = (props || {}) as LWProps;
    
    const onLoading = (p: {}) => <LoadingComponent
        title={loadingTitle || (title && `Loading ${title}`) }
        message={loadingMessage} 
    />

    const onReject = (p: {reason?: any}) => <ErrorComponent 
        reason={p.reason} 
        title={ errorTitle || `Error Loading ${title}`} 
        message={ (errorMessage === true) ? (p.reason ? p.reason.toString() : undefined) : errorMessage } 
    />

    return Lazy(loader, {
        onLoading: onLoading, 
        onReject: onReject
    });
}


/* Loading Components */

function LoadingComponent(props: {title?: String, message?: string}) {
    return <Message icon>
        <Icon name='circle notched' loading />
        <Message.Content>
            <Message.Header>{ props.title || 'Loading' }</Message.Header>
            { props.message || 'This should not take more than a couple seconds. ' }
        </Message.Content>
    </Message>;
}

function ErrorComponent(props: {reason: any, title?: string, message?: string}) {

    // in debugging mode, log the error to the console
    // so that we can inspect it easily
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.error(props.reason);
    }
    
    return <Message negative icon>
        <Icon name='exclamation triangle' />
        <Message.Content>
            <Message.Header>{props.title || "Something went wrong" }</Message.Header>
            {props.message || "" }
        </Message.Content>
    </Message>;
}