import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IGlossaryProps } from "./IGlossaryProps";

let PageApplicationsGlossary: React.ComponentClass<IGlossaryProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        PageApplicationsGlossary = dynamic(import("../../../themes/classic/Pages/Applications/Glossary"));
        break;
    default:
        PageApplicationsGlossary = dynamic(import("../../../themes/plain/Pages/Applications/Glossary"));
}

export default PageApplicationsGlossary;
