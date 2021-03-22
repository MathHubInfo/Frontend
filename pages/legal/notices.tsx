import { promises as fs } from "fs";
import path from "path";
import { GetStaticProps, GetStaticPropsResult } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";

const LayoutBody = dynamic(() => import("../../src/layout/LayoutBody"));

interface INoticesProps {
    notices: string | null;
    license: string;
}

class Notices extends React.Component<INoticesProps & TranslateProps> {
    render() {
        const { t, license, notices } = this.props;
        const crumbs = [{ href: "/", title: t("home") }];

        return (
            <LayoutBody crumbs={crumbs} title={[t("notices")]}>
                <h2>{t("license")}</h2>
                <pre>{license}</pre>
                {notices && (
                    <>
                        <h2>{t("notices")}</h2>
                        <pre>{notices}</pre>
                    </>
                )}
            </LayoutBody>
        );
    }
}

export default WithTranslate<INoticesProps & TranslateProps>(Notices);

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<INoticesProps>> => {
    const licenseTXT = path.join(process.cwd(), "LICENSE.txt");
    const noticesTXT = path.join(process.cwd(), "src", "assets", "generated", "notices.txt");

    const [license, notices] = await Promise.all([
        fs.readFile(licenseTXT, "utf-8"),
        fs.readFile(noticesTXT, "utf-8").catch(() => null),
    ]);

    return {
        props: { license, notices },
    };
};
