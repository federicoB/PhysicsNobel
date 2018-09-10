import React from 'react';
import {Grid, Image, Dimmer, Segment, Header} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import {urlPrefix} from "./NetworkRequests";

const numberOfLaureateShown = 20;
const numberOfMaxColumn = 5;

export default class LaureatesGrid extends React.Component {
    render() {
        //get a random slice of all laureates
        //get a random number between 0 and number of laureates minus the number of laureates to show
        const start = Math.random() * (this.props.laureates.length - numberOfLaureateShown);
        //get the laureate slice from laureate list
        const laureateslice = this.props.laureates.slice(start, start + numberOfLaureateShown);
        //create list of cards components showing info about laureates
        let cards = laureateslice.map(({name, picture, prizes}) => (
                <LaureateCard
                    key={name}
                    picture={picture}
                    name={name}
                    prizes={prizes}
                />
        ));
        let component = [];
        let step = Math.floor(numberOfLaureateShown / numberOfMaxColumn);
        for (let i = 0; i <= numberOfLaureateShown - step; i = i + step) {
            const slice = cards.slice(i, i + step);
            component.push(<div key={i} style={{
                width: '300px',
                padding: '1vw'
            }}>
                {slice}
            </div>)
        }
        return (
            <div id="laureateGrid" style={{
                display: 'flex',
                flexFlow: 'row wrap',
                margin: 'auto',
                justifyContent: 'center',
            }}>
                {component}
            </div>
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
                             onMouseLeave={this.handleHide}>
                <Link to={urlPrefix + "/pages/" + name}>
                    <Dimmer active={active}>

                        <Header as='h2' inverted>
                            {name}
                        </Header>

                    </Dimmer>
                </Link>
                <img className="ui medium image" src={picture}/>
            </Dimmer.Dimmable>
        )
    }
}