import * as React from "react";
import { TextFill } from "../layout";

export default class MHText extends React.Component {
    public render() {
        return <TextFill>{this.props.children}</TextFill>;
    }
}
