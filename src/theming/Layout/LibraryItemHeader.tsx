// tslint:disable:export-name

import getConfig from "next/config";
import dynamic from "next/dynamic";

import { jupyterURL, sourceURL } from "../../utils/urls";
import { WithExtraProps } from "../../utils/WithExtraContext";

import { IItemHeaderDerived, ILibraryItemHeaderProps } from "./ILibraryItemHeaderProps";

let LibraryItemHeader: React.ComponentClass<ILibraryItemHeaderProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        LibraryItemHeader = dynamic(import("../../themes/plain/Layout/LibraryItemHeader"));
}

export default WithExtraProps<IItemHeaderDerived, ILibraryItemHeaderProps>(LibraryItemHeader, ({source, jupyter}) =>
    ({
        sourceURL: source && sourceURL(source),
        jupyterURL: jupyter && jupyterURL(jupyter),
    }),
);
