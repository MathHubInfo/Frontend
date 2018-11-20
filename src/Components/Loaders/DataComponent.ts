import * as React from "react";

export interface IDataComponentProps<T> {
    children: ((data: T) => React.ReactNode);
}

// generates a Component that renders given some children
export default function DataComponent<T>(data: T) {
    return class extends React.Component<IDataComponentProps<T>> {
        render() {
            return this.props.children(data);
        }
    };
}
