/** Some of the code in here is heavily adapted from https://github.com/martynaskadisa/react-lazy-import
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

import * as React from 'react';
import { ReactComponent, Module } from "utils/types";

export type Loader<P> = () => Promise<Module<ReactComponent<P>>>;

export interface ComponentWithPromiseState<T> {
    loaded: Boolean
    data?: T

    failed: boolean
    failedReason?: any
}

/**
 * Represents a Component that loads some content by using a Promise
 */
export abstract class ComponentWithPromise<P, T, S extends ComponentWithPromiseState<T> = ComponentWithPromiseState<T>, SS = never> extends React.Component<P, S, SS> {

    /** Promise to load content */
    protected abstract load() : Promise<T>

    /** Render function to be called once loading has succeeded */
    protected abstract renderData(data: T): React.ReactNode

    /** Render function to be called during loading */
    protected abstract renderLoading(): React.ReactNode

    /** render function to be called upon error */
    protected abstract renderError(error: any): React.ReactNode


    constructor(props: P){
        super(props);

        this.state = ({
            loaded: false, 
            failed: false
        } as ComponentWithPromiseState<T>) as Readonly<S>;
    }

    private isComponentMounted: boolean = false

    componentWillMount () {
        this.isComponentMounted = true
        
        if (!this.state.data) {

            this.load()
            .then((data) => {
                if (this.isComponentMounted) {
                    this.setState({ loaded: true, data: data });
                }
            }, (result) => {
                if (this.isComponentMounted) {
                    this.setState({ failed: true, failedReason: result });
                }
            });
        }
    }
    
    componentWillUnmount () {
        this.isComponentMounted = false
    }

    render () {
        if (this.state.loaded && this.state.data) {
            return this.renderData(this.state.data as T);
        }
        
        if (this.state.failed) {
            return this.renderError(this.state.failedReason);
        }
        
        if (!this.state.loaded && !this.state.failed) {
            return this.renderLoading();
        }

        return null;
    }
};

/**
 * Implements a {@link LazyComponent} that lazily loads a React Component
 */
export abstract class LazyComponent<P> extends ComponentWithPromise<P, ReactComponent<P>> {

    protected abstract Component(): Promise<Module<ReactComponent<P>>>

    load() {
        return this.Component().then(module => ((module as {default: ReactComponent<P>}).default) || module as ReactComponent<P>);
    }

    renderData(Component: ReactComponent<P>) {
        return <Component {...this.props} />
    }
};