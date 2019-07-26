import * as React from "react";
import { ILayoutHeaderProps } from "./ILayoutHeaderProps";

export default class LayoutHeader extends React.Component<ILayoutHeaderProps> {
    render() {
        return (
            <>
                <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
            </>
        );
    }
}
