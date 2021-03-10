import { promises as fs } from "fs";
import path from "path";
import { GetStaticProps, GetStaticPropsResult } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";
import { Container } from "semantic-ui-react";

const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));

interface IImprintProps {
    imprint: string;
}

class Imprint extends React.Component<IImprintProps & TranslateProps> {
    render() {
        const { t, imprint } = this.props;

        const crumbs = [{ href: "/", title: t("home") }];

        return (
            <LayoutBody crumbs={crumbs} title={[t("imprint")]}>
                <Container>
                    <div>{t("imprint responsible")}</div>
                    <pre>{imprint}</pre>
                </Container>
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
