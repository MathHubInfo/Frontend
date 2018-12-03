import { IMathHubContext } from "../Context";

/**
 * Additional information about a route
 */
export interface IRouteInfo<D> extends IClientRouteInfo {
    serverHeader(data: D): IServerRouteInfo;
}

interface IClientRouteInfo {
    develOnly: boolean;
    clientOnly: boolean;
}

export interface IServerRouteInfo {
    title: string;
}


export interface IStoredRouteInfo<P, D> {
    clientInfo: IClientRouteInfo;
    serverInfo(context: IMathHubContext, params: P): Promise<IServerRouteInfo | undefined>;
    serverInfoSync(data: D): IServerRouteInfo;
}


export default function makeRouteInfo<D, P>(
    title: string,
    dataPromise: (context: IMathHubContext, params: P) => Promise<D | undefined>,
    info?: Partial<IRouteInfo<D>>,
): IStoredRouteInfo<P, D> {
    const {develOnly = false, clientOnly = false} = info || {};
    const serverInfoSync = (info && info.serverHeader) ? info.serverHeader : () => ({title});

    return {
        clientInfo: {develOnly, clientOnly},
        serverInfo: async (context: IMathHubContext, params: P) => {
            let data;
            try {
                data = await dataPromise(context, params);
            } catch (e) {}

            return data ? serverInfoSync(data) : undefined;
        },
        serverInfoSync,
    };
}
