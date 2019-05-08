// tslint:disable:export-name

import getConfig from "next/config";
import dynamic from "next/dynamic";

import { jupyterURL, sourceURL, issueURL, tgViewURL } from "../../utils/urls";
import { WithExtraProps } from "../../utils/WithExtraContext";

import { IActionDerived, IActionHeaderProps } from "./IActionHeaderProps";
import { ObjectSource } from "../../context/LibraryClient/objects/utils";
import { ISourceReference } from "../../context/LibraryClient/objects";

let ActionHeader: React.ComponentClass<IActionHeaderProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        ActionHeader = dynamic(import("../../themes/classic/Layout/ActionHeader"));
        break;
    default:
        ActionHeader = dynamic(import("../../themes/plain/Layout/ActionHeader"));
}

export default WithExtraProps<IActionDerived, IActionHeaderProps>(ActionHeader, ({ obj }) => {
    const source = obj && ObjectSource(obj);

    // if we have a notebook-tagged document, we need to add the jupyter source to it
    let jupyter: ISourceReference | undefined;
    if (obj && obj.kind === "document" && obj.tags && obj.tags.indexOf("ipynb-omdoc") >= -1)
        jupyter = ObjectSource(obj);

    return {
        sourceURL: source && sourceURL(source),
        issueURL: source && issueURL(source),
        jupyterURL: jupyter && jupyterURL(jupyter),
        tgViewURL: obj && tgViewURL(obj),
    };
});

