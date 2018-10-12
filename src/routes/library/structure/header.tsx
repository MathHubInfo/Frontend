import * as React from "react";

import { Container, Grid, Header, Label } from "semantic-ui-react";
import { MathHTML } from "../../../components/common/mathhtml";

import { HTML, IApiObject, IStatistic } from "../../../context/api";

import { MHRefBreadCrumbs } from "../../../components/breadcrumbs";
import { StatisticsTableDropdown } from "../structure/statistics";

/** the properites of an item that are rendered */
export interface IItemProps {
    /** title of the item */
    title: string;

    /** bread crumbs to show for the item */
    crumbs: IApiObject | undefined;

    /** the statistics of this item, if any */
    statistics?: IStatistic[];

    /** the description of this element (if any) */
    description?: HTML;

    /** the list of responsible people (if any) */
    responsible?: string[];
}

/** the header of a library item display */
export class LibraryItemHeader extends React.Component<{itemProps: IItemProps}> {
    private renderWithStats() {
        const { title, statistics } = this.props.itemProps;

        return (
            <Grid><Grid.Row>
                <Grid.Column width={11}>
                    <MathHTML as={Header} extra={{as: "h1"}}>{title}</MathHTML>
                </Grid.Column>
                <Grid.Column width={5}>
                    <StatisticsTableDropdown statistics={statistics!} />
                </Grid.Column>
            </Grid.Row></Grid>
        );
    }

    private renderNoStats() {
        const { title} = this.props.itemProps;

        return (
            <Grid><Grid.Row>
                <Grid.Column width={16}>
                    <MathHTML as={Header} extra={{as: "h1"}}>{title}</MathHTML>
                </Grid.Column>
            </Grid.Row></Grid>
        );
    }

    public render() {
        const { crumbs, statistics, description, responsible } = this.props.itemProps;

        return (
            <>
                <MHRefBreadCrumbs to={crumbs} />
                {statistics ? this.renderWithStats() : this.renderNoStats()}
                {description ? <MathHTML renderReferences>{description}</MathHTML> : null}
                {responsible ? <Container>
                    <b>Responsible:</b> {responsible.map((p) => <Label key={p}>{p}</Label>)}
                </Container> : null}
            </>
        );
    }
}
