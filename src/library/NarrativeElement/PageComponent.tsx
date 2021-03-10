import * as React from "react";
import MHHTML from "../../components/MHHTML";

import { IComponent } from "../../context/LibraryClient/objects";

export interface IComponentProps {
    children: IComponent;
}

export default class PageComponent extends React.Component<IComponentProps> {
    render() {
        const { name, component } = this.props.children;
        if (component.kind === "notation")
            return (
                <>
                    <b>{name}</b> <pre>{component.notation}</pre>
                </>
            );
        else
            return (
                <>
                    <b>{name}</b> <MHHTML>{component.object}</MHHTML>
                </>
            );
    }
}
