import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import { default as LicenseTxt } from "../../LICENSE.txt";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";
import GetDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/GetDerivedParameter";

const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const LayoutFailure = dynamic(() => import("../../src/theming/Layout/LayoutFailure"));
const PageLegalNotices = dynamic(() => import("../../src/theming/Pages/Legal/PageLegalNotices"));

type INoticesProps = IDerivedParameter<string | false>;

class Notices extends React.Component<INoticesProps & TranslateProps> {
    static async getInitialProps({ res, query }: NextPageContext): Promise<INoticesProps> {
        return GetDerivedParameter(
            undefined,
            async () => {
                try {
                    return (await import("../src/assets/generated/notices.txt")).default;
                } catch (e) {
                    return false;
                }
            },
            query,
            res,
        );
    }
    render() {
        const { t } = this.props;
        const crumbs = [{ href: "/", title: t("home") }];

        if (failed(this.props))
            return (
                <LayoutFailure crumbs={crumbs} statusCode={statusCode(this.props.status)} status={this.props.status} />
            );

        const { item } = this.props;

        return (
            <LayoutBody crumbs={crumbs} title={[t("notices")]}>
                <PageLegalNotices notices={item || undefined} license={LicenseTxt} />
            </LayoutBody>
        );
    }
}

export default WithTranslate<INoticesProps & TranslateProps>(Notices);
