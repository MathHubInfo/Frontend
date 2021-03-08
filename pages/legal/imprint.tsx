import { promises as fs } from "fs";
import path from "path";
import { GetStaticProps, GetStaticPropsResult } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";

const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const PageLegalImprint = dynamic(() => import("../../src/theming/Pages/Legal/PageLegalImprint"));

interface IImprintProps {
    imprint: string;
}

class Imprint extends React.Component<IImprintProps & TranslateProps> {
    render() {
        const { t } = this.props;

        const crumbs = [{ href: "/", title: t("home") }];

        const { imprint } = this.props;

        return (
            <LayoutBody crumbs={crumbs} title={[t("imprint")]}>
                <PageLegalImprint imprint={imprint} />
            </LayoutBody>
        );
    }
}

export default WithTranslate<IImprintProps & TranslateProps>(Imprint);

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<IImprintProps>> => {
    const imprintTXT = path.join(process.cwd(), "src", "assets", "legal", "imprint.txt");
    const imprint = await fs.readFile(imprintTXT, "utf-8");

    return {
        props: { imprint: imprint },
    };
};
