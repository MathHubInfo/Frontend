import * as React from "react";
import { default as DocumentTitle } from "react-document-title";

import { PropsOfComponent } from "../../Types/react";
import { MemberType } from "../../Types/utils";
import { Breadcrumbs } from "../Common";
import { TitleFill } from "../MathHubLayout";

import MHBreadCrumbs from "./MHBreadCrumbs";

type IBreadCrumbPart = MemberType<PropsOfComponent<Breadcrumbs>["crumbs"]>;

interface ITitleProps {
    title?: string;
    autoCrumbs?: boolean | IBreadCrumbPart[];
    children?: React.ReactChild | React.ReactChild[] | null;
}

export default function MHTitle(props: ITitleProps) {
    const { title, autoCrumbs, children } = props;

    const theTitle = title || "";
    const theCrumbs = autoCrumbs ?
        [...(typeof autoCrumbs === "boolean" ? [] : autoCrumbs), {text: props.title || ""}] : null;

    return (
        <Title title={theTitle}>
            <>
                {theCrumbs ? <MHBreadCrumbs crumbs={theCrumbs} /> : null}
                <TitleFill>{theTitle}</TitleFill>
                {children}
            </>
        </Title>
    );
}

// Renders a set of children with a given title
function Title(props: {title: string; children: React.ReactChild}) {
    const {title, children} = props;
    const child = <>{children}</>;

    return <DocumentTitle title={title ? `${title} | MathHub` : "MathHub"} children={child} />;
}
