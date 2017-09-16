import React from 'react'
import {Accordion} from 'semantic-ui-react'

export default class WorksComponent extends React.Component {
    render() {
        const works = this.props.works.map(({title,URL})=> ({
            title: title,
            content:URL
        }));
        return (<Accordion exclusive={false} panels={works} styled/>)
    }
}