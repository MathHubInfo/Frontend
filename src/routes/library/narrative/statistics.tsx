import * as React from "react";

import { Popup, Table } from "semantic-ui-react";
import { IStatistic } from "../../../context/api";

import statsKeys from "../../../../assets/keys.json";

export class StatisticsTable extends React.Component<{ statistics: IStatistic[] }> {
    public render() {
        const { statistics } = this.props;
        if (statistics === undefined || statistics.length === 0) {
            return (
                <p>No statistics available</p>
            );
        }
        return (
            <Table collapsing>
                <Table.Body>
                    {statistics.map((s) => <StatisticsElement key={s.key} name={s.key} value={s.value} />)}
                </Table.Body>
            </Table>
        );
    }
}

class StatisticsElement extends React.Component<{ name: string, value?: number }> {
    public render() {
        const { name } = this.props;
        const { value } = this.props;
        if (value == null) {
            return (
                <></>
            );
        }
        for (const s of statsKeys) {
            if (s.key === name) {
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
            }
        }
        return (
            <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{value}</Table.Cell>
            </Table.Row>
        );
    }

}
