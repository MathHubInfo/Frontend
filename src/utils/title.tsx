import * as React from "react";
import DocumentTitle from "react-document-title";

interface IMHTTitleProps {
    title?: string;
    children?: React.ReactChild | React.ReactChild[];
}

export class MHTitle extends React.Component<IMHTTitleProps> {
    constructor(props: IMHTTitleProps) {
        super(props);
    }

    public render() {
        const {title, ...props} = this.props;
        return <DocumentTitle title={title ? `${title} | MathHub` : "MathHub"} {...props} />;
    }
}
