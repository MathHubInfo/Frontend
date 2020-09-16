import dynamic from "next/dynamic";
import * as React from "react";
import intl from "react-intl-universal";
import { Container, Icon } from "semantic-ui-react";
import { DerivedDataStatus } from "../../utils/GetDerivedParameter";
import { IBreadcrumb } from "./Props";

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


const LayoutBody = dynamic(() => import("./LayoutBody"));

export default class LayoutFailure extends React.Component<ILayoutFailureProps> {
    render() {
        const { status, statusCode, crumbs } = this.props;

        let title = intl.get("not found");
        let text = intl.get("sorry");
        if (status === DerivedDataStatus.MISSING_VALUE) {
             title = intl.get("missing");
             text = intl.get("missing paramter");
        }
        if (statusCode === 500 || status === DerivedDataStatus.ERROR_DERIVATION) {
            title = intl.get("wrong");
            text = "";
        }

        return (
            <LayoutBody crumbs={crumbs} title={[title]}>
                <Container>
                    <Icon name={"frown outline"} size={"huge"} />
                    <div>HTTP {statusCode}: {title}</div>
                    <div>{text}</div>
                </Container>
            </LayoutBody>
        );
    }
}
