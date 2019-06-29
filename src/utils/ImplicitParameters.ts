import { isEqual } from "lodash";
import { NextContext } from "next";
import Router from "next/router";
import { stringify } from "querystring";

import { Indexable } from "../types/lib";

/**
 * A set of names for initial parameters
 */
type IImplicitMappedToString<T> = {[key in keyof T]: string | null};

/**
 * A dictonary of marshals for a given value.
 * If a marshal is omitted, it is assumed that T is a sub-type of string.
 */
type IImplicitMarshals<T> = {[key in keyof T]?: IImplicitMarshal<T[key]>};

/**
 * A dictionary of un-marshals of a given value.
 * If a marshal is omitted, it is assumed that it is the toString() function
 */
type IImplicitUnmarshals<T> = {[key in keyof T]?: IImplicitUnmarshal<T[key]>};

type IImplicitMarshal<T> = (value: string[] | string | undefined) => T;
type IImplicitUnmarshal<T> = (value: T) => string;

export default class ImplicitParameters<T> {
    constructor(
        public names: IImplicitMappedToString<T>,
        public marshals: IImplicitMarshals<T> = {},
        public unmarshals: IImplicitUnmarshals<T> = {},
    ) {}

    /**
     * Reads the implicit parameters from the query
     * @param query Query object to marshal state from
     */
    readImplicits(query: NextContext["query"]): Partial<T> {
        const result: Indexable<Partial<T>> = {};

        Object.keys(this.names).forEach(p => {
            const parser = this.marshals[p as keyof T];
            const value = query[(this.names as Indexable<IImplicitMappedToString<T>>)[p] || p];

            result[p] = parser ? parser(value) :
                typeof value === "string" ? value as unknown as T[keyof T] :
                value === undefined ? undefined : value[0] as unknown as T[keyof T];
        });

        return result as Partial<T>;
    }

    /**
     * Conditionally updates implicits in the url if they have changed
     * @param implicits new implicit values
     * @param prev previous implicit values
     */
    async updateImplicits<Q extends T>(implicits: Q, prev: Q): Promise<void> {
        const current = this.unmarshal(implicits);
        const previous = this.unmarshal(prev);

        // if something has changed, update the url state
        // and overwrite the entire current state
        if (!isEqual(current, previous))
            return ImplicitParameters.replaceRouterParameters(current);
    }

    /**
     * Unconditionally sets implicits in the URL
     * @param implicits Implicit values to set
     */
    async setImplicits<Q extends T>(implicits: Partial<Q>): Promise<void> {
        return ImplicitParameters.replaceRouterParameters(this.unmarshal(implicits));
    }

    private unmarshal<Q extends T>(implicits: Partial<Q>): Record<string, string> {
        const record: Record<string, string> = {};

        Object.keys(implicits).forEach(ik => {
            if (this.names.hasOwnProperty(ik)) {
                const [name, value] = this.unmarshalkey(implicits, ik as keyof T);
                if (value !== undefined)
                    record[name] = value;
            }
        });

        return record;
    }

    /**
     * Un-marshals a single key object into a string
     * @param implicits Dictionary of implicits
     * @param name Name of implicit to unmarshal
     */
    private unmarshalkey(implicits: Partial<T>, name: keyof T): [string, string | undefined] {
        const pName = (this.names[name] || name) as string;
        if (implicits.hasOwnProperty(name)) {
            const value = implicits[name] as T[keyof T] | undefined;
            if (value === undefined) return [pName, undefined];

            const unmarshal = this.unmarshals[name];

            return [pName, unmarshal ? unmarshal(value) : value.toString()];
        } else return [pName, undefined];
    }

    /**
     * Explicitly replaces router query parameters
     * @param values Values to set
     */
    static async replaceRouterParameters(values: Record<string, string>): Promise<void> {
        // update the query to include the new value for the implicit parameters
        const query = {...(Router.query || {}), ...values};

        try {
            await Router.replace(`${Router.pathname}?${stringify(query)}`, undefined, {shallow: true});
        } catch (e) { }
    }

    static first<T>(parser: (x: string) => T | undefined, dflt: T): IImplicitMarshal<T> {
        return (value: undefined | string | string[]) => {
            if (value === undefined) return dflt;
            const parsed = parser(typeof value === "string" ? value : value[0]);

            return parsed === undefined ? dflt : parsed;
        };
    }

    static firstString(dflt: string): IImplicitMarshal<string> {
        return ImplicitParameters.first(x => x, dflt);
    }

    static validated<T extends string>(validator: (x: string) => x is T, dflt: T): IImplicitMarshal<T> {
        return ImplicitParameters.first(x => validator(x) ? x : undefined, dflt);
    }

}
