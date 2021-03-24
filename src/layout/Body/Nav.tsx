import { WithRouterProps } from "next/dist/client/with-router";
import { NextRouter, withRouter } from "next/router";
import * as React from "react";
import { Button, Container, Dropdown, Flag, FlagNameValues, Grid, Image, Menu } from "semantic-ui-react";
import { urls } from "../../assets/urls";
import MHLink, { IMHLinkable } from "../../components/MHLink";
import { supportedLocales } from "../../locales";
import { LocaleContext, LocaleContextProps, TranslateProps, WithTranslate } from "../../locales/WithTranslate";
import styles from "./Nav.module.css";

interface NavProps {
    /** the title of the page */
    title?: string[];

    /** the breadcrumbs pointing to the current page */

    crumbs: IBreadcrumb[];
}

/**
 * A breadcrumb to anything
 */
export interface IBreadcrumb extends IMHLinkable {
    // the title of the breadcrumb
    title: string;
}

/** MathHub Navigation Menu */
class Nav extends React.Component<NavProps & WithRouterProps & TranslateProps> {
    render() {
        const { title, crumbs, router, t } = this.props;
        return (
            <nav>
                <Menu className={styles.menu}>
                    <MHLink href="/">
                        <Menu.Item header>
                            <Image
                                size="mini"
                                src={"/static/logos/MathHub.svg"}
                                className={styles.logo}
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
                                <a href={urls.help.documentation}>{t("documentation")}</a>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <a href={urls.help.browseSources}>{t("sources")}</a>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <a href={urls.help.contactAHuman}>{t("contact")}</a>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <a href={urls.help.report}>{t("report")}</a>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <MHLink href="/news">
                        <Menu.Item>{t("news")}</Menu.Item>
                    </MHLink>
                    <Menu.Item>
                        <a href={urls.admin}>{t("admin")}</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a href={urls.about}>{t("about")}</a>
                    </Menu.Item>
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

export default WithTranslate(withRouter(Nav));

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
        return crumbs.map(c => <LayoutCrumb key={JSON.stringify(c)} {...c} />);
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
