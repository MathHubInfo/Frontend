import * as React from "react";

import LoggerClient, { ILogEntry } from "../../api/logger";

import { Input, InputOnChangeData, Table } from "semantic-ui-react";
import { IMathHubContext, withContext } from "../../context";

import { debounce } from "ts-debounce";

class Logger extends React.Component<{context: IMathHubContext}, {entries: ILogEntry[], filter: string}> {
    /** the client to receive data from */
    private client: LoggerClient | null;

    constructor(props: {context: IMathHubContext}) {
        super(props);

        this.state = {entries: [], filter: ""};

        this.changeFilter = debounce(this.changeFilter.bind(this), 500);
        this.client = this.props.context.config.client.MOCK_MMT ?
            null : new LoggerClient(this.props.context.config.client.MMT_URL);
    }

    public changeFilter(event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) {
        this.setState({filter: data.value});
    }

    public componentWillMount() {
        if (this.client) {
            this.client.poll((entries) => this.setState({entries: entries.reverse()}));
        }
    }

    public componentWillUnmount() {
        if (this.client) {
            this.client.stopPoll();
        }
    }

    public render() {
        return (
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
        );
    }
}

export default withContext(Logger);

function LogListView(props: {entries: ILogEntry[], filter: string}) {
    const theEntries = props.entries.filter((e) => e.prefix.startsWith(props.filter));
    return <>{theEntries.map((e) => <LogEntry key={e.uuid} entry={e} />)}</>;
}

/** renders a single ILogEntry */
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