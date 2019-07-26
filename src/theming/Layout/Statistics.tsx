import * as React from "react";
import intl from "react-intl-universal";
import { Container, Dropdown, Popup, Table } from "semantic-ui-react";

import { default as keysJson } from "../../assets/applications/keys.json";
import { IStatistic } from "../../context/LibraryClient/objects";

interface IStatisticsTableProps {
    statistics?: IStatistic[];
}

// Renders a table showing statistics
export function StatisticsTable(props: IStatisticsTableProps) {
    const { statistics } = props;

    if (statistics === undefined || statistics.length === 0)
        return <p>{intl.get("no")}</p>;

    return (
        <Table collapsing>
            <Table.Body>
                {statistics.map(s => <StatisticsElement key={s.key} name={s.key} value={s.value} />)}
            </Table.Body>
        </Table>
    );
}

// Same as StatisticsTable, but adds a dropdown menu to it
export function StatisticsTableDropdown(props: IStatisticsTableProps) {
    return (
        <Container textAlign={"right"}>
            <Dropdown text={intl.get("statistics")} button icon={null} pointing={"right"}>
                <Dropdown.Menu>
                    <StatisticsTable statistics={props.statistics} />
                </Dropdown.Menu>
            </Dropdown>
        </Container>
    );
}

// A single element within the statistics table
function StatisticsElement(props: { name: string; value?: number }) {
    const { name, value } = props;
    if (value === null)
        return null;

    for (const s of keysJson)
        if (s.key === name)
            return (
                <Popup
                    trigger={
                        <Table.Row>
                            <Table.Cell>{s.teaser}</Table.Cell>
                            <Table.Cell>{value}</Table.Cell>
                        </Table.Row>
                    }
                    content={s.description}
                />
            );

    return (
        <Table.Row>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{value}</Table.Cell>
        </Table.Row>
    );
}
