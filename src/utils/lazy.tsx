/** adapted from https://github.com/martynaskadisa/react-lazy-import
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

interface LazyContainerState<P> {
    Component?: ReactComponent<P>

    ErrorComponent?: ReactComponent<{error: any}>
    LoadingComponent?: ReactComponent<{}>

    failed: boolean
    failedReason?: any
}

/**
* Creates a lazily loaded component
* @param loader Promise to load component
* @param loadingComponent Component to use while loading
* @param errorComponent Component to use for error messages
*/
export function CreateLazyContainer<P> 
(
    loader: Loader<P>, 
    loadingComponent: ReactComponent<{}> = LazyComponentLoading, 
    errorComponent: ReactComponent<{error: any}> = LazyComponentError
) {
    /** a lazily loaded component */
    return class extends React.Component<P, LazyContainerState<P>> {
        private isComponentMounted: boolean = false
        static displayName: string = 'LazyContainer';

        public state: LazyContainerState<P> = {
            Component: undefined,
            ErrorComponent: errorComponent || undefined,
            LoadingComponent: loadingComponent || undefined,
            failed: false
        };
        
        componentWillMount () {
            this.isComponentMounted = true
            
            if (!this.state.Component) {
                loader()
                .then(module => ((module as any).default) || module)
                .then((Component: ReactComponent<P>) => {
                    if (this.isComponentMounted) {
                        this.setState({ Component });
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
        
        public render () {
            const { Component, LoadingComponent, ErrorComponent, failed } = this.state;
            
            if (Component) {
                Component.displayName = Component.name; 
                return (
                    <Component {...this.props} />
                );
            }
            
            if (failed && ErrorComponent) {
                return <ErrorComponent error={ this.state.failedReason } />
            }
            
            if (LoadingComponent) {
                return <LoadingComponent />
            }
            
            return null;
        }
    };
}

class LazyComponentError extends React.Component<{error: any}, {}> {
    render() {
        return <div>Something went wrong {this.props.error}</div>;
    }
}

class LazyComponentLoading extends React.Component<{}, {}> {
    render() {
        return <div>Loading</div>;
    }
}