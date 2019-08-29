import * as React from "react";
import { Card, Icon } from "semantic-ui-react";
import MHLink from "../../../lib/components/MHLink";
import { IDocumentRefProps } from "./IDocumentRefProps";

export default class PageDocumentRef extends React.Component<IDocumentRefProps> {
    render() {
        return (
            <MHLink {...this.props.link}>
                <Card link fluid>
                    <Card.Content textAlign={"center"} style={{ backgroundColor: "#4F81BD", color: "#000000" }}>
                        <h4><Icon name="file outline" />{this.props.item.name}</h4>
                    </Card.Content>
                </Card>
            </MHLink>
        );
    }
}
