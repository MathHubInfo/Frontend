import { default as express, RequestHandler } from "express";
import * as React from "react";
import { Route } from "react-router";

import { IMathHubContext } from "../Context";
import { Module, ReactComponent } from "../Types/react";

import makeRouteComponent, { IRouteComponent } from "./makeRouteComponent";
import makeRouteInfo, { IRouteInfo, IStoredRouteInfo } from "./makeRouteInfo";

// tslint:disable-next-line:export-name
export default class Routing {
    private readonly pureRoutes = new Map<string, ReactComponent<{match: {params: {}}}>>();
    private readonly pureRouteInfo = new Map<string, IStoredRouteInfo<{}, {}>>();
    private readonly itemRoutes = new Map<string, ReactComponent<{match: {params: {id: string}}}>>();
    private readonly itemRoutesInfo = new Map<string, IStoredRouteInfo<{id: string}, {}>>();

    /**
     * Adds a new route to be loaded
     * @param path the path this component should be added under
     * @param componentPromise the promise that loads the component itself
     * @param dataPromise the promise that loads data for the component.
     *                    Should return undefined iff the route should return a 404.
     * @param info Information about the route used by both server and client
     */
    addDataRoute<D>(
        title: string,
        path: string,
        componentPromise: () => Promise<Module<IRouteComponent<D, {}>>>,
        dataPromise: (context: IMathHubContext) => Promise<D | undefined>,
        info?: Partial<IRouteInfo<D>>,
    ) {
        const storedInfo = makeRouteInfo(title, dataPromise, info);
        this.pureRouteInfo.set(path, storedInfo);

        const component = makeRouteComponent(title, dataPromise, componentPromise, storedInfo);
        this.pureRoutes.set(path, component);
    }

    /**
     * Adds a new simple route
     * @param title Name of route to add
     * @param path Name of path to load
     * @param componentPromise promise to load the component
     * @param info Information about the route (if any)
     */
    addPlainRoute(
        title: string,
        path: string,
        componentPromise: () => Promise<Module<IRouteComponent<{}, {}>>>,
        info?: Partial<IRouteInfo<{}>>,
    ) {
        return this.addDataRoute(
            title,
            path,
            componentPromise,
            async () => ({}),
            info,
        );
    }

    /**
     * Adds a new item route
     * @param path the type of library route to load
     * @param componentPromise the promise that loads the appropriate component
     * @param dataPromise the promise that loads data for the component.
     *                    Should return undefined iff the route should return a 404.
     * @param info Information about the route used by both server and client
     */
    addItemRoute<D>(
        title: string,
        path: string,
        componentPromise: () => Promise<Module<IRouteComponent<D, {id: string}>>>,
        dataPromise: (context: IMathHubContext, params: {id: string}) => Promise<D | undefined>,
        info?: Partial<IRouteInfo<D>>,
    ) {
        const storedInfo = makeRouteInfo(title, dataPromise, info);
        this.itemRoutesInfo.set(path, storedInfo);

        const component = makeRouteComponent(title, dataPromise, componentPromise, storedInfo);
        this.itemRoutes.set(path, component);
    }

    /**
     * Creates elements for use within a <Switch>
     */
    createSwitchElements(libraryRouteMaker: (s: string) => string, isDevel: boolean): Array<React.ReactElement<Route>> {
        const results: Array<React.ReactElement<Route>> = [];

        // create elements for the pure routes
        this.pureRoutes.forEach((component: ReactComponent<{match: {params: {}}}>, id: string) => {
            const info = this.pureRouteInfo.get(id);
            if (!info) throw new Error(`Missing pureRouteInfo for ${id}`);
            const path = id.startsWith("/") ? id : libraryRouteMaker(id);

            if (info.clientInfo.develOnly && !isDevel) return; // if we are only on devel, skip
            results.push(<Route key={path} exact path={path} component={component} />);
        });

        // create elements for the normal routes
        this.itemRoutes.forEach((component: ReactComponent<{match: {params: {id: string}}}>, id: string) => {
            const info = this.itemRoutesInfo.get(id);
            if (!info) throw new Error(`Missing itemRouteInfo for ${id}`);
            const path = id.startsWith("/") ? id : libraryRouteMaker(id);

            if (info.clientInfo.develOnly && !isDevel) return; // if we are only on devel, skip
            results.push(<Route key={path} exact path={path} component={component} />);
        });

        return results;
    }

    /**
     * Creates routes within Express for use within express
     */
    createExpressRoutes(
        libraryRouteMaker: (s: string) => string,
        context: IMathHubContext,
    ): Array<[string, RequestHandler]> {
        const results: Array<[string, RequestHandler]> = [];

        // create elements for the pure routes
        this.pureRouteInfo.forEach((info: IStoredRouteInfo<{}, {}>, id: string) => {
            if (info.clientInfo.clientOnly) return; // we are on server, skip
            results.push([
                id.startsWith("/") ? id : libraryRouteMaker(id),
                async (
                    req: express.Request,
                    res: express.Response,
                    next: express.NextFunction,
                ) => {
                    try {
                        req.mathHubInfo = await info.serverInfo(context, {});
                    } catch (e) {return next(e); }
                    next();
                }
            ]);
        });

        // create elements for the normal routes
        this.itemRoutesInfo.forEach((info: IStoredRouteInfo<{id: string}, {}>, id: string) => {
            if (info.clientInfo.clientOnly) return; // we are on server, skip
            results.push([
                id.startsWith("/") ? id : libraryRouteMaker(id),
                async (
                    req: express.Request,
                    res: express.Response,
                    next: express.NextFunction,
                ) => {
                    try {
                        req.mathHubInfo = await info.serverInfo(context, {id: req.params.id});
                    } catch (e) {return next(e); }
                    next();
                }
            ]);
        });

        return results;
    }
}
