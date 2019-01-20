import * as React from "react";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";

import MHLink from "../../../lib/components/MHLink";
import { IBreadcrumb, IHeaderProps } from "../../../theming/Layout/IHeaderProps";

export class Header extends React.Component<IHeaderProps> {
    render() {
        const { title, crumbs } = this.props;

        return (
            <header>
                <Menu>
                    <Container>
                        <MHLink href="/">
                            <Menu.Item header>
                                <Image
                                    size="mini"
                                    src={"/static/logos/MathHub.svg"}
                                    style={{ marginRight: "1.5em" }}
                                    alt="MathHub Logo"
                                />
                                MathHub
                    </Menu.Item>
                        </MHLink>
                        <Dropdown text="Applications" className="link item">
                            <Dropdown.Menu>
                                <MHLink href="/applications/glossary">
                                    <Dropdown.Item>glossary</Dropdown.Item>
                                </MHLink>
                                <MHLink href="/applications/dictionary">
                                    <Dropdown.Item>
                                        math dictionary
                            </Dropdown.Item>
                                </MHLink>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown text="Help" className="link item">
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    Documentation
                            </Dropdown.Item>
                                <Dropdown.Item>
                                    Browse Sources
                            </Dropdown.Item>
                                <Dropdown.Item>
                                    Contact a Human
                            </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <MHLink href="/news">
                            <Menu.Item>
                                News
                    </Menu.Item>
                        </MHLink>
                        <Menu.Item>
                            Admin
                    </Menu.Item>
                        <Menu.Item>
                            About
                    </Menu.Item>
                    </Container>
                </Menu>
                <Container>
                    <LayoutCrumbs crumbs={[...crumbs, { href: "", title: (title || [])[0] }]} />
                </Container>
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
