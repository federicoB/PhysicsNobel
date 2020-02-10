import React from 'react';
import {Dimmer, Segment, Header} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import {urlPrefix} from "./NetworkRequests";

const numberOfLaureateShown = 20;

export default class LaureatesGrid extends React.Component {
    constructor(props) {
        super(props);
        //get a random number between 0 and number of laureates minus the number of laureates to show
        const start = Math.random() * (this.props.laureates.length - numberOfLaureateShown);
        // initialize component internal state
        this.state = {width: 0, start: start};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        // update windows dimension now that is loaded
        this.updateWindowDimensions();
        //get a random slice of all laureates
        // add event listener to windows DOM object when its dimension change
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        // remove event listener when the component is removed from render tree
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        //save windows width inside component internal state
        this.setState({width: window.innerWidth});
    }

    render() {
        // get start index of slice of laureate array from state
        const start = this.state.start;
        //get the laureate slice from laureate list
        const laureateslice = this.props.laureates.slice(start, start + numberOfLaureateShown);
        // determine number of colums
        // 384 is given by the equation 1920/x = 5 (which means 5 column of full hd)
        const numberOfColumns = Math.round(this.state.width / 384);
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
        // create columns with slice of card and mange items inside with flexbox
        // number of COLUMNS
        let step = Math.floor(numberOfLaureateShown / numberOfColumns);
        for (let i = 0; i <= numberOfLaureateShown - step; i = i + step) {
            //get a slice of array to insert into i-th column
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
                display: 'flex', //using flexbox
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
