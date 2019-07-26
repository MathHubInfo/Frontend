import dynamic from "next/dynamic";

import { ILibraryProps } from "./ILibraryProps";

const PageLibrary: React.ComponentType<ILibraryProps> =
    dynamic(import("../../../themes/classic/Pages/Library/Library"));
export default PageLibrary;
