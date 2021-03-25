import * as React from "react";
import { Card } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";
import Copyable from "../components/Copyable";
import MHHTML from "../components/MHHTML";
import MHLink, { IMHLinkable } from "../components/MHLink";

import { IArchiveRef, IDocument, IDocumentRef, IGroupRef } from "../context/LibraryClient/objects";

export interface IRefProps {
    link: IMHLinkable;
    item: IArchiveRef | IGroupRef | IDocumentRef | IDocument;
}

export type IGroupRefProps = IRefProps & { item: IGroupRef };
export type IArchiveRefProps = IRefProps & { item: IArchiveRef };

export default class Ref extends React.Component<IRefProps> {
    render() {
        const { link, item } = this.props;
        const { kind, name, id, teaser } = { teaser: undefined, ...item };

        let icon: SemanticICONS;
        if (kind == "archive") {
            icon = "archive";
        } else if (kind == "document") {
            icon = "file outline";
        } else {
            icon = "group";
        }

        const teaserDescription = teaser && (
            <Card.Content>
                <Card.Description>
                    <MHHTML as="div">{teaser}</MHHTML>
                </Card.Description>
            </Card.Content>
        );

        return (
            <MHLink {...link}>
                <Card link fluid>
                    <Card.Content>
                        <Card.Header>
                            <MHHTML>{name}</MHHTML>
                        </Card.Header>
                    </Card.Content>

                    {teaserDescription}

                    <Card.Content extra>
                        <Copyable icon={icon}>{id}</Copyable>
                    </Card.Content>
                </Card>
            </MHLink>
        );
    }
}
