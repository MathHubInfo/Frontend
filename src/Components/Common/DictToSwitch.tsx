import * as React from "react";
import { Route, Switch } from "react-router";

import Routing from "../../Routing";

interface IDictSwitchProps {
    routes: Routing;
    urlMaker(spec: string): string;
}

// turns a routing dictonary into a <switch> element
export default class DictToSwitch extends
    React.Component<IDictSwitchProps, {routes: Array<React.ReactElement<Route>>}> {
    static getDerivedStateFromProps({ routes, urlMaker }: IDictSwitchProps) {
        return {routes: routes.createSwitchElements(urlMaker, process.env.NODE_ENV !== "production") };
    }

    render() {
        return <Switch>{ this.state.routes }</Switch>;
    }
}
