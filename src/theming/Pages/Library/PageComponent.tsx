import dynamic from "next/dynamic";

import { IComponentProps } from "./IComponentProps";

const PageComponent: React.ComponentType<IComponentProps> =
    dynamic(import("../../../themes/classic/Pages/Library/Component"));
export default PageComponent;
