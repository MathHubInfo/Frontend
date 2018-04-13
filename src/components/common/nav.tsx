import * as React from 'react';

import { NavLink, NavLinkProps } from "react-router-dom"

/** Represents a navigation link */
export const Nav = (props: NavLinkProps) => (
	<NavLink
		{...props}
		activeClassName="active"
	/>
);