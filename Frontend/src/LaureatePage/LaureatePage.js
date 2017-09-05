import React from 'react'
import request from 'superagent'
import {Image, Loader,Segment} from 'semantic-ui-react'
import annotator from 'annotator'
import Cookies from 'js-cookie'

import WikiText from '../WikiText'
import LaureateInfo from './LaureateInfo'
import PrizeInfo from './PrizeInfo'
import Biography from './Biography'
import LaureateWorks from './LaureateWorks'

export default class LaureatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            laureate: null
        };
    }

    componentDidMount() {
        this.fetchLaureateInfo(this.props.name);
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

    fetchLaureateInfo(name) {
        request
            .get('/api/laureates/' + name + "/")
            .set('Accept', 'application/json')
            .end((err, res) => {
                this.setState(
                    {laureate: res.body})
            });
    }

    render() {

        const {laureate} = this.state;
        let works;

        return (
            <Segment>
                {(laureate === null) ? <Loader active={true}/> :
                    <Segment>
                        <LaureateInfo name={laureate.name} picture={laureate.picture}/>
                        <PrizeInfo prizes={laureate.prizes}/>
                        <Biography biography={laurate.biography}/>
                        <LaureateWorks works={laureate.works}/>
                    </Segment>
                }
            </Segment>
        )
    }
}