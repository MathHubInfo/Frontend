import * as React from "react";

import { Container, Divider } from "semantic-ui-react";
import { LoadWithSpinner } from "../../components/common/lazy";

import { MHTitle } from "../../utils/title";
import { IItemProps, LibraryItemHeader } from "./structure/header";

interface ILibraryItemProps<T> {
    /** the loading title of this library item */
    title: string;

    /** the promise fetching this item */
    promise: () => Promise<T>;

    /** the properties of this item */
    props: (item: T) => IItemProps;

    /** get the body to be placed within the library item render */
    children: (item: T) => React.ReactElement<any>;
}

/** Element to display a single library item */
export class LibraryItem<T> extends React.Component<ILibraryItemProps<T>> {
    public render() {
        const { children, promise, props, title } = this.props;
        return (
            <MHTitle title={title}>
                <LoadWithSpinner
                    title={title}
                    promise={promise}
                    errorMessage={true}
                >{(item: T) => <>
                    <LibraryItemHeader itemProps={props(item)} />
                    <Divider />
                    <Container>{children(item)}</Container>
                </>}
                </LoadWithSpinner>
            </MHTitle>
        );
    }
}
