import * as React from "react";

export interface IDataComponentProps<T> {
    children: ((data: T) => React.ReactNode);
}

/** generates a Component that renders given some children */
export function DataComponent<T>(data: T): React.ComponentClass<IDataComponentProps<T>> {
    return class extends React.Component<IDataComponentProps<T>> {
        public render() {
            return this.props.children(data);
        }
    };
}
