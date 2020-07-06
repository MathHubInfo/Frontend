// tslint:disable: no-submodule-imports
import * as React from "react";

import { default as TGViewImpl } from "tgview";
import { ITGViewOptions as ImplOptions } from "tgview/lib/Configuration";
import { uuid } from "../../../utils/uuid";
import { Omit } from "../../../types/lib";

import getMathHubConfig from "../../../context";

export interface ITGViewOptions extends Omit<
    Partial<ImplOptions>,
    "mainContainer" | "prefix" | "serverBaseURL" | "serverUrl"
> {
    // a mandatory key for this instance of tgview
    // if it changes, the tgview instance is re-created
    instanceKey: string;
}

/**
 * A link between different MathHub Pages
 */
export default class TGView extends React.Component<ITGViewOptions> {
    // the tgview instance (if set)
    private tgview: TGViewImpl | undefined;

    // internal prefix used by tgview, randomly generated
    private readonly instanceId: string = uuid();
    private readonly divRef = React.createRef<HTMLDivElement>();

    componentDidMount() {
        this.createInstance();
    }

    componentDidUpdate(prevState: ITGViewOptions) {
        if (prevState.instanceKey !== this.props.instanceKey)
            this.createInstance();
    }

    componentWillUnmount() {
        this.destroyInstance();
    }

    render() {
        return <div ref={this.divRef} />;
    }

    // destroys the current tgview instance, if any
    private destroyInstance() {
        if (this.tgview)
            this.tgview.destroy();
        this.tgview = undefined;
    }
    // creates a new tgview instance
    private createInstance() {
        this.destroyInstance();

        // get the main element from the div, or return if it doesn't exist
        const mainContainer = this.divRef.current;
        if (!mainContainer) return;

        // fetch the server url, same as library
        const serverBaseURL = getMathHubConfig().libraryClient.getURL();
        if (!serverBaseURL) return;

        this.tgview = new TGViewImpl({
            isMathhub: this.props.isMathhub,
            viewOnlyMode: this.props.viewOnlyMode,
            source: this.props.source,
            type: this.props.type,
            graphdata: this.props.graphdata,
            json: this.props.json,
            highlight: this.props.highlight,

            // set the prefix and main container
            mainContainer,
            serverBaseURL,
            prefix: this.instanceId,
        });
    }
}
