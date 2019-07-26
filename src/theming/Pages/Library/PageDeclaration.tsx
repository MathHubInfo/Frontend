import dynamic from "next/dynamic";

import { IDeclarationProps } from "./IDeclarationProps";

const PageDeclaration: React.ComponentType<IDeclarationProps> =
    dynamic(import("../../../themes/classic/Pages/Library/Declaration"));
export default PageDeclaration;
