import * as React from "react";
import MHHTML from "../../../lib/components/MHHTML";
import { IComponentProps } from "./IComponentProps";

export default class PageComponent extends React.Component<IComponentProps> {
    render() {
        const {name, component} = this.props.children;
        if (component.kind === "notation")
            return <><b>{name}</b> <pre>{component.notation}</pre></>;
        else
            return <><b>{name}</b> <MHHTML renderReferences>{component.object}</MHHTML></>;
    }
}
