import { TransformProperty } from "csstype";

declare module "*.html" {
    const value: string;
    export default value;
}

declare module "*.txt" {
    const content: string;
    export default content;
}

declare module "*.css";

declare module "*.json" {
    const content: any;
    export default content;
}

// somehow the MozTranform property is missing
// we add it manually here
declare module "csstype"  {
    export interface StandardLonghandProperties<TLength = string | 0> {
        MozTransform?: TransformProperty;
    }
}