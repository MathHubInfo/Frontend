
import dynamic from "next/dynamic";

import { IHeaderProps } from "./IHeaderProps";

const Header: React.ComponentType<IHeaderProps> = dynamic(import("../../themes/classic/Layout/Header"));
export default Header;
