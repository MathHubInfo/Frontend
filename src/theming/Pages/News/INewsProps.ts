import { INewsPageRefProps } from "./INewsPageRefProps";

export interface INewsProps {
    /**
     * the description of the page
     */
    description: string;

    /**
     * the list of known news items
     */
    children: Array<React.ReactElement<INewsPageRefProps>>;
}
