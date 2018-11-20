import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router";

/**
 * A component that scrolls to the top when navigating between different states
 */
class ScrollToTop extends React.Component<RouteComponentProps> {
    componentDidUpdate(prevProps: RouteComponentProps) {
        if (this.props.location !== prevProps.location)
            window.scrollTo(0, 0);
    }

    render() {
        return this.props.children;
    }
}

// tslint:disable-next-line:export-name
export default withRouter(ScrollToTop);
