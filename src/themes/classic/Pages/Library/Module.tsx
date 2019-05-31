import * as React from "react";
import intl from "react-intl-universal";
import { Button, Card, Icon, List, Loader } from "semantic-ui-react";

import { IModuleProps } from "../../../../theming/Pages/Library/IModuleProps";

export default class Module extends React.Component<IModuleProps> {
    render() {
        const { expanded, item, children } = this.props;

        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        {item.name}
                        <Button onClick={this.toggleExpansion} icon floated={"right"}>
                            {expanded ? <Icon name="angle double up" /> : <Icon name="angle double down" />}
                        </Button>
                    </Card.Header>
                    <Card.Meta>
                        {item.ref ? "Module" : item.mod.kind === "theory" ? "Theory" : "View"}
                    </Card.Meta>
                    <Card.Description>
                        {expanded && (children !== undefined ?
                            <List bulleted>
                                {children.map(c => <List.Item key={c.props.children.id}>{c}</List.Item>)}
                            </List> :
                            <Loader active>{intl.get("loading")}</Loader>)
                        }
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
    private readonly toggleExpansion = () => this.props.toggleExpansion();
}
