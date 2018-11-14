import * as React from "react";
import DocumentTitle from "react-document-title";

interface ITitleProps {
    title?: string;
    children?: React.ReactChild | React.ReactChild[];
}

export default function Title(props: ITitleProps) {
    const {title, ...rprops} = props;
    return <DocumentTitle title={title ? `${title} | MathHub` : "MathHub"} {...rprops} />;
}
