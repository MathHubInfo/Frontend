import * as React from "react";
import { Container, Input, Table } from "semantic-ui-react";
import { ILogEntry } from "../../../context/LoggerClient";
import { TranslateProps, WithTranslate } from "../../../locales/WithTranslate";

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

class PageApplicationsLogger extends React.Component<ILoggerProps & TranslateProps> {
    render() {
        const { filter, entries, t } = this.props;

        return (
            <Container>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell style={{ width: "20%" }}>{t("date")}</Table.HeaderCell>
                            <Table.HeaderCell style={{ width: "20%" }}>
                                <Input type="text" value={filter} onChange={this.onChange} placeholder="Filter" />
                            </Table.HeaderCell>
                            <Table.HeaderCell style={{ width: "60%" }}>{t("content")}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {entries.map(e => (
                            <LoggerTableRow entry={e} key={e.uuid} />
                        ))}
                    </Table.Body>
                </Table>
            </Container>
        );
    }
    private readonly onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.changeFilter(event.target.value);
    };
}

export default WithTranslate(PageApplicationsLogger);

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
