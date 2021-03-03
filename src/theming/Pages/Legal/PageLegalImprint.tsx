import * as React from "react";
import { Container } from "semantic-ui-react";
import { TranslateProps, WithTranslate } from "../../../locales/WithTranslate";

interface IImprintProps {
    /**
     * The text of the imprint
     */
    imprint: string;
}

class PageLegalImprint extends React.Component<IImprintProps & TranslateProps> {
    render() {
        const { t, imprint } = this.props;
        return (
            <Container>
                <div>{t("imprint responsible")}</div>
                <pre>{imprint}</pre>
            </Container>
        );
    }
}

export default WithTranslate(PageLegalImprint);
