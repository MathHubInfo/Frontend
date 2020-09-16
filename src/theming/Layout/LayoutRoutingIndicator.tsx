import nProgress from "nprogress";
import * as React from "react";

// tslint:disable-next-line: no-empty-interface
interface ILayoutRoutingIndicatorProps {}

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
