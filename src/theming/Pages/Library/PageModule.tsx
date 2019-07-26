import dynamic from "next/dynamic";

import { IModuleProps } from "./IModuleProps";

const PageModule: React.ComponentType<IModuleProps> =
    dynamic(import("../../../themes/classic/Pages/Library/Module"));
export default PageModule;
