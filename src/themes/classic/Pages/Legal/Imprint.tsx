import * as React from "react";

import { IImprintProps } from "../../../../theming/Pages/Legal/IImprintProps";

export default class Imprint extends React.Component<IImprintProps> {
    render() {
        return (
            <pre>
                {this.props.imprint}
            </pre>
        );
    }
}
