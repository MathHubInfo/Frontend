import * as React from "react";
import intl from "react-intl-universal";
import { Button, Container, Dropdown, Flag, Grid, Image, Menu } from "semantic-ui-react";

import { urls } from "../../../assets/urls";
import MHLink from "../../../lib/components/MHLink";
import { IBreadcrumb, IHeaderProps } from "../../../theming/Layout/IHeaderProps";
import MHAppContext from "../../../../src/lib/components/MHAppContext";

// tslint:disable: jsx-no-lambda
export class Header extends React.Component<IHeaderProps> {
    render() {
        const { title, crumbs } = this.props;

        return (
            <header>
                <MHAppContext.Consumer>
                    {value =>
                        <>
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
                                    <Dropdown text={intl.get("applications")} className="link item">
                                        <Dropdown.Menu>
                                            <MHLink href="/applications/glossary">
                                                <Dropdown.Item>{intl.get("glossary")}</Dropdown.Item>
                                            </MHLink>
                                            <MHLink href="/applications/dictionary">
                                                <Dropdown.Item>{intl.get("dictionary")}</Dropdown.Item>
                                            </MHLink>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown text="Help" className="link item">
                                        <Dropdown.Menu>
                                            <Dropdown.Item>
                                                <a href={urls.help.documentation} style={{ color: "black" }}>
                                                    {intl.get("documentation")}
                                    </a>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <a href={urls.help.browseSources} style={{ color: "black" }}>
                                                    {intl.get("sources")}
                                    </a>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <a href={urls.help.contactAHuman} style={{ color: "black" }}>
                                                {intl.get("contact")}
                                    </a>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <a href={urls.help.report} style={{ color: "black" }}>
                                                {intl.get("report")}
                                    </a>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <MHLink href="/news">
                                        <Menu.Item>
                                        {intl.get("news")}
                    </Menu.Item>
                                    </MHLink>
                                    <Menu.Item>
                                        <a href={urls.admin} style={{ color: "black" }}>
                                        {intl.get("admin")}
                            </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a href={urls.about} style={{ color: "black" }}>
                                        {intl.get("about")}
                            </a>
                                    </Menu.Item>
                                </Container>
                            </Menu>
                            <Container>
                                <Grid>
                                    <Grid.Column width={12}>
                                        <LayoutCrumbs crumbs={[...crumbs, { href: "", title: (title || [])[0] }]} />
                                    </Grid.Column>
                                    <Grid.Column width={4} textAlign={"right"}>
                                        <Button.Group compact basic size={"mini"} >
                                            <Button onClick={() => value.changeLanguage("de")}>
                                                <Flag name="de" />
                                            </Button>
                                            <Button onClick={() => value.changeLanguage("en")}>
                                                <Flag name="gb" />
                                            </Button>
                                        </Button.Group>
                                    </Grid.Column>
                                </Grid>
                            </Container>
                        </>
                    }
                </MHAppContext.Consumer>
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
