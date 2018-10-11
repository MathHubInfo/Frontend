import * as React from "react";

import { Container, Divider, Grid, Header, Label } from "semantic-ui-react";
import { LoadWithSpinner } from "../../components/common/lazy";
import { MathHTML } from "../../components/common/mathhtml";

import { MHRefBreadCrumbs } from "../../components/breadcrumbs";

import { IMathHubContext, TitledWithContext } from "../../context";
import { HTML, IApiObject, IStatistic } from "../../context/api";

import { StatisticsTableDropdown } from "./structure/statistics";

interface ILibraryItemProps<T> {
    /** the loading title of this library item */
    title: string;

    /** the promise fetching this item */
    promise: (context: IMathHubContext) => () => Promise<T>;

    /** the properties of this item */
    props: (item: T) => IItemProps;

    /** get the body to be placed within the library item render */
    children: (item: T) => React.ReactElement<any>;
}

/** Element to display a single library item */
export class LibraryItem<T> extends React.Component<ILibraryItemProps<T>> {
    public render() {
        const { children, promise, props, title } = this.props;
        return (
            <TitledWithContext title={title}>{(context: IMathHubContext) =>
                <LoadWithSpinner
                    title={title}
                    promise={promise(context)}
                    errorMessage={true}
                >{(item: T) => <>
                    <LibraryItemHeader itemProps={props(item)} />
                    <Divider />
                    <Container>{children(item)}</Container>
                </>}
                </LoadWithSpinner>
            }</TitledWithContext>
        );
    }
}

/** the properites of an item that are rendered */
interface IItemProps {
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
class LibraryItemHeader extends React.Component<{itemProps: IItemProps}> {
    public render() {
        const { crumbs, title, statistics, description, responsible } = this.props.itemProps;
        return (
            <>
                <MHRefBreadCrumbs to={crumbs} />
                <Grid><Grid.Row>
                    <Grid.Column width={11}>
                        <MathHTML as={Header} extra={{as: "h2"}}>{title}</MathHTML>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        {statistics ? <StatisticsTableDropdown statistics={statistics} /> : null}
                    </Grid.Column>
                </Grid.Row></Grid>
                {description ? <MathHTML renderReferences>{description}</MathHTML> : null}
                {responsible ? <Container>
                    <b>Responsible:</b> {responsible.map((p) => <Label key={p}>{p}</Label>)}
                </Container> : null}
            </>
        );
    }
}
