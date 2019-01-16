import * as React from "react";

import MHLink from "../../../lib/components/MHLink";
import { IBreadcrumb, IHeaderProps } from "../../../theming/Layout/IHeaderProps";

export default class Header extends React.Component<IHeaderProps> {
    render() {
        const { title, crumbs } = this.props;

        return (
            <header>
                {title && title[0] && <h1>{title[0]}</h1>}
                <LayoutCrumbs crumbs={[...crumbs, { href: "", title: (title || [])[0] }]} />
            </header>
        );
    }
}

class LayoutCrumbs extends React.Component<{ crumbs: IBreadcrumb[] }> {
    render() {
        return <div>{this.props.crumbs.map(c => <LayoutCrumb key={c.href} {...c} />)}</div>;
    }
}

class LayoutCrumb extends React.Component<{ href: string; title: string; query?: {} }> {
    render() {
        const { href, title, query } = this.props;
        if (!href) return <b>{title}</b>;

        return (
            <>
                <MHLink href={href} query={query}>
                    <a>{title}</a>
                </MHLink>
                &nbsp;>&nbsp;
            </>
        );
    }
}
