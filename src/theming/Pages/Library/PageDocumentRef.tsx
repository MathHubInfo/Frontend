import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IDocumentRefProps } from "./IDocumentRefProps";

let PageDocumentRef: React.ComponentClass<IDocumentRefProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        PageDocumentRef = dynamic(import("../../../themes/classic/Pages/Library/DocumentRef"));
        break;
    default:
        PageDocumentRef = dynamic(import("../../../themes/plain/Pages/Library/DocumentRef"));
}

export default PageDocumentRef;
