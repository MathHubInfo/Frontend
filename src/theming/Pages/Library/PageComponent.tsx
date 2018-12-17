import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IComponentProps } from "./IComponentProps";

let PageComponent: React.ComponentClass<IComponentProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        PageComponent = dynamic(import("../../../themes/plain/Pages/Library/Component"));
}

export default PageComponent;
