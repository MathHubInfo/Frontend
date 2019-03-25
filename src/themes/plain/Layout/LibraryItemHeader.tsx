import * as React from "react";

import MHHTML from "../../../lib/components/MHHTML";

import { ILibraryItemHeaderProps } from "../../../theming/Layout/ILibraryItemHeaderProps";

import { IStatistic } from "../../../context/LibraryClient/objects";

export default class LibraryItemHeader extends React.Component<ILibraryItemHeaderProps> {
    render() {
        const { statistics, sourceURL, jupyterURL, description, responsible } = this.props;

        return (
            <>
                <div>
                    {description && <MHHTML renderReferences>{description}</MHHTML> }
                    {responsible &&
                    <p><b>Responsible:</b> {responsible.map(p => <span key={p}>{p}</span>)}</p> }
                </div>
                <div>
                    {statistics && <LibraryItemStatistics statistics={statistics} /> }
                    {sourceURL && <a href={sourceURL}>View Source</a>}
                    {jupyterURL && <a href={jupyterURL}>Test on Jupyter</a>}
                </div>
                <hr />
            </>
        );
    }
}

class LibraryItemStatistics extends React.Component<{statistics: IStatistic[]}> {
    render() {
        // For now statistics are just rendered in a very simplistics form
        // where we just JSON stringify them
        return <pre>{JSON.stringify(this.props.statistics, null, 4)}</pre>;
    }
}
