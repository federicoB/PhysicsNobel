import React from 'react';
import {Header,Container, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom'

import {getPrizeInfo} from '../NetworkRequests';
import WorksComponent from './WorksComponent';

export default class PrizeInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prizes : []
        }
    }

    componentDidMount() {
        this.props.prizes.map((prize)=>getPrizeInfo(prize)
            .then((prize)=>this.setState(prevState=>({
                prizes : [...prevState.prizes,prize]
            }))))
    }

    render() {
        const {prizes} = this.state;
        const {name} = this.props;
        if (prizes.length>0) {
            let prizeViews = prizes.map((prize) => {
                let coworkers = prize.laureates.map(({name}) => name)
                    .filter((laureate) => (laureate !== name))
                    .map((laureate) => (<Link to={"/pages/" + laureate}>{laureate}</Link>))
                    .reduce((prev, curr, index) => [prev, ', ', curr]);
                coworkers.push(" ");
                return (
                    <Segment basic key={prize.year}>
                        <Header
                            size="small">{(coworkers.length > 0) ? "with " : ""}{coworkers}for {prize.motivation}</Header>
                        <Header size="medium">Articles about that:</Header>
                        <WorksComponent works={prize.works}/>
                    </Segment>
                )
            });
            return (<Container text>{prizeViews}</Container>)
        } else return null;
    }
}