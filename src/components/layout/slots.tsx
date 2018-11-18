import * as React from "react";

import { Fill as FillImpl, Slot as SlotImpl } from "react-slot-fill";

import { PropsOfComponent, ReactComponent } from "../../types/react";

import { MemberType, Without } from "../../types/utils";
import { Breadcrumbs } from "../common";
type IBreadCrumbPart = MemberType<PropsOfComponent<Breadcrumbs>["crumbs"]>;

// #region "Simple Pair"

/**
 * Creates a new (Slot, Fill) pair, rendering all ReactNode fills in order
 * @param name name of the pair to create
 */
function makePair(name: string): ISlotFill<React.ReactNode> {
    const slotName = Symbol(name);

    const FillComp = class extends React.Component<{}> {
        public static displayName = `${name}.Fill`;
        public render() {
            return <FillImpl name={slotName}><>{this.props.children}</></FillImpl>;
        }
    };

    const SlotComp = class extends React.Component<{}> {
        public static displayName = `${name}.Slot`;
        public render() {
            return <SlotImpl name={slotName} />;
        }
    };

    return {
        name: slotName,
        Fill: FillComp,
        Slot: SlotComp,
    };
}

/** represents a generated slot */
interface ISlotFill<T> {
    /** name of the slot */
    name: symbol | string;
    /** the <Fill> component for this slot */
    Fill: ReactComponent;
    /** the <Slot> component for this slot */
    Slot: ReactComponent;
}

// #endregion
// #region "data pair"

/**
 * Creates a new (Slot, Fill) pair, passing all data fills to a custom render function
 * @param name data to render
 */
function makeDataPair<T>(slotName: string): IDataSlotFill<T> {
    const name = Symbol(slotName);

    const Fill = class extends React.Component<IDataFillProps<T>> {
        public static displayName = `${slotName}.Fill`;
        public render() {
            return <FillImpl name={name}><DataContainer data={this.props.children} /></FillImpl>;
        }
    };

    const Slot = class extends React.Component<IDataSlotProps<T>> {
        public static displayName = `${slotName}.Slot`;
        private renderChildren = (fills: Array<DataContainer<T>>) => {
            // extract all the data
            const data = fills.map((dc) => dc.props.data);
            const element = this.props.children(data);
            return React.isValidElement(element) ? element : <>{element}</>;
        }
        public render() {
            return <SlotImpl name={name}>{this.renderChildren}</SlotImpl>;
        }
    };

    const asSlot = <P extends {fills: T[]}>(WrappedComponent: ReactComponent<P>)
    : ReactComponent<Without<P, "fills">> => {
        return class extends React.Component<Without<P, "fills">> {
            public static displayName = `${slotName}.asSlot(${WrappedComponent.displayName})`;
            private newProps = (fills: T[]): P => {
                const props: any = { fills };
                Object.keys(this.props).map((key) => {
                    props[key] = this.props[key as any];
                });
                return props as P;
            }
            private renderSlot = (fills: T[]) => {
                return <WrappedComponent {...this.newProps(fills)}/>;
            }
            public render() { return <Slot>{this.renderSlot}</Slot>; }
        };
    };

    return { name, Fill, Slot, asSlot };
}

/** a dummy component to hold some data */
class DataContainer<T> extends React.Component<{data: T}> {
    public render() { return null; } // *should* never be called
}

/** represents a generated slot */
interface IDataSlotFill<T> {
    /** name of the slot */
    name: symbol | string;
    /** the <Fill> component for this slot */
    Fill: ReactComponent<IDataFillProps<T>>;
    /** the <Slot> component for this slot */
    Slot: ReactComponent<IDataSlotProps<T>>;
    /** turns a simple component into one with a fills prop */
    asSlot: <P extends {fills: T[]}>(WrappedComponent: ReactComponent<P>) => ReactComponent<Without<P, "fills">>;
}

interface IDataSlotProps<T> {
    children: (fills: T[]) => React.ReactChild;
}

interface IDataFillProps<T> {
    children: T;
}

// #endregion

const Title = makeDataPair<string>("title");
export const TitleAsSlot = Title.asSlot;
export const TitleFill = Title.Fill;

const BreadCrumbs = makeDataPair<IBreadCrumbPart[]>("breadcrumbs");
export const BreadCrumbsAsSlot = BreadCrumbs.asSlot;
export const BreadCrumbsFill = BreadCrumbs.Fill;

const Text = makePair("text");
export const TextSlot = Text.Slot;
export const TextFill = Text.Fill;
