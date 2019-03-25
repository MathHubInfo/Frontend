import * as React from "react";

import MHLink from "../../../lib/components/MHLink";

import { IHomeProps } from "../../../theming/Pages/IHomeProps";

import MHHTML from "../../../lib/components/MHHTML";

export default class Home extends React.Component<IHomeProps> {
    render() {
        return (
            <>
                <MHHTML as="div">{this.props.children}</MHHTML>
                <div>
                    <h2>Content</h2>
                    <ul>
                        <li>
                            <MHLink href="/library"><a>Library</a></MHLink>
                        </li>
                        <li>
                            <MHLink href="/news"><a>News</a></MHLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2>Applications</h2>
                    <ul>
                        <li>
                            <MHLink href="/applications/dictionary"><a>Dictionary</a></MHLink>
                        </li>
                        <li>
                            <MHLink href="/applications/glossary"><a>Glossary</a></MHLink>
                        </li>
                        <li>
                            <MHLink href="/applications/keys"><a>Keys</a></MHLink>
                        </li>
                        <li>
                            <MHLink href="/applications/logger"><a>Logger</a></MHLink>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
}
