import * as React from "react";

import { MHTitle } from "../../Components/Fragments";
import { LoadWithSpinner } from "../../Components/Loaders";

import { default as Header, IItemProps } from "./Structure/Header";

interface ILibraryItemProps<T> {
    // the loading title of this library item
    title: string;

    // the promise fetching this item
    promise(): Promise<T | undefined>;

    // the properties of this item
    props(item: T): IItemProps;

    // get the body to be placed within the library item render */
    children(item: T): React.ReactChild;
}

// Element to display a single library item
export default class Item<T> extends React.Component<ILibraryItemProps<T>> {
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
