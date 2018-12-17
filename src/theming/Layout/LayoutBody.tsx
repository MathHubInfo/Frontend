// tslint:disable export-name

import getConfig from "next/config";
import dynamic from "next/dynamic";

import MHAppContext, { IMHAppContext } from "../../lib/components/MHAppContext";

import stripTags from "../../utils/stripTags";
import WithExtraContext from "../../utils/WithExtraContext";

import { IBodyDerivedProps, ILayoutBodyProps } from "./ILayoutBodyProps";

let LayoutBody: React.ComponentClass<ILayoutBodyProps>;

const {publicRuntimeConfig: {theme, version} } = getConfig();
switch (theme) {
    default:
        LayoutBody = dynamic(import("../../themes/plain/Layout/LayoutBody"));
}

export default WithExtraContext<IMHAppContext, IBodyDerivedProps, ILayoutBodyProps>(
    LayoutBody, MHAppContext, ({ description }) => {
        const descriptionText = description ? stripTags(description) : undefined;

        return {descriptionText, version};
    },
);
