import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IDeclarationProps } from "./IDeclarationProps";

let PageDeclaration: React.ComponentClass<IDeclarationProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        PageDeclaration = dynamic(import("../../../themes/plain/Pages/Library/Declaration"));
}

export default PageDeclaration;
