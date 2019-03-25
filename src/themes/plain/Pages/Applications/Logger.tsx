import * as React from "react";

import { ILogEntry } from "../../../../context/LoggerClient";

import { ILoggerProps } from "../../../../theming/Pages/Applications/ILoggerProps";

export default class Logger extends React.Component<ILoggerProps> {
    render() {
        const { filter: selectedFilter, entries } = this.props;

        return (
            <div>
                <table style={{width: "100%"}}>
                    <thead>
                        <tr>
                            <th style={{width: "20%"}}>Date</th>
                            <th style={{width: "20%"}}>
                                <input
                                    type="text"
                                    value={selectedFilter}
                                    onChange={this.onChange}
                                    placeholder="Filter"
                                />
                            </th>
                            <th style={{width: "60%"}}>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map(e => <LoggerTableRow entry={e} key={e.uuid} />)}
                    </tbody>
                </table>
            </div>
        );
    }
    private readonly onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.changeFilter(event.target.value);
    }
}

class LoggerTableRow extends React.Component<{entry: ILogEntry}> {
    render() {
        const { entry } = this.props;

        return (
            <tr>
                <td>{new Date(entry.time).toTimeString()}</td>
                <td>{entry.prefix}</td>
                <td>{entry.parts.join("\n")}</td>
            </tr>
        );
    }
}
