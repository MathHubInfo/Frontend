// tslint:disable:export-name

import getConfig from "next/config";
import dynamic from "next/dynamic";

import { jupyterURL, sourceURL, issueURL } from "../../utils/urls";
import { WithExtraProps } from "../../utils/WithExtraContext";

import { IItemHeaderDerived, ILibraryItemHeaderProps } from "./ILibraryItemHeaderProps";

let LibraryItemHeader: React.ComponentClass<ILibraryItemHeaderProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        LibraryItemHeader = dynamic(import("../../themes/classic/Layout/LibraryItemHeader"));
        break;
    default:
        LibraryItemHeader = dynamic(import("../../themes/plain/Layout/LibraryItemHeader"));
}

export default WithExtraProps<IItemHeaderDerived, ILibraryItemHeaderProps>(LibraryItemHeader, ({ source, jupyter }) =>
    ({
        sourceURL: source && sourceURL(source),
        issueURL: source && issueURL(source),
        jupyterURL: jupyter && jupyterURL(jupyter),
    }),
);
