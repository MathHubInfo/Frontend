import * as React from "react";
import { IKey, IKeysProps } from "./IKeysProps";

export default class PageApplicationsKeys extends React.Component<IKeysProps> {
    render() {
        const { expanded, keys } = this.props;

        return (
            <div>
                <table style={{width: "100%"}}>
                    <thead>
                        <tr>
                            <th style={{width: "20%"}}>Key</th>
                            <th style={{width: "80%"}}>
                                Description
                                <button onClick={this.toggleExpansion}>{expanded ? "<<" : ">>" }</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {keys.map(k => <KeyRow key={k.key} item={k} expanded={expanded} />)}
                    </tbody>
                </table>
            </div>
        );
    }

    private readonly toggleExpansion = () => this.props.toggleExpansion();
}

class KeyRow extends React.Component<{item: IKey; expanded: boolean}> {
    render() {
        const {expanded, item: { key, description, teaser }} = this.props;

        return (
            <tr>
                <td>{key}</td>
                <td>{expanded ? description : teaser }</td>
            </tr>
        );
    }
}
