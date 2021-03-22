import * as React from "react";
import { Button, Container, Dropdown, Grid, Icon, Label, Popup } from "semantic-ui-react";
import { IReferencable, ISourceReference, IStatistic } from "../context/LibraryClient/objects";
import { ObjectSource } from "../context/LibraryClient/objects/utils";
import MHHTML from "../components/MHHTML";
import MHLink from "../components/MHLink";
import { StatisticsTable } from "./Statistics";
import { IssueURL, ITGViewData, JupyterURL, SourceURL, TGViewURL } from "../utils/URLs";
import TGViewLink from "../components/TGViewLink";
import TGView3DLink from "../components/TGView3DLink";
import { TranslateProps, WithTranslate } from "../locales/WithTranslate";

export type IActionHeaderProps = Partial<IActionHeaderOptional> & IActionHeaderRequired;

interface IActionHeaderRequired {
    /** title of the page */
    title: string;

    /** if set, don't render the title as html! */
    plaintitle?: boolean;
}

interface IActionHeaderOptional {
    // description of the element in question, may contain html
    description?: string;

    // referenced object by this page
    obj?: IReferencable;
}

interface IActionHeaderState extends IActionHeaderOptional {
    // statistics (if any)
    statistics?: IStatistic[];

    // a list of people responsible for the item
    responsible?: string[];

    // the url to the source (if any)
    sourceURL?: string;

    // the url to tgview (if any)
    tgViewURL?: ITGViewData;

    // the url to issues (if any)
    issueURL?: string;

    // the url to open a jupyter notebook (if any)
    jupyterURL?: string;
}

class ActionHeader extends React.Component<IActionHeaderProps & TranslateProps, IActionHeaderState> {
    state: IActionHeaderState = {};
    static getDerivedStateFromProps({ obj, description }: IActionHeaderProps & TranslateProps): IActionHeaderState {
        // extrac source, responsible and statistics
        const source = obj && ObjectSource(obj);
        const responsible = obj && "responsible" in obj ? obj.responsible : undefined;
        const statistics = obj && "statistics" in obj ? obj.statistics : undefined;

        // if we have a notebook-tagged document, we need to add the jupyter source to it
        let jupyter: ISourceReference | undefined;
        if (obj && obj.kind === "document" && "tags" in obj && obj.tags.indexOf("ipynb-omdoc") >= -1)
            jupyter = ObjectSource(obj);

        return {
            obj,
            description,
            responsible,
            statistics,
            sourceURL: source && SourceURL(source),
            issueURL: source && IssueURL(source),
            jupyterURL: jupyter && JupyterURL(jupyter),
            tgViewURL: obj && TGViewURL(obj),
        };
    }
    private sourceButton() {
        const { t } = this.props;
        const { sourceURL } = this.state;
        if (sourceURL === undefined) return null;

        return (
            <Button icon>
                <Icon name={"hand point right outline"} />
                <a href={sourceURL} style={{ color: "black" }}>
                    {t("view source")}
                </a>
            </Button>
        );
    }
    private tgViewButton() {
        const { t } = this.props;
        const { tgViewURL } = this.state;
        if (tgViewURL === undefined) return null;

        return (
            <Button icon>
                <Icon name={"hand point right outline"} />
                <TGViewLink {...tgViewURL}>{t("view tgview")}</TGViewLink>
            </Button>
        );
    }
    private tgView3DButton() {
        const { t } = this.props;
        const { tgViewURL } = this.state;
        if (tgViewURL === undefined) return null;

        return (
            <Button icon>
                <Icon name={"hand point right outline"} />
                <TGView3DLink {...tgViewURL}>{t("view tgview3d")}</TGView3DLink>
            </Button>
        );
    }
    private jupyterButton() {
        const { t } = this.props;
        const { jupyterURL } = this.state;
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
        const { t } = this.props;
        const { issueURL } = this.state;
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
        const { t, plaintitle, title } = this.props;
        const { statistics, description, responsible } = this.state;

        return (
            <header>
                <h1>{plaintitle === true ? title : <MHHTML>{title}</MHHTML>}</h1>
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
            </header>
        );
    }
}

export default WithTranslate(ActionHeader);
