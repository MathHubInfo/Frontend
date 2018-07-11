import * as React from "react";

import { Table } from "semantic-ui-react";
import { Nav } from "../../../components/common/nav";
import { IStatistics } from "../../../context/api";

export class StatisticsTable extends React.Component<{ statistics: IStatistics }> {
    public render() {
        const { statistics } = this.props;
        if (statistics === "undefined") {
            return (
                <div>No statistics available</div>
            );
        }
        return (
            <Table collapsing>
                <Table.Body>
                    <StatisticsElement name={"decl:"} value={statistics.decl} />
                    <StatisticsElement name={"exp:"} value={statistics.exp} />
                    <StatisticsElement name={"any:"} value={statistics.any} />
                    <StatisticsElement name={"align:"} value={statistics.align} />
                    <StatisticsElement name={"theo:"} value={statistics.theo} />
                    <StatisticsElement name={"doc:"} value={statistics.doc} />
                    <StatisticsElement name={"unty_con:"} value={statistics.unty_con} />
                    <StatisticsElement name={"ty_con:"} value={statistics.ty_con} />
                    <StatisticsElement name={"mal_con:"} value={statistics.mal_con} />
                    <StatisticsElement name={"struc:"} value={statistics.struc} />
                    <StatisticsElement name={"pat:"} value={statistics.pat} />
                    <StatisticsElement name={"judg:"} value={statistics.judg} />
                    <StatisticsElement name={"data:"} value={statistics.data} />
                    <StatisticsElement name={"type:"} value={statistics.type} />
                    <StatisticsElement name={"rule:"} value={statistics.rule} />
                    <StatisticsElement name={"view:"} value={statistics.view} />
                    <StatisticsElement name={"high:"} value={statistics.high} />
                    <StatisticsElement name={"exp_mor:"} value={statistics.exp_mor} />
                    <StatisticsElement name={"any_mor:"} value={statistics.any_mor} />
                    <Table.Row as={Nav} to={"/applications/keys"}>
                            <Table.Cell>Key descriptions</Table.Cell>
                    </Table.Row>
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
        return (
            <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{value}</Table.Cell>
            </Table.Row>
        );
    }
}
