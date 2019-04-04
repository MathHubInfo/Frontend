import * as React from "react";

import MHHTML from "../../../lib/components/MHHTML";

import { IActionHeaderProps } from "../../../theming/Layout/IActionHeaderProps";

import { IStatistic } from "../../../context/LibraryClient/objects";

export default class ActionHeader extends React.Component<IActionHeaderProps> {
    render() {
        const { statistics, sourceURL, issueURL, jupyterURL, description, responsible } = this.props;

        return (
            <>
                <div>
                    {description && <MHHTML renderReferences>{description}</MHHTML> }
                    {responsible &&
                    <p><b>Responsible:</b> {responsible.map(p => <span key={p}>{p}</span>)}</p> }
                </div>
                <div>
                    {statistics && <ActionStatistics statistics={statistics} /> }
                    {sourceURL && <a href={sourceURL}>View Source</a>}
                    {issueURL && <a href={issueURL}>Report Issue</a>}
                    {jupyterURL && <a href={jupyterURL}>Test on Jupyter</a>}
                </div>
                <hr />
            </>
        );
    }
}

class ActionStatistics extends React.Component<{statistics: IStatistic[]}> {
    render() {
        // For now statistics are just rendered in a very simplistics form
        // where we just JSON stringify them
        return <pre>{JSON.stringify(this.props.statistics, null, 4)}</pre>;
    }
}
