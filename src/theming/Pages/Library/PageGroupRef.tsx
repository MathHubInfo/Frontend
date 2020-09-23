import * as React from "react";
import { Card } from "semantic-ui-react";
import MHHTML from "../../../lib/components/MHHTML";
import MHLink, { IMHLinkable } from "../../../lib/components/MHLink";

import { IGroupRef } from "../../../context/LibraryClient/objects";

export interface IGroupRefProps {
    link: IMHLinkable;
    item: IGroupRef;
}

export default class PageGroupRef extends React.Component<IGroupRefProps> {
    render() {
        return (
            <Card link fluid>
                <Card.Content textAlign={"center"} style={{backgroundColor: "#4F81BD"}}>
                    <MHLink {...this.props.link}>
                        <Card.Header>
                            <MHHTML>
                                {this.props.item.name}
                            </MHHTML>
                        </Card.Header>
                    </MHLink>
                </Card.Content>
                <Card.Content>
                    <Card.Description>
                        <MHHTML as="div">{this.props.item.teaser}</MHHTML>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}
