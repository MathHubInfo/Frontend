import dynamic from "next/dynamic";
import * as React from "react";
import { Container, Icon } from "semantic-ui-react";
import { TranslateProps, WithTranslate } from "../../locales/WithTranslate";
import { IBreadcrumb } from "./Props";

const LayoutBody = dynamic(() => import("./LayoutBody"));

interface ILayoutFailureProps {
    /**
     * Status code that caused the error
     */
    statusCode: number;

    /**
     * The title of the item that failed
     */
    itemTitle?: string;

    /**
     * The breadcrumbs to the error page
     */
    crumbs: IBreadcrumb[];
}

class LayoutFailure extends React.Component<ILayoutFailureProps & TranslateProps> {
    render() {
        const { statusCode, crumbs, t } = this.props;

        let title = t("not found");
        let text = t("sorry");
        if (statusCode === 500) {
            title = t("wrong");
            text = "";
        }

        return (
            <LayoutBody crumbs={crumbs} title={[title]}>
                <Container>
                    <Icon name={"frown outline"} size={"huge"} />
                    <div>
                        HTTP {statusCode}: {title}
                    </div>
                    <div>{text}</div>
                </Container>
            </LayoutBody>
        );
    }
}

export default WithTranslate(LayoutFailure);
