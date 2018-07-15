import * as React from "react";

import { Button, Table } from "semantic-ui-react";

import statsKeys from "../../../assets/stats.json";

export class Keys extends React.Component<{}> {
    public state = { more: false };

    private handleClick = () =>
        this.setState({
            more: !this.state.more,
        })

    public render() {
        const text = this.state.more ? "less" : "more";
        return (
            <>
                <Button onClick={this.handleClick}>show {text}</Button>
                <Table>
                    <Table.Row active>
                            <Table.Cell width={3}><b>key</b></Table.Cell>
                            <Table.Cell><b>description</b></Table.Cell>
                    </Table.Row>
                        <Content more={this.state.more} />
                </Table>
            </>
        );
    }
}

class Content extends React.Component<{ more: boolean }> {
    public render() {
        const { more } = this.props;
        return statsKeys.map((e, i) => (
            <Table.Row key={i}>
                <Table.Cell>{e[0]}</Table.Cell>
                <Table.Cell>{e[more ? 2 : 1]}</Table.Cell>
            </Table.Row>
        ));
    }
}
