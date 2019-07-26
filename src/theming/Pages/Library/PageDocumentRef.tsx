import * as React from "react";
import { Icon, Label } from "semantic-ui-react";
import MHLink from "../../../lib/components/MHLink";
import { IDocumentRefProps } from "./IDocumentRefProps";

export default class PageDocumentRef extends React.Component<IDocumentRefProps> {
    render() {
        return (
            <MHLink {...this.props.link}>
                <Label as="a" size="large"><Icon name="file outline" />{this.props.item.name}</Label>
            </MHLink>
        );
    }
}
