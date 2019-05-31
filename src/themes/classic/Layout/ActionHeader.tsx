import * as React from "react";
import intl from "react-intl-universal";
import { Button, Container, Dropdown, Grid, Icon, Label, Popup } from "semantic-ui-react";

import MHHTML from "../../../lib/components/MHHTML";

import { IActionHeaderProps } from "../../../theming/Layout/IActionHeaderProps";

import { StatisticsTable } from "./Statistics";
import MHLink from "../../../lib/components/MHLink";

export default class ActionHeader extends React.Component<IActionHeaderProps> {
    sourceButton() {
        const { sourceURL } = this.props;
        if (sourceURL === undefined)
            return null;

        return (
            <Button icon>
                <Icon name={"hand point right outline"} />
                <a href={sourceURL} style={{ color: "black" }}>{intl.get("view source")}</a>
            </Button>
        );
    }
    tgViewButton() {
        const { tgViewURL } = this.props;
        if (tgViewURL === undefined)
            return null;

        return (
            <Button icon>
                <Icon name={"hand point right outline"} />
                <MHLink href={tgViewURL}><a style={{ color: "black" }}>{intl.get("view tgview")}</a></MHLink>
            </Button>
        );
    }
    reportButton() {
        const { issueURL } = this.props;
        if (issueURL === undefined)
            return null;

        return (
            <Popup
                trigger={
                    <Button color="green">
                        <a href={issueURL} style={{ color: "black" }}>{intl.get("report")}</a>
                    </Button>
                }
                content={intl.get("issue")}
            />
        );
    }
    render() {
        const { statistics, jupyterURL, description, responsible } = this.props;

        return (
            <>
                <Grid>
                    <Grid.Column width={10}>
                        {this.sourceButton()}
                        {this.tgViewButton()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Container textAlign={"right"}>
                            {this.reportButton()}
                            <Dropdown text={intl.get("statistics")} button icon={null} pointing={"right"}>
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
                        <div><b>{intl.get("responsible")}:</b> {responsible.map(p => <Label key={p}>{p}</Label>)}</div>}
                </div>
                <div>
                    {jupyterURL && <a href={jupyterURL}>{intl.get("jupyter")}</a>}
                </div>
                <hr />
            </>
        );
    }
}
