import dynamic from "next/dynamic";

import { IHomeProps } from "./IHomeProps";

const PageHome: React.ComponentType<IHomeProps> =
    dynamic(import("../../themes/classic/Pages/Home"));
export default PageHome;
