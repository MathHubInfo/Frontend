import * as React from "react";
import { Icon, SemanticICONS } from "semantic-ui-react";
import { TranslateProps, WithTranslate } from "../locales/WithTranslate";
import copy from "copy-to-clipboard";

import styles from "./Copyable.module.css";

class Copyable extends React.Component<
    { children: string; icon?: SemanticICONS } & TranslateProps,
    { copied: boolean }
> {
    state = { copied: false };

    private timer: number | undefined = undefined;

    private readonly setCopyFlag = () => {
        this.setState({ copied: true });
        this.cancelCopyFlag();
        this.timer = (setTimeout(this.clearCopiedFlag, 1000) as unknown) as number;
    };

    private readonly cancelCopyFlag = () => {
        if (this.timer === undefined) return;
        clearTimeout(this.timer);
        this.timer = undefined;
    };

    private readonly clearCopiedFlag = () => {
        this.setState({ copied: false });
        this.timer = undefined;
    };

    private readonly handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation();
        event.preventDefault();

        if (!copy(this.props.children, { format: "text/plain" })) return;
        this.setCopyFlag();
    };

    componentWillUnmount() {
        this.clearCopiedFlag();
    }

    render() {
        const { children, t, icon } = this.props;
        const { copied } = this.state;

        return (
            <>
                <span onClick={this.handleClick} className={styles.link}>
                    {icon && <Icon name={icon} />}
                    {children}
                </span>
                <span className={copied ? styles.on : styles.off}>{t("copied")}</span>
            </>
        );
    }
}

export default WithTranslate(Copyable);
