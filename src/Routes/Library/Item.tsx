import * as React from "react";

import { MHTitle } from "../../Components/Fragments";
import { LoadWithSpinner } from "../../Components/Loaders";

import { default as Header, IItemProps } from "./Structure/Header";

interface ILazyLibraryItemProps<T> {
    // the loading title of this library item
    title: string;

    // the promise fetching this item
    promise(): Promise<T | undefined>;

    // the properties of this item
    props(item: T): IItemProps;

    // get the body to be placed within the library item render */
    children(item: T): React.ReactChild;
}

/**
 * Element to display a single library item
 * @deprecated to be moved to Item
 */
export class LazyItem<T> extends React.Component<ILazyLibraryItemProps<T>> {
    render() {
        const { children, promise, props, title } = this.props;

        return (
            <MHTitle title={title}>
                <LoadWithSpinner
                    title={title}
                    promise={promise}
                    errorMessage
                >{(item: T | undefined) => <>
                    {item && <Header itemProps={props(item)} />}
                    {item && children(item)}
                </>}
                </LoadWithSpinner>
            </MHTitle>
        );
    }
}

interface ILibraryItemProps<T> {
    // the loading title of this library item
    title: string;

    // loaded data, if any
    data?: T;
    loaded?: boolean;

    error?: {};

    // props that give the library item some information
    props(item: T): IItemProps;

    // get the body to be placed within the library item render */
    children(item: T): React.ReactChild;
}

export default class Item<T> extends React.Component<ILibraryItemProps<T>> {
    render() {
        const {title, data, loaded, error, props, children} = this.props;

        // not yet loaded, TODO: Render a spinner
        if (!loaded)
            return null;

        // an error occured, TODO: show error in devel
        if (error) {
            // tslint:disable-next-line:no-console
            if (process.env.NODE_ENV !== "production") console.error(error);

            return "Error";
        }

        if (!data) return "Not Found"; // TODO: Render a nice 404 error

        return (
            <MHTitle title={title}>
                <Header itemProps={props(data)} />
                {children(data)}
            </MHTitle>
        );
    }
}
