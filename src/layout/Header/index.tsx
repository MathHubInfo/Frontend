import * as React from "react";
import { Button, Divider, Dropdown, Header, Icon, Label, Popup, Segment } from "semantic-ui-react";
import { IReferencable, ISourceReference, IStatistic } from "../../context/LibraryClient/objects";
import { ObjectSource } from "../../context/LibraryClient/objects/utils";
import MHHTML from "../../components/MHHTML";
import StatisticsTable from "./Statistics";
import { IssueURL, JupyterURL, SourceURL, TGViewURL, TGView3DURL, TGViewData } from "../../utils/URLs";
import { TranslateProps, WithTranslate } from "../../locales/WithTranslate";

import Copyable from "../../components/Copyable";
import { URLProps, WithURL } from "../../locales/WithURL";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

export type HeaderProps = Partial<HeaderOptionalProps> & HeaderRequiredProps;

interface HeaderRequiredProps {
    /** title of the page */
    title: string;

    /** if set, don't render the title as html! */
    plaintitle?: boolean;

    /** omit the action buttons when set */
    noactions?: boolean;
}

interface HeaderOptionalProps {
    // description of the element in question, may contain html
    description: string;

    // referenced object by this page
    obj: IReferencable;
}

interface HeaderState extends HeaderOptionalProps {
    // statistics (if any)
    statistics: IStatistic[];

    // a list of people responsible for the item
    responsible: string[];

    // the url to the source (if any)
    sourceURL: string;

    // the url to tgview (if any)
    tgViewURL: string;

    // the url to tgview3d (if any)
    tgView3DURL: string;

    // the url to issues (if any)
    issueURL: string;

    // the url to open a jupyter notebook (if any)
    jupyterURL: string;
}

class ItemHeader extends React.Component<HeaderProps & TranslateProps & URLProps, Partial<HeaderState>> {
    state: Partial<HeaderState> = {};
    static getDerivedStateFromProps({
        obj,
        description,
        url,
    }: HeaderProps & TranslateProps & URLProps): Partial<HeaderState> {
        // extrac source, responsible and statistics
        const source = obj && ObjectSource(obj);
        const responsible = obj && "responsible" in obj ? obj.responsible : undefined;
        const statistics = obj && "statistics" in obj ? obj.statistics : undefined;

        // if we have a notebook-tagged document, we need to add the jupyter source to it
        let jupyter: ISourceReference | undefined;
        if (obj && obj.kind === "document" && "tags" in obj && obj.tags.indexOf("ipynb-omdoc") >= -1)
            jupyter = ObjectSource(obj);

        // build the tgview data
        const tgviewData = obj && TGViewData(obj);

        return {
            obj,
            description,
            responsible,
            statistics,
            sourceURL: source && SourceURL(source),
            issueURL: source && IssueURL(source),
            jupyterURL: jupyter && JupyterURL(jupyter),
            tgViewURL: tgviewData && TGViewURL(tgviewData, url),
            tgView3DURL: tgviewData && TGView3DURL(tgviewData, url),
        };
    }
    render() {
        const { t, plaintitle, title, obj, noactions } = this.props;
        const {
            description,
            responsible,
            sourceURL,
            tgViewURL,
            tgView3DURL,
            jupyterURL,
            issueURL,
            statistics,
        } = this.state;

        const attachments = noactions !== true || description || responsible;

        return (
            <Segment.Inline as="header">
                <Header as="h1" block attached={attachments ? "top" : undefined}>
                    {plaintitle === true ? title : <MHHTML>{title}</MHHTML>}
                    {obj && (
                        <Header.Subheader>
                            <Copyable>{obj.id}</Copyable>
                        </Header.Subheader>
                    )}
                </Header>

                {(description || responsible) && (
                    <Segment attached>
                        {description && <MHHTML>{description}</MHHTML>}
                        {responsible && (
                            <Segment.Inline>
                                <b>{t("responsible")}:</b>{" "}
                                {responsible.map(p => (
                                    <Label key={p}>{p}</Label>
                                ))}
                            </Segment.Inline>
                        )}
                    </Segment>
                )}
                {!noactions && (
                    <Segment basic clearing>
                        <Button.Group float="left">
                            <ActionButton text={t("view source")} icon="file code outline" href={sourceURL} />
                            <ActionButton text={" " + t("view tgview")} icon="map outline" href={tgViewURL} />
                            <ActionButton text={t("view tgview3d")} icon="globe" href={tgView3DURL} />
                            <ActionButton text={" " + t("jupyter")} icon="hand point right outline" href={jupyterURL} />
                        </Button.Group>
                        <Button.Group floated="right">
                            <ActionButton text={t("report")} icon="bug" href={issueURL} />
                            <Dropdown
                                text={t("statistics")}
                                labeled
                                button
                                icon={"chart line"}
                                className="icon"
                                disabled={!statistics}
                            >
                                <Dropdown.Menu>
                                    {statistics && <StatisticsTable statistics={statistics} />}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Button.Group>
                    </Segment>
                )}

                <Divider />
            </Segment.Inline>
        );
    }
}

export default WithURL(WithTranslate(ItemHeader));

class ActionButton extends React.Component<{ href?: string; text: string; popup?: string; icon?: SemanticICONS }> {
    render() {
        const { href, text, popup, icon } = this.props;

        const button = (
            <Button as="a" href={href || ""} disabled={href === undefined}>
                {icon && <Icon name={icon} />}
                {text}
            </Button>
        );

        if (!popup) return button;

        return <Popup trigger={button} content={popup} disabled={href === undefined} />;
    }
}
