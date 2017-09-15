import React from 'react'
import request from 'superagent'
import {Loader, Segment} from 'semantic-ui-react'
import annotator from 'annotator'
import Cookies from 'js-cookie'

import LaureateInfo from './LaureateInfo'
import PrizeInfo from './PrizeInfo'
import Biography from './Biography'
import LaureateWorks from './LaureateWorks'
import {getLaureateInfo} from '../NetworkRequests'

export default class LaureatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            laureate: null
        };
    }

    componentDidMount() {
        getLaureateInfo(this.props.name).then((laureate) => {
            this.setState({laureate: laureate})
        });
        this.app = new annotator.App();
        this.app.include(annotator.ui.main);
        this.app.include(annotator.authz.acl);
        this.app.include(annotator.storage.http, {prefix: "/annotations/api"});
        if (Cookies.get("csrftoken")) {
            const crsfttoken = Cookies.get("csrftoken");
            this.app.start().then(() => {
                this.app.ident.identity = 'testPhysicsNobel';
                this.app.annotations.store.setHeader('X-CSRFToken', crsfttoken);
                this.app.annotations.load();

            });

        }
    }

    render() {

        const {laureate} = this.state;

        return (
            <Segment>
                {(laureate === null) ? <Loader active={true}/> :
                    <Segment basic>
                        <LaureateInfo name={laureate.name} picture={laureate.picture}/>
                        <PrizeInfo prizes={laureate.prizes}/>
                        <Biography biography={laureate.biography}/>
                        <LaureateWorks works={laureate.works}/>
                    </Segment>
                }
            </Segment>
        )
    }
}