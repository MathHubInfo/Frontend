import * as React from "react";
import { default as Loadable } from "react-loadable";

import { Module } from "../../Types/react";

import DataComponent, { IDataComponentProps } from "./DataComponent";
import { createSpinningLoader, ISpinningLoaderProps, LoadingComponent } from "./LoadingComponent";

// the timeout for all loaders
const timeout = 10000;

// creates a loader for a given component
function CreateLoader<P>(
    loader: () => Promise<Module<React.ComponentClass<P>>>,
    loadingFactory: () => typeof LoadingComponent = () => LoadingComponent,
): React.ComponentClass<P> {
    const loading = loadingFactory();
    const CreateLoaderComponent = Loadable({ loader, loading, timeout});

    return class extends React.Component<P> {
        render() {
            return <CreateLoaderComponent {...this.props} />;
        }
    };
}

// creates a spinning loader for a given component
export function CreateSpinningLoader<P>(
    props: string | (Partial<ISpinningLoaderProps> & {title?: string}),
    loader: () => Promise<Module<React.ComponentClass<P>>>,
): React.ComponentClass<P> {
    // extract the title property
    // we might have to do something special if props are a string
    const {title, ...pprops} = (typeof props === "string") ? {title: props} : props;

    // create a spinning loader
    const loadingFactory = () => createSpinningLoader({
        ...pprops,

        loadingTitle: (pprops && pprops.loadingTitle) || `Loading ${(title || "Data")}`,
        errorTitle: (pprops && pprops.errorTitle) || `Failed to load ${title || "data"}`,
    });

    return CreateLoader(loader, loadingFactory);
}

interface IPromiseLoaderProps<T> extends IDataComponentProps<T> {
    promise(): Promise<T>;
    loadingFactory?(): typeof LoadingComponent;
}

// A Component loading content asyncronously using promises
export class PromiseLoader<T> extends React.PureComponent<IPromiseLoaderProps<T>> {
    render() {
        const Loader = this.createLoader();

        return <Loader>{this.props.children}</Loader>;
    }
    private createLoader() {
        return CreateLoader(
            async () => this.props.promise().then(DataComponent),
            this.props.loadingFactory || (() => LoadingComponent),
        );
    }
}

interface ILoadWithSpinnerProps<T> extends Partial<ISpinningLoaderProps> {
    title?: string;
    promise(): Promise<T>;
    children(data: T): React.ReactNode;
}

// A Loader the loads content using a Semantic UI Spinning loader
export class LoadWithSpinner<T> extends React.PureComponent<ILoadWithSpinnerProps<T>> {
    render() {
        // extract the title property
        const {promise, children} = this.props;

        // and return a promise loader
        return (
            <PromiseLoader
                promise={promise}
                loadingFactory={this.loadingFactory}
                children={children}
            />
        );
    }
    private readonly loadingFactory = () => {
        // extract the title property
        const {title, promise, children, ...pprops} = this.props;

        // create a spinning loader
        return createSpinningLoader({
            ...pprops,

            loadingTitle: (pprops && pprops.loadingTitle) || `Loading ${(title || "Data")}`,
            errorTitle: (pprops && pprops.errorTitle) || `Failed to load ${title || "data"}`,
        });
    }
}
