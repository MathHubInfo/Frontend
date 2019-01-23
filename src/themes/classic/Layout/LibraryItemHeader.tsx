import * as React from "react";
import { Button, Container, Dropdown, Grid, Icon, Label } from "semantic-ui-react";

import MHHTML from "../../../lib/components/MHHTML";

import { ILibraryItemHeaderProps } from "../../../theming/Layout/ILibraryItemHeaderProps";

import { StatisticsTable } from "./Statistics";


export default class LibraryItemHeader extends React.Component<ILibraryItemHeaderProps> {
    render() {
        const { statistics, sourceURL, jupyterURL, description, responsible } = this.props;

        return (
            <>
                <Grid>
                    <Grid.Column width={10}>
                        <Button icon>
                            <Icon name={"hand point right outline"} />
                            {sourceURL && <a href={sourceURL} style={{ color: "black" }}>View Source</a>}
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Container textAlign={"right"}>
                            <Dropdown text={"statistics"} button icon={null} pointing={"right"}>
                                <Dropdown.Menu>
                                    {statistics && <StatisticsTable statistics={statistics} />}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Container>
                    </Grid.Column>
                </Grid>
                <div>
                    {description && <MHHTML renderReferences>{description}</MHHTML>}
                    {responsible &&
                        <p><b>Responsible:</b> {responsible.map(p => <Label key={p}>{p}</Label>)}</p>}
                </div>
                <div>
                    {jupyterURL && <a href={jupyterURL}>Test on Jupyter</a>}
                </div>
                <hr />
            </>
        );
    }
}
