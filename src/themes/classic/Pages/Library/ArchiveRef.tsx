import * as React from "react";
import { Card } from "semantic-ui-react";

import MHLink from "../../../../lib/components/MHLink";
import { IArchiveRefProps } from "../../../../theming/Pages/Library/IArchiveRefProps";

import MHHTML from "../../../../lib/components/MHHTML";

export default class ArchiveRef extends React.Component<IArchiveRefProps> {
    render() {
        return (
            <MHLink {...this.props.link}>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            <MHHTML>{this.props.item.name}</MHHTML>
                        </Card.Header>
                        <Card.Description>
                            <MHHTML as="div">{this.props.item.teaser}</MHHTML>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </MHLink>
        );
    }
}
