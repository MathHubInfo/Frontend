import { withRouter, NextRouter } from "next/router";
import * as React from "react";
import { Button, Container, Dropdown, Flag, Grid, Image, Menu, FlagNameValues } from "semantic-ui-react";

import { urls } from "../assets/urls";
import MHLink from "../components/MHLink";
import { LocaleContext, LocaleContextProps, TranslateProps, WithTranslate } from "../locales/WithTranslate";
import { supportedLocales } from "../locales";
import { IBreadcrumb } from "./Props";

interface IHeaderProps {
    /**
     * The title of the current page, consisting out of differenct components
     */
    title?: string[];

    /**
     * The breadcrumbs to the current page.
     * Each Component is a pair of (title, url) to be used as arguments for creating a link.
     */
    crumbs: IBreadcrumb[];
}

class Header extends React.Component<IHeaderProps & { router: NextRouter } & TranslateProps> {
    render() {
        const { title, crumbs, router, t } = this.props;
        return (
            <nav>
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
                        <Dropdown text={t("applications")} className="link item">
                            <Dropdown.Menu>
                                <MHLink href="/applications/glossary">
                                    <Dropdown.Item>{t("glossary")}</Dropdown.Item>
                                </MHLink>
                                <MHLink href="/applications/dictionary">
                                    <Dropdown.Item>{t("dictionary")}</Dropdown.Item>
                                </MHLink>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown text={t("help")} className="link item">
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <a href={urls.help.documentation} style={{ color: "black" }}>
                                        {t("documentation")}
                                    </a>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <a href={urls.help.browseSources} style={{ color: "black" }}>
                                        {t("sources")}
                                    </a>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <a href={urls.help.contactAHuman} style={{ color: "black" }}>
                                        {t("contact")}
                                    </a>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <a href={urls.help.report} style={{ color: "black" }}>
                                        {t("report")}
                                    </a>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <MHLink href="/news">
                            <Menu.Item>{t("news")}</Menu.Item>
                        </MHLink>
                        <Menu.Item>
                            <a href={urls.admin} style={{ color: "black" }}>
                                {t("admin")}
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                            <a href={urls.about} style={{ color: "black" }}>
                                {t("about")}
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
                            <Button.Group compact basic size={"mini"}>
                                {supportedLocales.map(locale => (
                                    <LocaleButton key={locale} locale={locale} router={router} />
                                ))}
                            </Button.Group>
                        </Grid.Column>
                    </Grid>
                </Container>
            </nav>
        );
    }
}

export default WithTranslate(withRouter(Header));

class LocaleButton extends React.Component<{
    locale: string;
    router: NextRouter;
}> {
    static contextType = LocaleContext;
    context!: LocaleContextProps;

    render() {
        const { locale, router } = this.props;
        return (
            <MHLink href={router.asPath} locale={locale}>
                <Button as={"a"} active={locale === this.context.locale}>
                    <Flag name={LocaleButton.getFlag(locale)} />
                </Button>
            </MHLink>
        );
    }

    private static getFlag(language: string) {
        const flags: { [lang: string]: FlagNameValues | undefined } = { en: "gb" };

        return flags[language] || (language as FlagNameValues);
    }
}

class LayoutCrumbs extends React.Component<{ crumbs: IBreadcrumb[] }> {
    render() {
        const { crumbs } = this.props;
        return (
            <>
                {crumbs.map(c => (
                    <LayoutCrumb key={JSON.stringify(c)} {...c} />
                ))}
            </>
        );
    }
}

class LayoutCrumb extends React.Component<IBreadcrumb> {
    render() {
        const { href, title, ...rest } = this.props;
        if (href === "") return <b>{title}</b>;

        return (
            <>
                <MHLink href={href} {...rest}>
                    <a>{title}</a>
                </MHLink>
                &nbsp;&gt;&nbsp;
            </>
        );
    }
}
