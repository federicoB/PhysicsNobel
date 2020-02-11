import React from 'react'
import wiki from 'wikijs'
import {Loader, Header, Container} from 'semantic-ui-react'
import WikiText from './WikiText'

function removeElement(query) {
    var element = document.querySelector(query);
    if (element != null)
        element.parentNode.removeChild(element)
}

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
            removeElement('.infobox')
            removeElement('#toc')
            removeElement('.mw-editsection')
            removeElement('.metadata')
            removeElement('.navbox')
            removeElement('.reflist')
            removeElement('.reference')
            removeElement("h2[id='References']")
            removeElement('table')
            var links = document.querySelectorAll('a[href*="/wiki/"]')
            Array.prototype.forEach.call(links, element => {
                let link = element.getAttribute('href')
                link = link.replace('/wiki/', '/pages/')
                element.setAttribute('href', link)
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
