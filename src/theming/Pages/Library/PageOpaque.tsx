import * as React from "react";
import { IOpaqueElement } from "../../../context/LibraryClient/objects";
import MHHTML from "../../../components/MHHTML";
import STEXHTML from "../../../components/STEXHTML";

interface IOpaqueProps {
    children: IOpaqueElement;
}


export default class PageOpaque extends React.Component<IOpaqueProps> {
    render() {
        const {contentFormat, content, id} = this.props.children;
        switch(contentFormat) {
            case "text":
                return content;
            case "html":
                return <MHHTML>{content}</MHHTML>;
            case "application/xhtml+stex":
                const lang = HACKGetSmglomLanguageID(id);
                return <STEXHTML lang={lang}>{content}</STEXHTML>;
            default:
        }
        
        return <div>
            <b>{contentFormat}</b>
            <pre>{content}</pre>
        </div>
    }
}

const SMGLOM_PREFIX = "pseudo-tree://smglom-stex/";
function HACKGetSmglomLanguageID(id: string): string | undefined {
    if(!id.startsWith(SMGLOM_PREFIX)) return;
    
    const parts = id.substring(SMGLOM_PREFIX.length).split('/');
    if (parts.length != 4) return;

    const candidate = parts[3];
    if(candidate == "") return;
    
    return candidate;
}