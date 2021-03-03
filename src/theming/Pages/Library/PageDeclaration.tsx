import * as React from "react";
import { Button, Icon, Loader } from "semantic-ui-react";

import { IDeclaration, IDeclarationRef } from "../../../context/LibraryClient/objects";
import { TranslateProps, WithTranslate } from "../../../locales/WithTranslate";
import { IComponentProps } from "./PageComponent";
import { IDocumentProps } from "./PageDocument";

interface IDeclarationProps {
    item: IDeclaration | IDeclarationRef;

    // the declarations within this module
    // and the components of this declaration
    children: [IDocumentProps["children"], Array<React.ReactElement<IComponentProps>>];

    // is this item expanded?
    expanded: boolean;

    // ref to toggle the expansion of this element
    toggleExpansion(): void;
}

class PageDeclaration extends React.Component<IDeclarationProps & TranslateProps> {
    private static readonly names = {
        structure: "Structure",
        rule: "Rule Constant",
        constant: "Constant",
        nested: "Nested",
    };

    render() {
        const {
            expanded,
            item,
            children: [children, components],
            t,
        } = this.props;

        return (
            <>
                {item.ref ? (
                    <>
                        <Loader active inline size={"mini"} />
                        {t("declaration")}
                    </>
                ) : (
                    PageDeclaration.names[item.declaration.kind]
                )}
                &nbsp;
                <Button onClick={this.toggleExpansion} compact size={"tiny"}>
                    <h5>
                        {item.name}
                        &emsp;
                        {expanded ? <Icon name="angle double up" fitted /> : <Icon name="angle double down" fitted />}
                    </h5>
                </Button>
                {expanded &&
                    (children !== undefined ? (
                        <ul>
                            {children.map(c => (
                                <li key={c.props.children.id}>{c}</li>
                            ))}
                        </ul>
                    ) : (
                        <Loader active inline size={"mini"}>
                            {t("load children")}
                        </Loader>
                    ))}
                {expanded &&
                    (components !== undefined ? (
                        <ul>
                            {components.map(c => (
                                <li key={c.props.children.name}>{c}</li>
                            ))}
                        </ul>
                    ) : (
                        <Loader active inline size={"mini"}>
                            {t("loading components")}
                        </Loader>
                    ))}
            </>
        );
    }
    private readonly toggleExpansion = () => this.props.toggleExpansion();
}

export default WithTranslate(PageDeclaration);
