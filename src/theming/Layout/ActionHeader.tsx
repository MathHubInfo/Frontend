// tslint:disable:export-name
import * as React from "react";
import intl from "react-intl-universal";
import { Button, Container, Dropdown, Grid, Icon, Label, Popup } from "semantic-ui-react";
import { IDocument, IReferencable, ISourceReference, IStatistic } from "../../context/LibraryClient/objects";
import { ObjectSource } from "../../context/LibraryClient/objects/utils";
import MHHTML from "../../components/MHHTML";
import MHLink from "../../components/MHLink";
import { StatisticsTable } from "../../theming/Layout/Statistics";
import { IssueURL, ITGViewData, JupyterURL, SourceURL, TGViewURL } from "../../utils/URLs";
import { WithExtraProps } from "../../utils/WithExtraContext";
import TGViewLink from "../../components/TGViewLink";
import TGView3DLink from "../../components/TGView3DLink";

export interface IActionHeaderProps extends IActionDerived {
    // description of the element in question, may contain html
    description?: string;

    // referenced object by this page
    obj?: IReferencable;

    // statistics (if any)
    statistics?: IStatistic[];

    // a list of people responsible for the item
    responsible?: string[];
}

interface IActionDerived {
    // the url to the source (if any)
    sourceURL?: string;

    // the url to tgview (if any)
    tgViewURL?: ITGViewData;

    // the url to issues (if any)
    issueURL?: string;

    // the url to open a jupyter notebook (if any)
    jupyterURL?: string;
}

export class ActionHeader extends React.Component<IActionHeaderProps> {
    private sourceButton() {
        const { sourceURL: source } = this.props;
        if (source === undefined) return null;

        return (
            <Button icon>
                <Icon name={"hand point right outline"} />
                <a href={source} style={{ color: "black" }}>
                    {intl.get("view source")}
                </a>
            </Button>
        );
    }
    private tgViewButton() {
        const { tgViewURL: tgview } = this.props;
        if (tgview === undefined) return null;

        return (
            <Button icon>
                <Icon name={"hand point right outline"} />
                <TGViewLink {...tgview}>{intl.get("view tgview")}</TGViewLink>
            </Button>
        );
    }
    private tgView3DButton() {
        const { tgViewURL: tgview } = this.props;
        if (tgview === undefined) return null;

        return (
            <Button icon>
                <Icon name={"hand point right outline"} />
                <TGView3DLink {...tgview}>{intl.get("view tgview3d")}</TGView3DLink>
            </Button>
        );
    }
    private jupyterButton() {
        const { jupyterURL: jupyter } = this.props;
        if (jupyter === undefined) return null;

        return (
            <Button icon>
                <Icon name={"hand point right outline"} />
                <MHLink href={jupyter}>
                    <a style={{ color: "black" }}>{intl.get("jupyter")}</a>
                </MHLink>
            </Button>
        );
    }
    private reportButton() {
        const { issueURL: issue } = this.props;
        if (IssueURL === undefined) return null;

        return (
            <Popup
                trigger={
                    <Button color="green">
                        <a href={issue} style={{ color: "black" }}>
                            {intl.get("report")}
                        </a>
                    </Button>
                }
                content={intl.get("issue")}
            />
        );
    }
    render() {
        const { statistics, description, responsible } = this.props;
        if ((this.props.obj as IDocument) && (this.props.obj as IDocument).kind === "document")
            return <DocumentActionHeader {...this.props} />;

        return (
            <>
                <Grid>
                    <Grid.Column width={11}>
                        {this.sourceButton()}
                        {this.tgViewButton()}
                        {this.tgView3DButton()}
                        {this.jupyterButton()}
                        <div>{description && <MHHTML>{description}</MHHTML>}</div>
                    </Grid.Column>
                    <Grid.Column width={5}>
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
                    {responsible && (
                        <div>
                            <b>{intl.get("responsible")}:</b>{" "}
                            {responsible.map(p => (
                                <Label key={p}>{p}</Label>
                            ))}
                        </div>
                    )}
                </div>
                <hr />
            </>
        );
    }
}

class DocumentActionHeader extends React.Component<IActionHeaderProps> {
    render() {
        const { sourceURL: source } = this.props;
        const { tgViewURL: tgview } = this.props;
        const { issueURL: issue } = this.props;
        const { jupyterURL: jupyter } = this.props;

        return (
            <Dropdown text={intl.get("more")} simple item>
                <Dropdown.Menu className="link item">
                    {source && (
                        <Dropdown.Item>
                            <a href={source} style={{ color: "black" }}>
                                {intl.get("view source")}
                            </a>
                        </Dropdown.Item>
                    )}
                    {tgview && (
                        <Dropdown.Item>
                            <TGViewLink {...tgview}>{intl.get("view tgview")}</TGViewLink>
                        </Dropdown.Item>
                    )}
                    {tgview && (
                        <Dropdown.Item>
                            <TGView3DLink {...tgview}>{intl.get("view tgview3d")}</TGView3DLink>
                        </Dropdown.Item>
                    )}
                    {jupyter && (
                        <Dropdown.Item>
                            <a href={jupyter} style={{ color: "black" }}>
                                {intl.get("jupyter")}
                            </a>
                        </Dropdown.Item>
                    )}
                    {issue && (
                        <Dropdown.Item>
                            <a href={issue} style={{ color: "black" }}>
                                {intl.get("report")}
                            </a>
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
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
        sourceURL: source && SourceURL(source),
        issueURL: source && IssueURL(source),
        jupyterURL: jupyter && JupyterURL(jupyter),
        tgViewURL: obj && TGViewURL(obj),
    };
});
