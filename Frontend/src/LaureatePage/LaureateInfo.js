import React from 'react'
import {Segment, Image, Header} from "semantic-ui-react";

export default class LaureateInfo extends React.Component {
    render() {
        return (
            <Segment>
                <Header>{props.name}</Header>
                <Image src={laureate.picture}/>
            </Segment>
        )
    }
}