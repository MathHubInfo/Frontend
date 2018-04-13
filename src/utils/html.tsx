import * as React from 'react';

type StaticHTMLComponentProps = ActiveStaticHTMLComponentProps | LazyHTMLComponentProps;
interface ActiveStaticHTMLComponentProps {
    lazy?: false
    loadingText?: undefined, 
    failedText?: undefined
    html: string
}
interface LazyHTMLComponentProps {
    lazy: true, 
    loadingText?: string, 
    failedText?: string
    html: () => Promise<string>
}


/** Represents a statically generated component 
 * 
 * WARNING: This component should be used extremely carefully, as it can lead to dangerous code injection.  
 */
export default class StaticHTMLComponent extends React.Component<StaticHTMLComponentProps, {html?: string, failed: boolean }> {
    private triedLoading: boolean = false

    constructor(props: StaticHTMLComponentProps) {
        super(props)
        
        this.state = {
            failed: false, 
            html: (!props.lazy && props.html) || undefined
        }
    }

    componentDidMount() {
        if(!this.triedLoading && this.props.lazy) {
            this.triedLoading = true; 
            this.props.html()
            .then(
                (html) => this.setState({ html: html }), 
                () => this.setState({ failed: true })
            );
        }
    }

    render() {
        if(typeof this.state.html === 'string') {
            return <div dangerouslySetInnerHTML={{__html: this.state.html }} />
        } else if (!this.state.failed){
            return <div>{ this.props.loadingText || "" }</div>
        } else {
            return <div>{ this.props.failedText || "Something went wrong" }</div>
        }
    }
}