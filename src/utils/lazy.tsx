import * as React from 'react';
import { ReactComponent, Module } from "types/types";

type LWPProps<T> = LCProps<T> & LEProps
export interface LEProps {
    onLoading?: ReactComponent<{}>
    onReject?: ReactComponent<{reason: any}>
}
export interface LCProps<T> {
    promise: () => Promise<T>
    children: (data: T) => React.ReactNode
}

export type LWPState<T> = {
    state: 'loading'
} | {
    state: 'resolved'
    data: T
} | {
    state: 'rejected'
    rejectReason: any
}

export class LoadWithPromise<T> extends React.Component<LWPProps<T>, LWPState<T>> {
    /** Some of the code in this function is heavily adapted from https://github.com/martynaskadisa/react-lazy-import
     * which is licensed as follows: 
     * 
     * MIT License
     * 
     * Copyright (c) 2017 Martynas Kadiša
     * 
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     * 
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     * 
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    constructor(props: LWPProps<T>) {
        super(props)
        this.state = {state: 'loading'}
    }

    private isComponentMounted = false
    componentDidMount () {
        this.isComponentMounted = true;
        
        if (this.state.state === 'loading') {
            this.props.promise()
            .then(
                (data) => this.isComponentMounted ? this.setState({ state: 'resolved', data: data }) : null, 
                (reason) => this.isComponentMounted ? this.setState({ state: 'rejected', rejectReason: reason}) : null
            )
        }
    }
    componentWillUnmount () {
        this.isComponentMounted = false
    }

    render() {
        if(this.state.state === 'resolved') {
            return this.renderData(this.state.data);
        } else if (this.state.state === 'rejected') {
            return this.renderError(this.state.rejectReason);
        } else {
            return this.renderLoading();
        }
    }

    private renderData(data: T) : React.ReactNode {
        return this.props.children(data);
    }
    
    private renderError(reason: any) : React.ReactNode {
        const Error = this.props.onReject;
        return Error ? <Error reason={reason} /> : null;
    }

    private renderLoading() : React.ReactNode {
        const Loader = this.props.onLoading;
        return Loader ? <Loader /> : null;
    }
}

/** Implements a lazily loaded component */
export function Lazy<P>(loader: () => Promise<Module<ReactComponent<P>>>, props?: LEProps): ReactComponent<P> {
    return class LazyLoader extends React.Component<LEProps & P> {
        render() {
            return <LoadWithPromise promise={ () => loader().then(m => (m as {default: ReactComponent<P>}).default || (m as ReactComponent<P>)) } {...props}>{Component =>
                <Component {...this.props} />
            }</LoadWithPromise>
        }
    }
}