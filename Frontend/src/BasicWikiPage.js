import React from 'react'
import wiki from 'wikijs'
import {Loader, Segment, Header, Container} from 'semantic-ui-react'
import WikiText from './WikiText'
import $ from 'jquery'

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

    componentDidUpdate() {
        if (this.state.content) {
            $('.infobox').remove()
            $('#toc').remove()
            $('.mw-editsection').remove()
            $('.metadata').remove()
            $('.navbox').remove()
            $('.reflist').remove()
            $('.reference').remove()
            $('h2:has(#References)').remove()
            $('table').remove()
            $('a[href^="/wiki/"]').each((index, element) => {
                let link = $(element).attr('href')
                link = link.replace('/wiki/', '/pages/')
                $(element).attr('href', link)
            })
        }
    }

    fetchContent(pageName) {
        wiki().page(pageName).then(page => page.html())
            .then(content => this.setState({
            content: content
        }));
    }

    render() {
        const {content} = this.state;
        return (
            <Container>
                <Header size="large">{this.props.name}</Header>
                {content !== null ? <WikiText text={content}/> : <Loader active={true}/>}
            </Container>
        )
    }
}