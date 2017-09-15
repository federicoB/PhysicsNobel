import React from 'react'
import {Grid, Image, Header} from "semantic-ui-react";

export default class LaureateInfo extends React.Component {
    render() {
        return (
            <Grid columns="2" stackable reversed="computer tablet">
                <Grid.Column floated="right" verticalAlign="middle"
                             textAlign="center">
                    <Header size="huge">{this.props.name}</Header>
                </Grid.Column>
                <Grid.Column floated="left">
                    <Image size="medium" centered src={this.props.picture}/>
                </Grid.Column>
            </Grid>
        )
    }
}