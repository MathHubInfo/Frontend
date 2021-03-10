import nProgress from "nprogress";
import * as React from "react";

export default class LayoutRoutingIndicator extends React.Component {
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
