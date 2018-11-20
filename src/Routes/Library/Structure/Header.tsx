import * as React from "react";
import { Container, Label } from "semantic-ui-react";

import { HTML as HTMLt, IApiObject, ISourceReference, IStatistic } from "../../../Clients/LibraryClient/objects";
import { HTML, MHRefBreadCrumbs, MHText } from "../../../Components/Fragments";

import { JupyterButton, SourceButton } from "./External";
import { StatisticsTableDropdown } from "./Statistics";

/*
 * the props of an item that are rendered
 */
export interface IItemProps {
    // title of the item
    title: string;

    // breadcrumbs of the item to show
    crumbs: IApiObject | ISourceReference | undefined;

    // source of the object (if any)
    source?: ISourceReference;

    // jupyter notebook ref (if any)
    jupyter?: ISourceReference;

    // statistics (if any)
    statistics?: IStatistic[];

    // description of the item
    description?: HTMLt;

    // list of responsible people
    responsible?: string[];
}

// the header of a library item display
export default class Header extends React.Component<{itemProps: IItemProps}> {
    render() {
        const { crumbs, source, jupyter, statistics, description, responsible } = this.props.itemProps;

        return (
            <>
                <MHRefBreadCrumbs to={crumbs} />
                <MHText>
                    <Container>
                        {statistics ? <StatisticsTableDropdown statistics={statistics} /> : null}
                        {jupyter ? <JupyterButton source={jupyter} /> : null}
                        {source ? <SourceButton source={source} /> : null}
                    </Container>

                    {description ? <HTML renderReferences>{description}</HTML> : null}
                    {responsible ? <Container>
                        <b>Responsible:</b> {responsible.map(p => <Label key={p}>{p}</Label>)}
                    </Container> : null}
                </MHText>
            </>
        );
    }
}
