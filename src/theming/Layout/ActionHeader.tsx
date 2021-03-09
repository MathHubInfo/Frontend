import * as React from "react";
import { Button, Container, Dropdown, Grid, Icon, Label, Popup } from "semantic-ui-react";
import { IDocument, IReferencable, ISourceReference, IStatistic } from "../../context/LibraryClient/objects";
import { ObjectSource } from "../../context/LibraryClient/objects/utils";
import MHHTML from "../../components/MHHTML";
import MHLink from "../../components/MHLink";
import { StatisticsTable } from "../../theming/Layout/Statistics";
import { IssueURL, ITGViewData, JupyterURL, SourceURL, TGViewURL } from "../../utils/URLs";
import TGViewLink from "../../components/TGViewLink";
import TGView3DLink from "../../components/TGView3DLink";
import { WithExtraProps } from "../../utils/WithExtraProps";
import { TranslateProps, WithTranslate } from "../../locales/WithTranslate";

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

class ActionHeader extends React.Component<IActionHeaderProps & TranslateProps> {
    private sourceButton() {
        const { t } = this.props;
        const { sourceURL: source } = this.props;
        if (source === undefined) return null;

        return (
            <Button icon>
                <Icon name={"hand point right outline"} />
                <a href={source} style={{ color: "black" }}>
                    {t("view source")}
                </a>
            </Button>
        );
    }
    private tgViewButton() {
        const { tgViewURL, t } = this.props;
        if (tgViewURL === undefined) return null;

        return (
            <Button icon>
                <Icon name={"hand point right outline"} />
                <TGViewLink {...tgViewURL}>{t("view tgview")}</TGViewLink>
            </Button>
        );
    }
    private tgView3DButton() {
        const { tgViewURL, t } = this.props;
        if (tgViewURL === undefined) return null;

        return (
            <Button icon>
                <Icon name={"hand point right outline"} />
                <TGView3DLink {...tgViewURL}>{t("view tgview3d")}</TGView3DLink>
            </Button>
        );
    }
    private jupyterButton() {
        const { jupyterURL, t } = this.props;
        if (jupyterURL === undefined) return null;

        return (
            <Button icon>
                <Icon name={"hand point right outline"} />
                <MHLink href={jupyterURL}>
                    <a style={{ color: "black" }}>{t("jupyter")}</a>
                </MHLink>
            </Button>
        );
    }
    private reportButton() {
        const { issueURL, t } = this.props;
        if (IssueURL === undefined) return null;

        return (
            <Popup
                trigger={
                    <Button color="green">
                        <a href={issueURL} style={{ color: "black" }}>
                            {t("report")}
                        </a>
                    </Button>
                }
                content={t("issue")}
            />
        );
    }
    render() {
        const { statistics, description, responsible, t } = this.props;
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
                            <Dropdown text={t("statistics")} button icon={null} pointing={"right"}>
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
                            <b>{t("responsible")}:</b>{" "}
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

export default WithExtraProps<IActionDerived, IActionHeaderProps>(WithTranslate(ActionHeader), ({ obj }) => {
    const source = obj && ObjectSource(obj);

    // if we have a notebook-tagged document, we need to add the jupyter source to it
    let jupyter: ISourceReference | undefined;
    if (obj && obj.kind === "document" && "tags" in obj && obj.tags.indexOf("ipynb-omdoc") >= -1)
        jupyter = ObjectSource(obj);

    return {
        sourceURL: source && SourceURL(source),
        issueURL: source && IssueURL(source),
        jupyterURL: jupyter && JupyterURL(jupyter),
        tgViewURL: obj && TGViewURL(obj),
    };
});

class DocumentActionHeader extends React.Component<IActionHeaderProps & TranslateProps> {
    render() {
        const { t } = this.props;
        const { sourceURL: source } = this.props;
        const { tgViewURL: tgview } = this.props;
        const { issueURL: issue } = this.props;
        const { jupyterURL: jupyter } = this.props;

        return (
            <Dropdown text={t("more")} simple item>
                <Dropdown.Menu className="link item">
                    {source && (
                        <Dropdown.Item>
                            <a href={source} style={{ color: "black" }}>
                                {t("view source")}
                            </a>
                        </Dropdown.Item>
                    )}
                    {tgview && (
                        <Dropdown.Item>
                            <TGViewLink {...tgview}>{t("view tgview")}</TGViewLink>
                        </Dropdown.Item>
                    )}
                    {tgview && (
                        <Dropdown.Item>
                            <TGView3DLink {...tgview}>{t("view tgview3d")}</TGView3DLink>
                        </Dropdown.Item>
                    )}
                    {jupyter && (
                        <Dropdown.Item>
                            <a href={jupyter} style={{ color: "black" }}>
                                {t("jupyter")}
                            </a>
                        </Dropdown.Item>
                    )}
                    {issue && (
                        <Dropdown.Item>
                            <a href={issue} style={{ color: "black" }}>
                                {t("report")}
                            </a>
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
