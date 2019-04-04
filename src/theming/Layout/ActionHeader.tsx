// tslint:disable:export-name

import getConfig from "next/config";
import dynamic from "next/dynamic";

import { jupyterURL, sourceURL, issueURL } from "../../utils/urls";
import { WithExtraProps } from "../../utils/WithExtraContext";

import { IActionDerived, IActionHeaderProps } from "./IActionHeaderProps";

let ActionHeader: React.ComponentClass<IActionHeaderProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        ActionHeader = dynamic(import("../../themes/classic/Layout/ActionHeader"));
        break;
    default:
        ActionHeader = dynamic(import("../../themes/plain/Layout/ActionHeader"));
}

export default WithExtraProps<IActionDerived, IActionHeaderProps>(ActionHeader, ({ source, jupyter }) =>
    ({
        sourceURL: source && sourceURL(source),
        issueURL: source && issueURL(source),
        jupyterURL: jupyter && jupyterURL(jupyter),
    }),
);
