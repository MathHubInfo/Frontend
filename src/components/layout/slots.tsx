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
                return <Slot name={slotName}><>{this.props.children}</></Slot>;
            }
        },
    };
}

const Title = makePair("title");
export const TitleSlot = Title.Slot;
export const TitleFill = Title.Fill;

const BreadCrumbs = makePair("breadcrumbs");
export const BreadCrumbsSlot = BreadCrumbs.Slot;
export const BreadCrumbsFill = BreadCrumbs.Fill;

const Text = makePair("text");
export const TextSlot = Text.Slot;
export const TextFill = Text.Fill;
