import React from 'react';
import {Header,Container, Segment} from 'semantic-ui-react';

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
        if (prizes.length>0) {
            let prizeViews=  prizes.map((prize)=>(
                <Segment basic key={prize.year}>
                    <Header size="small">{prize.motivation}</Header>
                    <WorksComponent works={prize.works} />
                </Segment>
            ));
            return (<Container text>{prizeViews}</Container>)
        } else return null;
    }
}