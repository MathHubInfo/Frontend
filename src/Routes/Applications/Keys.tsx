import * as React from "react";

import { Button, Table } from "semantic-ui-react";

import { default as statsJson } from "../../../assets/stats.json";
const statsKeys: string[][] = statsJson;

import { MHTitle } from "../../Components/Fragments";

export default class Keys extends React.Component {
    state = { more: false };
    render() {
        const text = this.state.more ? "less" : "more";

        return (
            <MHTitle title="Keys">
                <Button onClick={this.handleClick}>show {text}</Button>
                <Table>
                    <Table.Row active>
                            <Table.Cell width={3}><b>key</b></Table.Cell>
                            <Table.Cell><b>description</b></Table.Cell>
                    </Table.Row>
                        <Content more={this.state.more} />
                </Table>
            </MHTitle>
        );
    }

    private readonly handleClick = () =>
        this.setState({
            more: !this.state.more,
        })
}

function Content(props: { more: boolean }) {
    const { more } = props;

    return (
        <>{statsKeys.map((e, i) => (
            <Table.Row key={i}>
                <Table.Cell>{e[0]}</Table.Cell>
                <Table.Cell>{e[more ? 2 : 1]}</Table.Cell>
            </Table.Row>
        ))}</>
    );
}
