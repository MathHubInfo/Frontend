import * as React from "react";

interface ILayoutHeaderProps {
    language: string; // the language that was negotiated with the client
}

export default class LayoutHeader extends React.Component<ILayoutHeaderProps> {
    render() {
        return (
            <>
                <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
            </>
        );
    }
}
