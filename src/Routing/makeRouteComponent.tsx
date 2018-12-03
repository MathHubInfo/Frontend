import * as React from "react";

import { IMathHubContext, withContext } from "../Context";
import { DefaultedModule, Module, ReactComponent } from "../Types/react";

import { IServerRouteInfo, IStoredRouteInfo } from "./makeRouteInfo";

interface IRouteComponentState<D, P> extends IRouteComponentProps<D, P> {
    Component?: IRouteComponent<D, P>;
}

export type IRouteComponent<D, P> = ReactComponent<IRouteComponentProps<D, P>>;
export interface IRouteComponentProps<D = {}, P = {}> {
    params: P;
    loaded?: boolean;
    data?: D;
    error?: {};
    serverInfo?: IServerRouteInfo;
}

/**
 * Creates a route component
 * @param dataPromise Promise to lazily load data
 * @param componentPromise Promise to lazily load the component
 */
export default function makeRouteComponent<D, P>(
    loadingNode: React.ReactNode,
    dataPromise: (context: IMathHubContext, params: P) => Promise<D | undefined>,
    componentPromise: () => Promise<Module<IRouteComponent<D, P>>>,
    info: IStoredRouteInfo<P, D>,
): ReactComponent<{match: {params: P}}> {
    return withContext(class extends React.Component<{context: IMathHubContext; match: {params: P}}> {
        static displayName = `makeRouteComponent(${componentPromise.name})`;

        state: IRouteComponentState<D, P> = {loaded: false, params: this.props.match.params};

        private isMounted = false;
        componentDidMount() {
            this.isMounted = true;
            Promise.all([this.loadFactory(), this.loadData()]);
        }
        componentWillMount() {
            this.isMounted = false;
        }
        render() {
            const { Component, ...rest} = this.state;
            const { match, context, ...props} = this.props;

            return Component ? <Component {...rest} {...props} /> : loadingNode;
        }

        // loads the component that is used to display this route
        private readonly loadFactory = async () => {
            let component: Module<IRouteComponent<D, P>>;
            try {
                component = await componentPromise();
            } catch (error) {
                if (this.isMounted) this.setState({error});

                return;
            }

            let Component;
            // tslint:disable-next-line:prefer-conditional-expression
            if ((component as DefaultedModule<IRouteComponent<D, P>>).default)
                Component = (component as DefaultedModule<IRouteComponent<D, P>>).default;
            else
                Component = component as IRouteComponent<D, P>;

            if (this.isMounted) this.setState({Component});
        }

        // loads the data used in this component
        private readonly loadData = async () => {
            let data;
            try {
                data = await dataPromise(this.props.context, this.props.match.params);
            } catch (error) {
                if (this.isMounted) this.setState({error});

                return;
            }

            const serverInfo = data ? info.serverInfoSync(data) : undefined;
            if (this.isMounted) this.setState({data, serverInfo, loaded: true});
        }
    });
}
