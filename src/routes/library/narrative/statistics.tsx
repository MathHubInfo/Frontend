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

/*                 <StatisticsElement name={"decl"} value={statistics.decl} />
                    <StatisticsElement name={"exp"} value={statistics.exp} />
                    <StatisticsElement name={"any"} value={statistics.any} />
                    <StatisticsElement name={"align"} value={statistics.align} />
                    <StatisticsElement name={"theo"} value={statistics.theo} />
                    <StatisticsElement name={"doc"} value={statistics.doc} />
                    <StatisticsElement name={"unty_con"} value={statistics.unty_con} />
                    <StatisticsElement name={"ty_con"} value={statistics.ty_con} />
                    <StatisticsElement name={"mal_con"} value={statistics.mal_con} />
                    <StatisticsElement name={"struc"} value={statistics.struc} />
                    <StatisticsElement name={"pat"} value={statistics.pat} />
                    <StatisticsElement name={"judg"} value={statistics.judg} />
                    <StatisticsElement name={"data"} value={statistics.data} />
                    <StatisticsElement name={"type"} value={statistics.type} />
                    <StatisticsElement name={"rule"} value={statistics.rule} />
                    <StatisticsElement name={"view"} value={statistics.view} />
                    <StatisticsElement name={"high"} value={statistics.high} />
                    <StatisticsElement name={"exp_mor"} value={statistics.exp_mor} />
                    <StatisticsElement name={"any_mor"} value={statistics.any_mor} />
*/
/*     decl?: number;
    exp?: number;
    any?: number;
    align?: number;
    theo?: number;
    doc?: number;
    unty_con?: number;
    ty_con?: number;
    mal_con?: number;
    struc?: number;
    pat?: number;
    judg?: number;
    data?: number;
    type?: number;
    rule?: number;
    view?: number;
    high?: number;
    exp_mor?: number;
    any_mor?: number;
*/
