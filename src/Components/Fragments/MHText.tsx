import * as React from "react";

import { TextFill } from "../MathHubLayout";

export default class MHText extends React.Component {
    render() {
        return <TextFill>{this.props.children}</TextFill>;
    }
}
