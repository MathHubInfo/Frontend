import * as React from "react";
import { HTML } from "../../context/api";

export class MathHTML extends React.Component<{content: HTML}> {
    public render() {
        const{ content } = this.props;
        return (
            <div dangerouslySetInnerHTML={{__html: content}} />
        );
    }
}
