import NProgress from "nprogress";
import * as React from "react";

import { ILayoutRoutingIndicatorProps } from "../../../theming/Layout/ILayoutRoutingIndicatorProps";

export default class LayoutRoutingIndicator extends React.Component<ILayoutRoutingIndicatorProps> {
    componentDidMount() {
        NProgress.start();
    }
    componentWillUnmount() {
        NProgress.done();
    }
    render() {
        return null;
    }
}
