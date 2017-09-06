import React from 'react'
import {Segment} from "semantic-ui-react";

export default class LaureateWorks extends React.Component {
    render() {
        const works = this.props.works.map(({title, URL}) => (<p key={URL}>{title} : {URL}</p>));
        return (<Segment>{works}</Segment>);
    }
}