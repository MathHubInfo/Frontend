import nProgress from "nprogress";
import * as React from "react";
import { ILayoutRoutingIndicatorProps } from "./ILayoutRoutingIndicatorProps";


export default class LayoutRoutingIndicator extends React.Component<ILayoutRoutingIndicatorProps> {
    componentDidMount() {
        nProgress.start();
    }
    componentWillUnmount() {
        nProgress.done();
    }
    render() {
        return null;
    }
}
