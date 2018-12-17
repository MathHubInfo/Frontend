import { DerivedDataStatus } from "../../utils/getDerivedParameter";

import { IBreadcrumb } from "./ILayoutBodyProps";

export interface ILayoutFailureProps {
    /**
     * Status code that caused the error
     */
    statusCode: number;

    /**
     * Status of why Derived Data Fetching failed
     */
    status?: DerivedDataStatus.MISSING_VALUE | DerivedDataStatus.MISSING_DERIVED | DerivedDataStatus.ERROR_DERIVATION;

    /**
     * The title of the item that failed
     */
    itemTitle?: string;

    /**
     * The breadcrumbs to the error page
     */
    crumbs: IBreadcrumb[];
}
