// tslint:disable:export-name
import * as React from "react";
import intl from "react-intl-universal";
import { Button, Container, Dropdown, Grid, Icon, Label, Popup } from "semantic-ui-react";
import { ISourceReference } from "../../context/LibraryClient/objects";
import { ObjectSource } from "../../context/LibraryClient/objects/utils";
import MHHTML from "../../lib/components/MHHTML";
import MHLink from "../../lib/components/MHLink";
import { StatisticsTable } from "../../theming/Layout/Statistics";
import { issueURL, jupyterURL, sourceURL, tgViewURL } from "../../utils/urls";
import { WithExtraProps } from "../../utils/WithExtraContext";
import { IActionDerived, IActionHeaderProps } from "./IActionHeaderProps";

export class ActionHeader extends React.Component<IActionHeaderProps> {
    sourceButton() {
        const { sourceURL: source } = this.props;
        if (source === undefined)
            return null;

        return (
            <Button icon>
                <Icon name={"hand point right outline"} />
                <a href={source} style={{ color: "black" }}>{intl.get("view source")}</a>
            </Button>
        );
    }
    tgViewButton() {
        const { tgViewURL: tgview } = this.props;
        if (tgview === undefined)
            return null;

        return (
            <Button icon>
                <Icon name={"hand point right outline"} />
                <MHLink href={tgview}><a style={{ color: "black" }}>{intl.get("view tgview")}</a></MHLink>
            </Button>
        );
    }
    reportButton() {
        const { issueURL: issue } = this.props;
        if (issueURL === undefined)
            return null;

        return (
            <Popup
                trigger={
                    <Button color="green">
                        <a href={issue} style={{ color: "black" }}>{intl.get("report")}</a>
                    </Button>
                }
                content={intl.get("issue")}
            />
        );
    }
    render() {
        const { statistics, jupyterURL: jupyter, description, responsible } = this.props;

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
                    {jupyterURL && <a href={jupyter}>{intl.get("jupyter")}</a>}
                </div>
                <hr />
            </>
        );
    }
}

export default WithExtraProps<IActionDerived, IActionHeaderProps>(ActionHeader, ({ obj }) => {
    const source = obj && ObjectSource(obj);

    // if we have a notebook-tagged document, we need to add the jupyter source to it
    let jupyter: ISourceReference | undefined;
    if (obj && obj.kind === "document" && obj.tags && obj.tags.indexOf("ipynb-omdoc") >= -1)
        jupyter = ObjectSource(obj);

    return {
        sourceURL: source && sourceURL(source),
        issueURL: source && issueURL(source),
        jupyterURL: jupyter && jupyterURL(jupyter),
        tgViewURL: obj && tgViewURL(obj),
    };
});

