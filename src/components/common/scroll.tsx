import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router";

/**
 * A component that scrolls to the top when navigating between different states
 */
class ScrollToTop extends React.Component<RouteComponentProps<{}>> {
    public componentDidUpdate(prevProps: RouteComponentProps<{}>) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    public render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);
