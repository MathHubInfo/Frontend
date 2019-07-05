import * as React from "react";
import { Button, Container, Dropdown, List, Tab, Grid, Divider, Menu } from "semantic-ui-react";

import MHHTML from "../../../../lib/components/MHHTML";
import { IDocumentProps } from "../../../../theming/Pages/Library/IDocumentProps";
import { INarrativeElementProps } from "../../../../lib/library/INarrativeElementProps";
import { StatisticsTable } from "../../Layout/Statistics";

export default class Document extends React.Component<IDocumentProps> {
    state = { alt: false };
    handleClick = () => {
        this.setState({ alt: !this.state.alt });
    }
    render() {
        return (
            <Container>
                <Button onClick={this.handleClick}>Change Design</Button>
                {
                    !this.state.alt &&
                    <ClassicDoc {...this.props} />
                }
                {
                    this.state.alt &&
                    <AltDoc {...this.props} />
                }
            </Container >
        );
    }
}
class ClassicDoc extends React.Component<IDocumentProps> {
    render() {
        return (
            <>
                <h1><MHHTML>{this.props.item.name}</MHHTML></h1>
                {this.props.header}
                < List relaxed >
                    {this.props.children.map(c => <List.Item key={c.props.children.id}>{c}</List.Item>)}
                </List >
            </>
        );
    }
}

class AltDoc extends React.Component<IDocumentProps> {
    render() {
        const { sourceURL, jupyterURL, issueURL, tgViewURL } = this.props.header.props;
        const statistics = this.props.header.props.statistics;
        const panes = [
            {
                menuItem: "Content", render: () => (
                    <Tab.Pane tab="Content">
                        <Content children={this.props.children} />
                    </Tab.Pane>
                ),
            },
            {
                menuItem: "statistics", render: () => (
                    <Tab.Pane tab="Statistics"><StatisticsTable statistics={statistics} /></Tab.Pane>
                ),
            },
        ];

        return (
            <>
                <Grid>
                    <Grid.Column width={14}>
                        <h1><MHHTML>{this.props.item.name}</MHHTML></h1>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Menu compact>
                            <Dropdown text={"More"} simple item>
                                <Dropdown.Menu className="link item">
                                    <Dropdown.Item>
                                        <a href={sourceURL} style={{ color: "black" }}>Source</a>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <a href={tgViewURL} style={{ color: "black" }}>TGView</a>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <a href={jupyterURL} style={{ color: "black" }}>Jupyter</a>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <a href={issueURL} style={{ color: "black" }}>Issue</a>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu>
                    </Grid.Column>
                </Grid>
                <Divider />
                <Tab panes={panes} />
            </>
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
