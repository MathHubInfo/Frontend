import * as React from "react";

import { Fill, Slot } from "react-slot-fill";

interface ISlotFill {
    Fill: React.ComponentClass<{}>;
    Slot: React.ComponentClass<{}>;
}

function makePair(name: string): ISlotFill {
    const slotName = Symbol(name);

    return {
        Fill: class extends React.Component {
            public static displayName = `${name}.Filler`;
            public render() {
                return <Fill name={slotName}>{this.props.children}</Fill>;
            }
        },
        Slot: class extends React.Component {
            public static displayName = `${name}.Filler`;
            public render() {
                return <Slot name={slotName}>{this.props.children}</Slot>;
            }
        },
    };
}

export const Body = makePair("Body");
