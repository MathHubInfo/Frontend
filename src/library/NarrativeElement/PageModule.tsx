import * as React from "react";
import { Button, Card, Icon, Loader } from "semantic-ui-react";
import { INarrativeElementProps } from ".";
import { IModule, IModuleRef } from "../../context/LibraryClient/objects";
import { TranslateProps, WithTranslate } from "../../locales/WithTranslate";

export interface IModuleProps {
    item: IModule | IModuleRef;

    // all the children of this module (if any)
    children?: Array<React.ReactElement<INarrativeElementProps>>;

    // is this item expanded?
    expanded: boolean;

    // ref to toggle the expansion of this element
    toggleExpansion(): void;
}

class PageModule extends React.Component<IModuleProps & TranslateProps> {
    render() {
        const { expanded, item, children, t } = this.props;

        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        <Button
                            compact
                            size={"small"}
                            onClick={this.toggleExpansion}
                            style={{ backgroundColor: "#4F81BD" }}
                        >
                            <h4>
                                <b>{item.name}</b>
                                &emsp;
                                {expanded ? (
                                    <Icon name="angle double up" fitted />
                                ) : (
                                    <Icon name="angle double down" fitted />
                                )}
                            </h4>
                        </Button>
                    </Card.Header>
                    <Card.Meta>{item.ref ? "Module" : item.mod.kind === "theory" ? "Theory" : "View"}</Card.Meta>
                    <Card.Description>
                        {expanded &&
                            (children !== undefined ? (
                                <ul>
                                    {children.map(c => (
                                        <li key={c.props.children.id} style={{ marginTop: "0.5em" }}>
                                            {c}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <Loader active>{t("loading")}</Loader>
                            ))}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
    private readonly toggleExpansion = () => this.props.toggleExpansion();
}

export default WithTranslate(PageModule);
