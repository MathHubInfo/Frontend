import * as React from "react";

import { NavLink, NavLinkProps } from "react-router-dom";

/**
 * a NavigationLink within MathHub
 * Note: This is not an SFC so that is can be passed to "as=" arguments within semantic-ui-react
 */
export default class Nav extends React.Component<NavLinkProps> {
    public render() {
        return <NavLink {...this.props} activeClassName="active" />;
    }
}
