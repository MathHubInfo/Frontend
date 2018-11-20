import * as React from "react";
import { Fill as FillImpl, Slot as SlotImpl } from "react-slot-fill";

import { PropsOfComponent } from "../../Types/react";
import { MemberType, Without } from "../../Types/utils";
import { Breadcrumbs } from "../Common";
type IBreadCrumbPart = MemberType<PropsOfComponent<Breadcrumbs>["crumbs"]>;

// #region "Simple Pair"

/**
 * Creates a new (Slot, Fill) pair, rendering all ReactNode fills in order
 * @param name name of the pair to create
 */
function makePair(name: string): ISlotFill<React.ReactNode> {
    const slotName = Symbol(name);

    const FillComp = class extends React.Component {
        static displayName = `${name}.Fill`;
        render() {
            return <FillImpl name={slotName}><>{this.props.children}</></FillImpl>;
        }
    };

    const SlotComp = class extends React.Component {
        static displayName = `${name}.Slot`;
        render() {
            return <SlotImpl name={slotName} />;
        }
    };

    return {
        name: slotName,
        Fill: FillComp,
        Slot: SlotComp,
    };
}

// represents a generated slot
interface ISlotFill<T> {
    // name of the slot
    name: symbol | string;
    // the <Fill> component for this slot
    Fill: React.ComponentClass;
    // the <Slot> component for this slot
    Slot: React.ComponentClass;
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
        static displayName = `${slotName}.Fill`;
        render() {
            return <FillImpl name={name}><DataContainer data={this.props.children} /></FillImpl>;
        }
    };

    const Slot = class extends React.Component<IDataSlotProps<T>> {
        static displayName = `${slotName}.Slot`;
        render() {
            return <SlotImpl name={name}>{this.renderChildren}</SlotImpl>;
        }
        private readonly renderChildren = (fills: Array<DataContainer<T>>) => {
            // extract all the data
            const data = fills.map(dc => dc.props.data);
            const element = this.props.children(data);

            return React.isValidElement(element) ? element : <>{element}</>;
        }
    };

    const asSlot = <P extends {fills: T[]}>(WrappedComponent: React.ComponentClass<P>)
    : React.ComponentClass<Without<P, "fills">> => {
        return class extends React.Component<Without<P, "fills">> {
            static displayName = `${slotName}.asSlot(${WrappedComponent.displayName})`;

            render() { return <Slot>{this.renderSlot}</Slot>; }

            private readonly renderSlot = (fills: T[]) => {
                // tslint:disable-next-line:prefer-object-spread
                const theProps = Object.assign({ fills }, this.props) as {} as Readonly<P>;

                return <WrappedComponent {...theProps} />;
            }
        };
    };

    return { name, Fill, Slot, asSlot };
}

// a dummy component to hold some data
class DataContainer<T> extends React.Component<{data: T}> {
    render() { return null; } // *should* never be called
}

// represents a generated slot
interface IDataSlotFill<T> {
    // name of the slot
    name: symbol | string;
    // the <Fill> component for this slot
    Fill: React.ComponentClass<IDataFillProps<T>>;
    // the <Slot> component for this slot
    Slot: React.ComponentClass<IDataSlotProps<T>>;
    // turns a simple component into one with a fills prop
    asSlot<P extends {fills: T[]}>(WrappedComponent: React.ComponentClass<P>):
        React.ComponentClass<Without<P, "fills">>;
}

interface IDataSlotProps<T> {
    children(fills: T[]): React.ReactChild;
}

interface IDataFillProps<T> {
    children: T;
}

// #endregion

const Title = makeDataPair<string>("title");
// tslint:disable-next-line:no-unbound-method
export const TitleAsSlot = Title.asSlot;
export const TitleFill = Title.Fill;

const BreadCrumbs = makeDataPair<IBreadCrumbPart[]>("breadcrumbs");
// tslint:disable-next-line:no-unbound-method
export const BreadCrumbsAsSlot = BreadCrumbs.asSlot;
export const BreadCrumbsFill = BreadCrumbs.Fill;

const Text = makePair("text");
export const TextSlot = Text.Slot;
export const TextFill = Text.Fill;
