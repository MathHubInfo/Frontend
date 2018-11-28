import * as React from "react";

import { Ribbon } from "../Common";

interface IRibbonProps {
    href?: string;
    target?: string;
    color?: "red" | "orange" | "black" | "green";
    className?: string;
}

export default class MHRibbon extends React.Component<IRibbonProps> {
    render() {
        const {href, target, color, className, children} = this.props;

        return ([
            "left",
            "right",
            "left-bottom",
            "right-bottom",
        ]).map(position => (
            <Ribbon
                key={position}
                href={href}
                target={target}
                color={color}
                className={className}
                position={position as "left" | "right" | "left-bottom" | "right-bottom"}
                children={children}
            />
        ));
    }
}
