import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router";

import { IMathHubContext } from "../../Context";
import { Module } from "../../Types/react";
import { CreateSpinningLoader } from "../Loaders";

// A dictionary specifying routes
export interface IRouteDict {
    [url: string]: TReactRoute<{}> | TReactRoute<{id: string}>;
}


// a single react route
type TReactRoute<T> = (TRouteClass<T> | ITitledReactPromise<T>) & Partial<IRouteProps>;
interface ITitledReactPromise<T> {
    (): Promise<Module<TRouteClass<T>>>;

    // title of the route while loading
    routeTitle: string;
}
type TRouteClass<T> = React.ComponentClass<RouteComponentProps<T>>;

// properties of a route
interface IRouteProps {
    // is the route devel only?
    isDevelOnly: boolean;

    // is the route only on the client side?
    isClientOnly?: boolean;

    // if defined, is called by the server to check if a router is 404
    is404?(params: {id: string}, context: IMathHubContext): Promise<boolean>;
}

// checks if a route is a promise route
function isComponentPromise<S, T>(route: TReactRoute<S> | TReactRoute<T>):
    route is (ITitledReactPromise<S> | ITitledReactPromise<T>) {
    return typeof route === "function" && route.hasOwnProperty("routeTitle");
}

// turns a routing dictonary into a <switch> element
export default class DictToSwitch extends React.Component<{routes: IRouteDict; urlMaker(spec: string): string}> {
    render() {
        const { routes, urlMaker } = this.props;

        return (
            <Switch>{
                Object.keys(routes).map((key: string) => {
                    // if the route is devel only, but we are not in devel, then return
                    const value = routes[key];
                    if (value.isDevelOnly && process.env.NODE_ENV === "production")
                        return null;

                    // the url for the route, make it a library route unless we already have it
                    const url = (key.startsWith("/") ? key : urlMaker(key));

                    // the route for this url, either the given route or a lazy loader for it
                    const RouteComponent = isComponentPromise<{}, {id: string}>(value) ?
                        // tslint:disable-next-line:no-any
                        CreateSpinningLoader<any>(value.routeTitle, value) : value;

                    // and build the route object
                    return <Route key={key} exact path={url} component={RouteComponent} />;
                })
            }</Switch>
        );
    }
}
