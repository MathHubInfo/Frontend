import { NextPageContext } from "next";

export type IDerivedParameter<T> = IDerivedParameterOK<T> | IDerivedParameterFail;

interface IDerivedParameterOK<T> {
    value: string;
    status: DerivedDataStatus.OK | DerivedDataStatus.MULTIPLE_VALUES;
    item: T;
}

export function failed<T, M>(status: IDerivedParameter<T> & M): status is IDerivedParameterFail & M {
    const s = status.status;

    return (
        s === DerivedDataStatus.MISSING_VALUE ||
        s === DerivedDataStatus.MISSING_DERIVED ||
        s === DerivedDataStatus.ERROR_DERIVATION
    );
}

export interface IDerivedParameterFail {
    value: string | "";
    status: DerivedDataStatus.MISSING_VALUE | DerivedDataStatus.MISSING_DERIVED | DerivedDataStatus.ERROR_DERIVATION;
}

// Status of derived data
export enum DerivedDataStatus {
    OK, // everything went ok
    MISSING_VALUE, // value is missing
    MULTIPLE_VALUES, // multiple values were present
    MISSING_DERIVED, // the derived value is missing
    ERROR_DERIVATION, // something went wrong during derivation
}

/**
 * Gets data about a derived parameter from the query
 * @param name Name of parameter to get
 * @param derivation Derivation to perform
 * @param query query to extract parameter from
 * @param res Response object
 */
export default async function GetDerivedParameter<T>(
    name: string | undefined,
    derivation: (value: string) => Promise<T | undefined>,
    query: NextPageContext["query"],
    res?: NextPageContext["res"],
): Promise<IDerivedParameter<T>> {
    const param: IDerivedParameter<string> = name
        ? getParameter(name, query)
        : { value: "", status: DerivedDataStatus.OK, item: "" };

    if (failed(param)) {
        const { status } = param;
        applyStatus(status, res);

        return param;
    }

    const { value } = param;

    let item;
    try {
        item = await derivation(param.item);
    } catch (e) {
        const status = DerivedDataStatus.ERROR_DERIVATION;
        applyStatus(status, res);

        return { value, status };
    }

    if (item !== undefined) {
        const { status } = param;
        applyStatus(status, res);

        return { value, status, item };
    } else {
        const status = DerivedDataStatus.MISSING_DERIVED;
        applyStatus(status, res);

        return { value, status };
    }
}

/**
 * Joins two parameter derivations into one
 * @param promiseA First deriviation to resolve
 * @param promiseB Second derivation to resolve
 */
export function join2<A, B>(
    promiseA: (value: string) => Promise<A | undefined>,
    promiseB: (value: string) => Promise<B | undefined>,
): (value: string) => Promise<[A, B] | undefined> {
    return async (value: string) => {
        const [resultA, resultB] = await Promise.all([promiseA(value), promiseB(value)]);
        if (resultA === undefined || resultB === undefined) return undefined;

        return [resultA, resultB];
    };
}

/**
 * Gets a query parameter as a string
 * @param name Name of the parameter to get
 * @param query Query to extract parameter from
 * @param res Response object
 */
function getParameter(name: string, query: NextPageContext["query"]): IDerivedParameter<string> {
    const item = query[name];
    if (item === undefined) return { value: "", status: DerivedDataStatus.MISSING_VALUE };
    else if (typeof item !== "string")
        if (item.length === 0) return { value: "", status: DerivedDataStatus.MISSING_VALUE };
        else if (item.length !== 1) return { value: item[0], item: item[0], status: DerivedDataStatus.MULTIPLE_VALUES };
        else return { value: item[0], item: item[0], status: DerivedDataStatus.OK };
    else return { value: item, item, status: DerivedDataStatus.OK };
}

/**
 * Applies a derived data status to a server-side request
 * @param status status of result
 * @param res Optional Response to apply status to
 */
function applyStatus(status: DerivedDataStatus, res?: NextPageContext["res"]) {
    if (res) res.statusCode = statusCode(status);
}

/**
 * Gets the status code belonging to a derived data status
 * @param status Status to return
 */
export function statusCode(status: DerivedDataStatus): number {
    switch (status) {
        case DerivedDataStatus.ERROR_DERIVATION:
            return 500;
        case DerivedDataStatus.MISSING_VALUE:
            return 400;
        case DerivedDataStatus.MISSING_DERIVED:
            return 404;
        default:
            return 200;
    }
}
