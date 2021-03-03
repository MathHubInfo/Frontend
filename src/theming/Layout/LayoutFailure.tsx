import dynamic from "next/dynamic";
import * as React from "react";
import { Container, Icon } from "semantic-ui-react";
import { TranslateProps, WithTranslate } from "../../locales/WithTranslate";
import { DerivedDataStatus } from "../../utils/GetDerivedParameter";
import { IBreadcrumb } from "./Props";

const LayoutBody = dynamic(() => import("./LayoutBody"));

interface ILayoutFailureProps {
    /**
     * Status code that caused the error
     */
    statusCode: number;

    /**
     * Status of why Derived Data Fetching failed
     */
    status?: DerivedDataStatus.MISSING_VALUE | DerivedDataStatus.MISSING_DERIVED | DerivedDataStatus.ERROR_DERIVATION;

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
        const { status, statusCode, crumbs, t } = this.props;

        let title = t("not found");
        let text = t("sorry");
        if (status === DerivedDataStatus.MISSING_VALUE) {
            title = t("missing");
            text = t("missing paramter");
        }
        if (statusCode === 500 || status === DerivedDataStatus.ERROR_DERIVATION) {
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
