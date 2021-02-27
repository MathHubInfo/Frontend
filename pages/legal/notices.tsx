import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import intl from "react-intl-universal";
import { default as LicenseTxt } from "../../LICENSE.txt";
import GetDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/GetDerivedParameter";

const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const LayoutFailure = dynamic(() => import("../../src/theming/Layout/LayoutFailure"));
const PageLegalNotices = dynamic(() => import("../../src/theming/Pages/Legal/PageLegalNotices"));

type INoticesProps = IDerivedParameter<string | false>;

export default class Notices extends React.Component<INoticesProps> {
    static async getInitialProps({ res, query }: NextPageContext): Promise<INoticesProps> {
        return GetDerivedParameter(
            undefined,
            async () => {
                try {
                    return (await import("../../src/assets/generated/notices.txt")).default;
                } catch (e) {
                    return false;
                }
            },
            query,
            res,
        );
    }
    static readonly crumbs = [{ href: "/", title: intl.get("home") }];
    render() {
        if (failed(this.props))
            return (
                <LayoutFailure
                    crumbs={Notices.crumbs}
                    statusCode={statusCode(this.props.status)}
                    status={this.props.status}
                />
            );

        const { item } = this.props;

        return (
            <LayoutBody crumbs={Notices.crumbs} title={[intl.get("notices")]}>
                <PageLegalNotices notices={item || undefined} license={LicenseTxt} />
            </LayoutBody>
        );
    }
}
