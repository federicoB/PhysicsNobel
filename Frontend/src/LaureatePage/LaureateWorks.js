import React from 'react'
import {Container} from 'semantic-ui-react'

import WorksComponent from './WorksComponent';

export default class LaureateWorks extends React.Component {
    render() {
        return (<Container text>
                    <WorksComponent works={this.props.works} />
                </Container>);
    }
}