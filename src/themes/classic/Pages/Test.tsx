import * as React from "react";
import intl from "react-intl-universal";
import { Button, Container } from "semantic-ui-react";
import { ITestState } from "../../../../src/theming/Pages/Applications/ITestProps";


export default class Test extends React.Component<ITestState> {
    state = { english: true };
    render() {
        const { initDone } = this.props;

        return (
            <Container>
                <h1>This Page only exists for testing purposes</h1>
                <div>{initDone && intl.get("TEST")}</div>
                <Button onClick={this.onButtonClick}>Switch</Button>
                <Button onClick={this.refresh}>Refresh</Button>
            </Container>
        );
    }
    private readonly refresh = () => {
        this.forceUpdate();
    }
    private readonly onButtonClick = () => {
        const currentLocale = this.state.english ? "de" : "en";
        this.setState({ english: !this.state.english });
        import(`../../../../src/locales/${currentLocale}.json`)
            .then(async res => {
                return intl.init({
                    currentLocale,
                    locales: {
                        [currentLocale]: res,
                    },
                });
            })
            // tslint:disable-next-line:no-console
            .catch(err => console.log(`Error: ${err} occured while loading ${currentLocale}.json`));
    }
}
