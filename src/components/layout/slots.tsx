import * as React from "react";

import { Fill, Slot } from "react-slot-fill";

/** represents a generated slot */
interface ISlotFill {
    /** name of the slot */
    name: symbol | string;
    /** the <Fill> component for this slot */
    Fill: React.ComponentClass<{}>;
    /** the <Slot> component for this slot */
    Slot: React.ComponentClass<{}>;
}

function makePair(name: string): ISlotFill {
    const slotName = Symbol(name);

    return {
        name: slotName,
        Fill: class extends React.Component {
            public static displayName = `${name}.Fill`;
            public render() {
                return <Fill name={slotName}>{this.props.children}</Fill>;
            }
        },
        Slot: class extends React.Component {
            public static displayName = `${name}.Slot`;
            public render() {
                return <Slot name={slotName}>{this.props.children}</Slot>;
            }
        },
    };
}

const Body = makePair("Body");
export const BodySlot = Body.Slot;
export const BodyFill = Body.Fill;
