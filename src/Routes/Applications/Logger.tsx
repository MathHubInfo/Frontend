import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Input, InputOnChangeData, Table } from "semantic-ui-react";
import { debounce } from "ts-debounce";

import LoggerClient, { ILogEntry } from "../../Clients/LoggerClient";
import { MHText, MHTitle } from "../../Components/Fragments";
import { IMathHubContext, withContext } from "../../Context";

class Logger extends React.Component
    <{context: IMathHubContext} & RouteComponentProps, {entries: ILogEntry[]; filter: string}> {
    state = {entries: [], filter: ""};

    // the client to receive data from
    private readonly client: LoggerClient | null =
        this.props.context.config.client.MMT_URL !== "" ?
        new LoggerClient(this.props.context.config.client.MMT_URL, this.props.context.httpClient) : null;

    private readonly changeFilter = debounce(
        (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.setState({filter: data.value});
        },
        500,
    );

    componentWillMount() {
        if (this.client)
            this.client.poll(entries => this.setState({entries: entries.reverse()}))
                .catch(e => {
                    if (this.client) this.client.stopPoll();
                    this.setState({ entries: [] });
                });
    }

    componentWillUnmount() {
        if (this.client)
            this.client.stopPoll();
    }

    render() {
        return (
            <MHTitle title="Logger">
                <MHText>
                    This page shows the MMT Log.
                    It is intended for debugging purposes only.
                </MHText>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Time</Table.HeaderCell>
                            <Table.HeaderCell>
                                <Input placeholder="Prefix" onChange={this.changeFilter} />
                            </Table.HeaderCell>
                            <Table.HeaderCell>Message</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <LogListView filter={this.state.filter} entries={this.state.entries} />
                    </Table.Body>
                </Table>
            </MHTitle>
        );
    }
}

// tslint:disable-next-line:export-name
export default withContext(Logger);

function LogListView(props: {entries: ILogEntry[]; filter: string}) {
    const theEntries = props.entries.filter(e => e.prefix.startsWith(props.filter));

    return <>{theEntries.map(e => <LogEntry key={e.uuid} entry={e} />)}</>;
}

// renders a single ILogEntry
function LogEntry(props: {entry: ILogEntry}) {
    const { time, prefix, parts } = props.entry;

    return (
        <Table.Row>
            <Table.Cell>{time}</Table.Cell>
            <Table.Cell>{prefix}</Table.Cell>
            <Table.Cell>{parts}</Table.Cell>
      </Table.Row>
    );
}
