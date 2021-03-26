import dynamic from "next/dynamic";

import Head from "next/head";
import * as React from "react";
import { Container, Divider } from "semantic-ui-react";
import { IReferencable } from "../context/LibraryClient/objects";
import { ObjectParents } from "../context/LibraryClient/objects/utils";
import { TranslateProps, WithTranslate } from "../locales/WithTranslate";

import { HeaderProps } from "./Header";
const ActionHeader = dynamic(() => import("./Header"));

import { IBreadcrumb } from "./Nav";
const Nav = dynamic(() => import("./Nav"));

const Footer = dynamic(() => import("./Footer"));

type LayoutProps = LayoutStateProps | LayoutObjProps;

interface LayoutObjProps {
    obj: IReferencable;
}

interface LayoutStateProps extends Omit<LayoutState, "actionHeader" | "noactions" | "plain"> {
    actionHeader?: HeaderProps;
    /** when set, omit the header entirely! */
    plain?: true;
}

interface LayoutState {
    /** title of the current page */
    title: string;

    /** description of the current page */
    description?: string;

    /** crumbs to the current page */
    crumbs: IBreadcrumb[];

    /** when set, omit the actionHeader */
    plain: boolean;

    /* don't show the action buttons */
    noactions: boolean;

    /** when set create an Action header based on the props */
    actionHeader: HeaderProps;
}

class Layout extends React.Component<LayoutProps & TranslateProps, LayoutState> {
    state: LayoutState = { crumbs: [], title: "", actionHeader: { title: "" }, plain: false, noactions: false };
    static getDerivedStateFromProps(props: LayoutProps & TranslateProps): LayoutState {
        if (!("obj" in props)) {
            // make an actionHeader if it's missing!
            let { actionHeader } = props;
            if (actionHeader === undefined) {
                const { title, description } = props;
                actionHeader = {
                    title: title,
                    description,
                };
            }

            return { ...props, actionHeader, plain: "plain" in props, noactions: true };
        }
        const { obj, t } = props;

        // get the parents of this element, excluding itself
        const objcrumbs: IBreadcrumb[] = ObjectParents(obj).map(({ kind, name, id }) => {
            if (kind !== "document" && kind !== "archive" && kind !== "group") {
                return { href: "", title: name };
            }

            return {
                href: { kind, id },
                title: name,
            };
        });

        const crumbs = [
            { href: "/", title: t("home") } as IBreadcrumb,
            { href: "/library", title: t("library") } as IBreadcrumb,
        ].concat(objcrumbs);

        // get other properties
        const title = "title" in obj ? obj.title : obj.name;
        const description = "description" in obj ? obj.description : undefined;
        const actionHeader: HeaderProps = { obj, title, description };

        return { crumbs, title, description, actionHeader, plain: false, noactions: false };
    }

    render() {
        const { children } = this.props;
        const { description, title, crumbs, actionHeader, plain, noactions } = this.state;

        // generate the title
        const theTitle = title ? `${title} | MathHub` : "MathHub";

        return (
            <Container>
                <Head>
                    <title>{theTitle}</title>
                    {description && <meta name="description" content={description} />}
                </Head>
                <Nav title={title ? [title] : undefined} crumbs={crumbs} />
                <Divider />
                {!plain && <ActionHeader {...actionHeader} noactions={noactions} />}
                <main>{children}</main>
                <Divider />
                <Footer />
            </Container>
        );
    }
}

export default WithTranslate<LayoutProps & TranslateProps, LayoutProps>(Layout);
