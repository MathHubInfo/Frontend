import { IMHLinkable } from "../../../lib/components/MHLink";

import { INewsItem } from "../../../context/NewsClient";

// tslint:disable-next-line: no-empty-interface
export interface INewsPageRefProps {
    link: IMHLinkable;
    item: INewsItem;
}
