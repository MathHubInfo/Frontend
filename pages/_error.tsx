import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import { Icon } from "semantic-ui-react";

import { TranslateProps, WithTranslate } from "../src/locales/WithTranslate";
import { Indexable } from "../src/types/lib";

const Layout = dynamic(() => import("../src/layout"));

interface ErrorProps {
    statusCode?: number;
}

class Error extends React.Component<ErrorProps & TranslateProps> {
    static async getInitialProps({ res, err }: NextPageContext): Promise<ErrorProps> {
        const statusCode = res?.statusCode ?? (err as Indexable<Error>)?.statusCode ?? undefined;
        return { statusCode };
    }

    render() {
        const { t } = this.props;
        let { statusCode } = this.props;
        statusCode ??= 404;

        let title = t("not found");
        let text = t("sorry");
        if (statusCode === 500) {
            title = t("wrong");
            text = "";
        }

        return (
            <Layout crumbs={[]} title={title} plain>
                <Icon name={"frown outline"} size={"huge"} />
                <div>
                    HTTP {statusCode}: {title}
                </div>
                <div>{text}</div>
            </Layout>
        );
    }
}

export default WithTranslate(Error);
