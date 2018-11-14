import * as React from "react";
import DocumentTitle from "react-document-title";

interface ITitleProps {
    title?: string;
    children?: React.ReactChild | React.ReactChild[];
}

/** Renders a set of children with a given title */
export default function Title(props: ITitleProps) {
    const {title, children} = props;
    const child = Array.isArray(children) ? <>{children}</> : children;
    return <DocumentTitle title={title ? `${title} | MathHub` : "MathHub"} children={child} />;
}
