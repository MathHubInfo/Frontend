// tslint:disable export-name

import dynamic from "next/dynamic";

import MHAppContext, { IMHAppContext } from "../../lib/components/MHAppContext";

import stripTags from "../../utils/stripTags";
import WithExtraContext from "../../utils/WithExtraContext";

import { IBodyDerivedProps, ILayoutBodyProps } from "./ILayoutBodyProps";
import { IMathHubVersion } from "../../types/config";
import getMathHubConfig from "../../context";

const LayoutBody = dynamic<ILayoutBodyProps>(import("../../themes/classic/Layout/LayoutBody"));

export default WithExtraContext<IMHAppContext, IBodyDerivedProps, ILayoutBodyProps>(
    LayoutBody, MHAppContext, ({ description }) => {
        const descriptionText = description ? stripTags(description) : undefined;
        const version: IMathHubVersion = getMathHubConfig().config.MATHHUB_VERSION;

        return {descriptionText, version};
    },
);
