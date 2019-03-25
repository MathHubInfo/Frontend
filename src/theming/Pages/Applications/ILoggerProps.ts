import { ILogEntry } from "../../../context/LoggerClient";

export interface ILoggerProps extends ILoggerState {
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
