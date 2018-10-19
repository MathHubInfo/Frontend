import * as React from "react";
import DocumentTitle from "react-document-title";

interface IMHTTitleProps {
    title?: string;
    children?: React.ReactChild | React.ReactChild[];
}

export function MHTitle(props: IMHTTitleProps) {
    const {title, ...rprops} = props;
    return <DocumentTitle title={title ? `${title} | MathHub` : "MathHub"} {...rprops} />;
}
