import React from 'react'
import wiki from 'wikijs'
import {Loader, Segment, Header} from 'semantic-ui-react'
import WikiText from './WikiText'
import Container from "semantic-ui-react/dist/es/elements/Container/Container";

export default class BasicWikiPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content : null
        };
        this.fetchContent = this.fetchContent.bind(this);
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
        return(<Segment>
            <Header size="large">{this.props.name}</Header>
            {content !== null ? <WikiText text={content}/> : <Loader active={true}/>}
        </Segment>)
    }
}