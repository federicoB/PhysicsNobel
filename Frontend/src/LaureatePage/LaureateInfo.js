import React from 'react'
import {Segment, Container, Image, Header} from "semantic-ui-react";

export default class LaureateInfo extends React.Component {
    render() {
        return (
            <Segment basic>
                <Segment basic floated="right" textAlign="center" size="massive">
                    <Header size="huge">{this.props.name}</Header>
                </Segment>
                <Image size="medium" src={this.props.picture}/>

            </Segment>
        )
    }
}