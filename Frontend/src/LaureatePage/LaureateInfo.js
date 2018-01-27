import React from 'react'
import {Grid, Image, Header, Container} from "semantic-ui-react";

export default class LaureateInfo extends React.Component {
    render() {
        const years = this.props.prizes.map((prize)=>prize.substr(prize.length-5,4))
            .join(", ");
        return (
                <Grid columns="2" stackable reversed="mobile">
                    <Grid.Column style={{marginRight: '2rem', width: 'auto'}} floated="left">
                        <Image size="medium" src={this.props.picture}/>
                    </Grid.Column>
                    <Grid.Column floated="left" verticalAlign="middle"
                                 textAlign="left">
                        <Header size="huge">{this.props.name}</Header>
                        <Header size="small">Nobel Prize in Physics {years}</Header>
                    </Grid.Column>
                </Grid>
        )
    }
}