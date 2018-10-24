import * as React from "react";
import { CreateSpinningLoader } from "./lazy";

import { Route, Switch } from "react-router";
import { Module, ReactComponent } from "../../types/types";

/** A dictionary specifying routes */
export interface IRouteDict {
    [url: string]: TReactRoute;
}

/** a single react route */
type TReactRoute = (ReactComponent<any> | ITitledReactPromise) & Partial<IRouteProps>;
type ReactPromise = () => Promise<Module<ReactComponent<any>>>;

interface ITitledReactPromise extends ReactPromise {
    /** title of the route while loading */
    routeTitle: string;
}

/** properties of a route */
interface IRouteProps {
    /** is the route devel only? */
    devel: boolean;
}

/** checks if a route is a promise route */
function isComponentPromise(route: TReactRoute): route is ITitledReactPromise {
    return typeof route === "function" && route.hasOwnProperty("routeTitle");
}

/** turns a routing dictonary into a <switch> element */
export default function DictToSwitch(params: {routes: IRouteDict, urlMaker: (spec: string) => string}) {
    const {routes, urlMaker} = params;

    return (
        <Switch>{
            Object.keys(routes).map((key: string) => {
                // if the route is devel only, but we are not in devel, then return
                const value = routes[key];
                if (value.devel && process.env.NODE_ENV === "production") {
                    return null;
                }

                // the url for the route, make it a library route unless we already have it
                const url = (key.startsWith("/") ? key : urlMaker(key));

                // the route for this url, either the given route or a lazy loader for it
                const route: ReactComponent<any> = isComponentPromise(value) ?
                    CreateSpinningLoader(value.routeTitle, value) : value;

                // and build the route object
                return <Route key={key} exact path={url} component={route} />;
            })
        }</Switch>
    );
}