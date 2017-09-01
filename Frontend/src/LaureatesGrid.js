import React from 'react';
import {Grid, Image, Dimmer, Segment} from 'semantic-ui-react'
import Header from "semantic-ui-react/dist/es/elements/Header/Header";

export default class LaureatesGrid extends React.Component {
    render() {
        const start = Math.random()*(this.props.laureates.length-20);
        const laureateslice = this.props.laureates.slice(start,start+20);
        let cards = laureateslice.map(({name, picture, prizes}) => (
            <Grid.Column key={name}>
                <LaureateCard
                    key={name}
                    picture={picture}
                    name={name}
                    prizes={prizes}
                />
            </Grid.Column>
        ));
        return (
            <Grid columns="4" stackable>
                {cards}
            </Grid>
        )
    }
}

/**
 * This is called card but it doesn't use semantic ui card for personalization.
 */
class LaureateCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    handleShow() {
        this.setState({active: true})
    }

    handleHide() {
        this.setState({active: false})
    }

    render() {
        const {active} = this.state;
        const {name, picture} = this.props;
        return (
            <Dimmer.Dimmable as={Segment} dimmed={active}
                             onMouseEnter={this.handleShow}
                             onMouseLeave={this.handleHide}
            >
                <Dimmer active={active}>
                    <Header as='h2' inverted>
                        {name}
                    </Header>
                </Dimmer>

                <Image size='medium' src={picture}/>
            </Dimmer.Dimmable>
        )
    }
}