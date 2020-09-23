import * as React from "react";
import intl from "react-intl-universal";
import { Container, Input, Table } from "semantic-ui-react";
import { ILogEntry } from "../../../context/LoggerClient";

interface ILoggerProps extends ILoggerState {
    /**
     * Ref to change the filter
     */
    changeFilter(filter: string): void;
}

export interface ILoggerState extends ILoggerImplicits {
    /**
     * The current log entries
     */
    entries: ILogEntry[];
}


export interface ILoggerImplicits {
    /**
     * The current filter
     */
    filter: string;
}


export default class PageApplicationsLogger extends React.Component<ILoggerProps> {
    render() {
        const { filter: selectedFilter, entries } = this.props;

        return (
            <Container>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell style={{ width: "20%" }}>{intl.get("date")}</Table.HeaderCell>
                            <Table.HeaderCell style={{ width: "20%" }}>
                                <Input
                                    type="text"
                                    value={selectedFilter}
                                    onChange={this.onChange}
                                    placeholder="Filter"
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell style={{ width: "60%" }}>{intl.get("content")}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {entries.map(e => <LoggerTableRow entry={e} key={e.uuid} />)}
                    </Table.Body>
                </Table>
            </Container>
        );
    }
    private readonly onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.changeFilter(event.target.value);
    }
}

class LoggerTableRow extends React.Component<{ entry: ILogEntry }> {
    render() {
        const { entry } = this.props;

        return (
            <Table.Row>
                <Table.Cell>{new Date(entry.time).toTimeString()}</Table.Cell>
                <Table.Cell>{entry.prefix}</Table.Cell>
                <Table.Cell>{entry.parts.join("\n")}</Table.Cell>
            </Table.Row>
        );
    }
}
