import * as React from "react";
import intl from "react-intl-universal";
import { Container, Divider, Grid, List, Menu, Tab } from "semantic-ui-react";
import MHHTML from "../../../lib/components/MHHTML";
import { INarrativeElementProps } from "../../../lib/library/INarrativeElementProps";
import { StatisticsTable } from "../../Layout/Statistics";
import { IDocumentProps } from "./IDocumentProps";


export default class PageDocument extends React.Component<IDocumentProps> {
    render() {
        const statistics = this.props.item.statistics;
        const panes = [
            {
                menuItem: intl.get("content"), render: () => (
                    <Tab.Pane tab="Content">
                        <Content children={this.props.children} />
                    </Tab.Pane>
                ),
            },
            {
                menuItem: intl.get("statistics"), render: () => (
                    <Tab.Pane tab="Statistics"><StatisticsTable statistics={statistics} /></Tab.Pane>
                ),
            },
        ];

        return (
            <Container>
                <Grid>
                    <Grid.Column width={14}>
                        <h1><MHHTML>{this.props.item.name}</MHHTML></h1>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Menu compact style={{backgroundColor: "#4F81BD"}}>
                            {this.props.header}
                        </Menu>
                    </Grid.Column>
                </Grid>
                <Divider />
                <Tab panes={panes} />
            </Container >
        );
    }
}

class Content extends React.Component<{ children: Array<React.ReactElement<INarrativeElementProps>> }> {
    render() {
        return (
            <List relaxed>
                {this.props.children.map(c => <List.Item key={c.props.children.id}>{c}</List.Item>)}
            </List>
        );
    }
}
