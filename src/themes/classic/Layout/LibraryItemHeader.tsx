import * as React from "react";
import { Button, Container, Dropdown, Grid, Icon, Label } from "semantic-ui-react";

import MHHTML from "../../../lib/components/MHHTML";

import { ILibraryItemHeaderProps } from "../../../theming/Layout/ILibraryItemHeaderProps";

import { StatisticsTable } from "./Statistics";

export default class LibraryItemHeader extends React.Component<ILibraryItemHeaderProps> {
    sourceButton() {
        const { sourceURL } = this.props;
        if (sourceURL === undefined)
            return null;

        return (
            <Button icon>
                <Icon name={"hand point right outline"} />
                <a href={sourceURL} style={{ color: "black" }}>View Source</a>
            </Button>
        );
    }
    reportButton() {
        const { issueURL } = this.props;
        if (issueURL === undefined)
            return null;

        return (
            <Button>
                <a href={issueURL} style={{ color: "black" }}>Report an Issue</a>
            </Button>
        );
    }
    render() {
        const { statistics, jupyterURL, description, responsible } = this.props;

        return (
            <>
                <Grid>
                    <Grid.Column width={10}>
                        {this.sourceButton()}
                        {this.reportButton()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Container textAlign={"right"}>
                            <Dropdown text={"statistics"} button icon={null} pointing={"right"}>
                                <Dropdown.Menu>
                                    <StatisticsTable statistics={statistics} />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Container>
                    </Grid.Column>
                </Grid>
                <div>
                    {description && <MHHTML renderReferences>{description}</MHHTML>}
                    {responsible &&
                        <div><b>Responsible:</b> {responsible.map(p => <Label key={p}>{p}</Label>)}</div>}
                </div>
                <div>
                    {jupyterURL && <a href={jupyterURL}>Test on Jupyter</a>}
                </div>
                <hr />
            </>
        );
    }
}
