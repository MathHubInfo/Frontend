import * as React from "react";

import LoggerClient, { ILogEntry } from "../../api/logger";

import { Input, InputOnChangeData, Table } from "semantic-ui-react";
import { Context, IMathHubContext } from "../../context";

import { debounce } from "ts-debounce";

export class Logger extends React.Component {
    constructor(props: {}) {
        super(props);
    }

    private makeLoggerDisplay(context: IMathHubContext) {
        if (context.config.client.MOCK_MMT) {
            return <>(Can not mock logs)</>;
        }
        return <LoggerDisplay MMT_URL={context.config.client.MMT_URL} />;
    }

    public render() {
        return <Context.Consumer children={this.makeLoggerDisplay}/>;
    }
}

interface ILoggerProps {
    MMT_URL: string;
}
class LoggerDisplay extends React.Component<ILoggerProps, {entries: ILogEntry[], filter: string}> {
    /** the client to receive data from */
    private client: LoggerClient;

    constructor(props: ILoggerProps) {
        super(props);

        this.state = {entries: [], filter: ""};

        this.changeFilter = debounce(this.changeFilter.bind(this), 500);
        this.client = new LoggerClient(props.MMT_URL);

    }

    public changeFilter(event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) {
        this.setState({filter: data.value});
    }

    public componentWillMount() {
        this.client.poll((entries) => this.setState({entries}));
    }

    public componentWillUnmount() {
        this.client.stopPoll();
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
