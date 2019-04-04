import { ISourceReference, IStatistic } from "../../context/LibraryClient/objects";

export interface IActionHeaderProps extends IActionDerived {
    // description of the element in question, may contain html
    description?: string;

    // source of the object (if any)
    source?: ISourceReference;

    // jupyter notebook ref (if any)
    jupyter?: ISourceReference;

    // statistics (if any)
    statistics?: IStatistic[];

    // a list of people responsible for the item
    responsible?: string[];
}

export interface IActionDerived {
    // the url to the source (if any)
    sourceURL?: string;

    // the url to issues (if any)
    issueURL?: string;

    // the url to open a jupyter notebook (if any)
    jupyterURL?: string;
}
