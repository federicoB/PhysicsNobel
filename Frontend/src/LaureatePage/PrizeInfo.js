import React from 'react';
import {Header, Container, Segment, Loader} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import {getPrizeInfo} from '../NetworkRequests';
import WorksComponent from './WorksComponent';

export default class PrizeInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prizes: [],
            loading: false,
        }
    }

    componentWillMount() {
        //for each prize won get prize info
        this.props.prizes.map((prize, index) => {
            //set loading true because it's going to do a network request
            this.setState({loading: true})
            getPrizeInfo(prize).then((prize) => this.setState(prevState => {
                let state = {}
                //if this prize is the last requested set loading false
                if (index === this.props.prizes.length - 1) state.loading = false
                //append prize to array of prizes
                state.prizes = [...prevState.prizes, prize]
                return state
            }))
        })
    }

    render() {
        const {prizes, loading} = this.state
        const {name} = this.props

        //for each prize
        let prizeViews = prizes.map((prize) => {
            //create list of coworkers
            let coworkers = prize.laureates.map(({name}) => name)
                .filter((laureate) => (laureate !== name))
                .map((laureate) => (<Link key={laureate} to={"/pages/" + laureate}>{laureate}</Link>))
            coworkers = (coworkers.length > 0) ? coworkers.reduce((prev, curr, index) => [prev, ', ', curr]) : null
            return [
                <Header key={"coworkers-motivation" + prize.year}
                        size="small">{(coworkers) ? "with " : ""}{coworkers} for {prize.motivation}</Header>,
                <Header key={"topicHeader" + prize.year} size="small">Articles about prize topic:</Header>,
                <WorksComponent key={"worksComponent" + prize.year} works={prize.works}/>,
            ]
        })

        return [
            [prizeViews],
            <Loader key="prizeInfoLoader" active={loading}/>
        ]
    }

}