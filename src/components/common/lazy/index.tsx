import * as React from "react";

import { Module, ReactComponent } from "../../../types/types";

import { default as Loadable } from "react-loadable";
import { createSpinningLoader, ISpinningLoaderProps, LoadingComponent } from "./loaders";
import { DataComponent, IDataComponentProps } from "./utils";

/** the timeout for all loaders */
const timeout = 10000;

/** creates a loader for a given component */
export function CreateLoader<P>(
    loader: () => Promise<Module<ReactComponent<P> | React.SFC<P>>>,
    loadingFactory: () => typeof LoadingComponent = () => LoadingComponent,
): ReactComponent<P> {
    const loading = loadingFactory();
    return Loadable({ loader, loading, timeout});
}

/** creates a spinning loader for a given component */
export function CreateSpinningLoader<P>(
    props: string | (Partial<ISpinningLoaderProps> & {title?: string}),
    loader: () => Promise<Module<ReactComponent<P> | React.SFC<P>>>,
): ReactComponent<P> {
    // if the properties given are a string
    // we need to update it
    if (typeof props === "string") {
        props = {title: props};
    }

    // extract the title property
    const {title, ...pprops} = props;

    // create a spinning loader
    const loadingFactory = () => createSpinningLoader({
        ...pprops,

        loadingTitle: (pprops && pprops.loadingTitle) || `Loading ${(title || "Data")}`,
        errorTitle: (pprops && pprops.errorTitle) || `Failed to load ${title || "data"}`,
    });

    return CreateLoader(loader, loadingFactory);
}

interface IPromiseLoaderProps<T> extends IDataComponentProps<T> {
    promise: () => Promise<T>;
    loadingFactory?: () => typeof LoadingComponent;
}

/** A Component loading content asyncronously using promises */
export class PromiseLoader<T> extends React.Component<IPromiseLoaderProps<T>> {
    constructor(props: IPromiseLoaderProps<T>) {
        super(props);
    }

    public render() {
        const CreatedLoader = CreateLoader(
            () => this.props.promise().then(DataComponent),
            this.props.loadingFactory || (() => LoadingComponent),
        );
        return <CreatedLoader>{this.props.children}</CreatedLoader>;
    }
}

interface ILoadWithSpinnerProps<T> extends Partial<ISpinningLoaderProps> {
    title?: string;
    promise: () => Promise<T>;
    children: (data: T) => React.ReactNode;
}

/** A Loader the loads content using a Semantic UI Spinning loader  */
export class LoadWithSpinner<T> extends React.Component<ILoadWithSpinnerProps<T>> {
    public render() {
        // extract the title property
        const {title, promise, children, ...pprops} = this.props;

        // create a spinning loader
        const loadingFactory = () => createSpinningLoader({
            ...pprops,

            loadingTitle: (pprops && pprops.loadingTitle) || `Loading ${(title || "Data")}`,
            errorTitle: (pprops && pprops.errorTitle) || `Failed to load ${title || "data"}`,
        });

        // and return a promise loader
        return (
            <PromiseLoader
                promise={promise}
                loadingFactory={loadingFactory}
                children={children}
            />
        );
    }
}
