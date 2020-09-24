import * as React from "react";
import { Card } from "semantic-ui-react";
import MHHTML from "../../../components/MHHTML";
import MHLink, { IMHLinkable } from "../../../components/MHLink";

import { IArchiveRef } from "../../../context/LibraryClient/objects";

export interface IArchiveRefProps {
    link: IMHLinkable;
    item: IArchiveRef;
}


export default class PageArchiveRef extends React.Component<IArchiveRefProps> {
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
