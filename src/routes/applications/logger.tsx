import * as React from "react";

import LoggerClient, { ILogEntry } from "../../api/logger";
import { ICanncelablePromise, makeCancelable } from "../../utils/promises";

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
const POLLING_INTERVAL = 1000;
class LoggerDisplay extends React.Component<ILoggerProps, {entries: ILogEntry[], filter: string}> {
    constructor(props: ILoggerProps) {
        super(props);

        this.state = {entries: [], filter: ""};
        this.client = new LoggerClient(props.MMT_URL);

        this.changeFilter = debounce(this.changeFilter.bind(this), 500);
    }

    public changeFilter(event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) {
        this.setState({filter: data.value});
    }

    /** the client to receive data from */
    private client: LoggerClient;

    /** a promise that polls for new log entries */
    private pollPromise: ICanncelablePromise<ILogEntry[]> | null = null;

    /** a timer for the next poll */
    private timer: number | null = null;

    public componentWillMount() {
        // start polling
        this.poll();
    }

    public componentWillUnmount() {

        // if we have a poll promise, cancel it
        if (this.pollPromise) {
            this.pollPromise.cancel();
        }

        // if we have a timer, cancel it
        if (this.timer) {
            window.clearTimeout(this.timer);
        }
    }

    private poll() {
        // clear the reference to the timer and get new entries
        this.timer = null;
        this.pollPromise = makeCancelable(this.client.poll());

        this.pollPromise.promise.then((entries) => {
            entries.reverse();
            // tslint:disable-next-line:no-console
            console.log("got entries: " + entries);

            // update the entries we have
            this.pollPromise = null;
            this.setState({ entries });

            // and start a timer for the next one
            this.timer = window.setTimeout(this.poll.bind(this), POLLING_INTERVAL);
        });
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
