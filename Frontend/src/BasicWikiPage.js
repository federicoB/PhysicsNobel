import React from 'react'
import wiki from 'wikijs'
import {Loader} from 'semantic-ui-react'

export default class BasicWikiPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content : null
        };
    }

    componentDidMount() {
        this.fetchContent(this.props.name);
    }

    fetchContent(pageName) {
        wiki().page(pageName).then(page => page.content())
            .then(content => this.setState({
            content: content
        }));
    }

    render() {
        const {content} = this.state;
        return(<div>
            {content!==null?content:<Loader active={true}/>}
        </div>)
    }
}