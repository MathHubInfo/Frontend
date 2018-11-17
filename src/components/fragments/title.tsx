import * as React from "react";

import DocumentTitle from "react-document-title";
import { Header } from "semantic-ui-react";

import HTML from "./html";

import { TitleFill } from "../layout";

interface ITitleProps {
    title?: string;
    children?: React.ReactChild | React.ReactChild[];
}

/** Renders a set of children with a given title */
function Title(props: ITitleProps) {
    const {title, children} = props;
    const child = Array.isArray(children) ? <>{children}</> : children;
    return <DocumentTitle title={title ? `${title} | MathHub` : "MathHub"} children={child} />;
}

export default function MHTitle(props: ITitleProps) {
    return (
        <Title title={props.title}>
            <>
                <TitleFill>
                    {props.title ? <HTML as={Header} extra={{as: "h1", style: {marginTop: 0}}}>
                        {props.title}</HTML> : null}
                </TitleFill>
                {props.children}
            </>
        </Title>
    );
}
