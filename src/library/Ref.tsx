import * as React from "react";
import { Card, Icon } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";
import MHHTML from "../components/MHHTML";
import MHLink, { IMHLinkable } from "../components/MHLink";
import copy from "copy-to-clipboard";

import { IArchiveRef, IDocument, IDocumentRef, IGroupRef } from "../context/LibraryClient/objects";
import { TranslateProps, WithTranslate } from "../locales/WithTranslate";

import styles from "./Ref.module.css";

export interface IRefProps {
    link: IMHLinkable;
    item: IArchiveRef | IGroupRef | IDocumentRef | IDocument;
}

export type IGroupRefProps = IRefProps & { item: IGroupRef };
export type IArchiveRefProps = IRefProps & { item: IArchiveRef };

class Ref extends React.Component<IRefProps & TranslateProps, { copied: boolean }> {
    state = {
        copied: false,
    };

    private timer: number | undefined = undefined;

    private readonly setCopyFlag = () => {
        this.setState({ copied: true });
        this.cancelCopyFlag();
        this.timer = (setTimeout(this.clearCopiedFlag, 1000) as unknown) as number;
    };

    private readonly cancelCopyFlag = () => {
        if (this.timer === undefined) return;
        clearTimeout(this.timer);
        this.timer = undefined;
    };

    private readonly clearCopiedFlag = () => {
        this.setState({ copied: false });
        this.timer = undefined;
    };

    private readonly handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation();
        event.preventDefault();

        if (!copy(this.props.item.id, { format: "text/plain" })) return;
        this.setCopyFlag();
    };

    componentWillUnmount() {
        this.clearCopiedFlag();
    }

    render() {
        const { copied } = this.state;

        const { link, item, t } = this.props;
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

                    <Card.Content extra className={styles.extra}>
                        <a onClick={this.handleClick}>
                            <Icon name={icon} />
                            {id}
                        </a>
                        <span className={copied ? styles.on : styles.off}>{t("copied")}</span>
                    </Card.Content>
                </Card>
            </MHLink>
        );
    }
}

export default WithTranslate(Ref);
