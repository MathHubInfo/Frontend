import * as React from "react";

import { Container, Header, Label } from "semantic-ui-react";
import { MathHTML } from "../../../components/common";

import { HTML, IApiObject, ISourceReference, IStatistic } from "../../../api";

import { MHRefBreadCrumbs } from "../../../components/fragments";
import { StatisticsTableDropdown } from "../structure/statistics";

import { JupyterButton, SourceButton } from "./external";

/** the properites of an item that are rendered */
export interface IItemProps {
    /** title of the item */
    title: string;

    /** bread crumbs to show for the item */
    crumbs: IApiObject | ISourceReference | undefined;

    /** the source of this document, if any */
    source?: ISourceReference;

    /** the source to use as a jupyter notebook, if any */
    jupyter?: ISourceReference;

    /** the statistics of this item, if any */
    statistics?: IStatistic[];

    /** the description of this element (if any) */
    description?: HTML;

    /** the list of responsible people (if any) */
    responsible?: string[];
}

/** the header of a library item display */
export class LibraryItemHeader extends React.Component<{itemProps: IItemProps}> {
    public render() {
        const { crumbs, title, source, jupyter, statistics, description, responsible } = this.props.itemProps;

        return (
            <>
                <MHRefBreadCrumbs to={crumbs} />
                <Container>
                    <MathHTML as={Header} extra={{as: "h1"}}>{title}</MathHTML>
                    {statistics ? <StatisticsTableDropdown statistics={statistics} /> : null}
                    {jupyter ? <JupyterButton source={jupyter} /> : null}
                    {source ? <SourceButton source={source} /> : null}
                </Container>

                {description ? <MathHTML renderReferences>{description}</MathHTML> : null}
                {responsible ? <Container>
                    <b>Responsible:</b> {responsible.map((p) => <Label key={p}>{p}</Label>)}
                </Container> : null}
            </>
        );
    }
}
