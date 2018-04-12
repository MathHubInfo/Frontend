import * as React from "react";

import RaisedButton from 'material-ui/RaisedButton';

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        const f = (x:string) => x + "thing"
        const g = [1, 2, 3].entries()

        return <div>
            <h1>Hello from {f(this.props.compiler)} and {this.props.framework}!</h1>
            <RaisedButton  label="Default" />
        </div>;
    }
}