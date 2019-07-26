import dynamic from "next/dynamic";

import { IGlossaryProps } from "./IGlossaryProps";

const PageApplicationsGlossary: React.ComponentType<IGlossaryProps> =
    dynamic(import("../../../themes/classic/Pages/Applications/Glossary"));
export default PageApplicationsGlossary;
