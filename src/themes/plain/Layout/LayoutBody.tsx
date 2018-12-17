import Head from "next/head";
import * as React from "react";

import MHLink from "../../../lib/components/MHLink";
import { IBreadcrumb, ILayoutBodyProps } from "../../../theming/Layout/ILayoutBodyProps";
import { IMathHubVersion } from "../../../types/config";


export default class LayoutBody extends React.Component<ILayoutBodyProps> {
    render() {
        const {title, crumbs, version, description} = this.props;

        // generate the title
        const titleStr = (title || []).join(" | ");
        const theTitle = title ? `${titleStr} | MathHub` : "MathHub";

        return (
            <>
                <Head>
                    <title>{theTitle}</title>
                    {description && <meta name="description" content={description} />}
                </Head>
                <header>
                    {title && title[0] && <h1>{title[0]}</h1>}
                    <LayoutCrumbs crumbs={[...crumbs, {href: "", title: (title || [])[0]}]} />
                </header>
                <hr />
                <main>
                    {this.props.children}
                </main>
                <hr />
                <footer>
                    <div>
                        <MHLink href="/legal/notices"><a>Notices</a></MHLink>
                        &nbsp;-&nbsp;
                        <MHLink href="/legal/imprint"><a>Imprint</a></MHLink>
                    </div>
                    <div>
                        <small>
                            <MathHubVersion version={version} />
                        </small>
                    </div>
                </footer>
            </>
        );
    }
}

class LayoutCrumbs extends React.Component<{crumbs: IBreadcrumb[]}> {
    render() {
        return <div>{this.props.crumbs.map(c => <LayoutCrumb key={c.href} {...c} />)}</div>;
    }
}

class LayoutCrumb extends React.Component<{href: string; title: string; query?: {}}> {
    render() {
        const {href, title, query} = this.props;
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

class MathHubVersion extends React.Component<{version: IMathHubVersion}> {
    render() {
        const {semantic, git, configTime} = this.props.version;
        const cfgTime = new Date(configTime).toISOString();

        let version = `MathHub Version ${semantic} configured at ${cfgTime}`;

        if (git) {
            version += " (from ";
            if (git.dirty === true) version += "dirty ";
            else if (git.dirty === false) version += "clean ";
            version += `commit ${git.hash}`;
            if (git.branch) version += ` on branch ${git.branch}`;
            version += ")";
        }

        return version;
    }
}
