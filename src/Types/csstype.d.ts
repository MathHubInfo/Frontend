import { TransformProperty } from "csstype";

// somehow the MozTranform property is missing
// we add it manually here
declare module "csstype"  {
    export interface StandardLonghandProperties<TLength = string | 0> {
        MozTransform?: TransformProperty;
    }
}
