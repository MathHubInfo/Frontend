import * as React from "react";

import MHLink from "../../../lib/components/MHLink";
import { ILayoutFooterProps } from "../../../theming/Layout/ILayoutFooterProps";
import { IMathHubVersion } from "../../../types/config";

export class LayoutFooter extends React.Component<ILayoutFooterProps> {
    render() {
        const{ version } = this.props;

        return (
            <footer>
                    <div>
                        <MHLink href="/legal/notices"><a>Notices</a></MHLink>
                        &nbsp;-&nbsp;
                        <MHLink href="/legal/imprint"><a>Imprint</a></MHLink>
                    </div>
                    <div>
                        <small>
                            <MathHubVersion version={version} />
                        </small>
                    </div>
                </footer>
        );
    }
}

class MathHubVersion extends React.Component<{ version: IMathHubVersion }> {
    render() {
        const { semantic, git, configTime } = this.props.version;
        const cfgTime = new Date(configTime).toISOString();

        let version = `MathHub Version ${semantic} configured at ${cfgTime}`;

        if (git) {
            version += " (from ";
            if (git.dirty === true) version += "dirty ";
            else if (git.dirty === false) version += "clean ";
            version += `commit ${git.hash}`;
            if (git.branch) version += ` on branch ${git.branch}`;
            version += ")";
        }

        return version;
    }
}
