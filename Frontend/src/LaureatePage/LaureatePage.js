import React from 'react'
import request from 'superagent'
import {Image, Loader,Segment} from 'semantic-ui-react'
import annotator from 'annotator'
import Cookies from 'js-cookie'

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
        if (laureate !== null) {
            works = laureate.works.map(({title, URL}) => (<p key={URL}>{title} : {URL}</p>));
        }
        return (
            <Segment>
                {(laureate === null) ? <Loader active={true}/> :
                    <Segment>
                        <p>{laureate.name}</p>
                        <Image src={laureate.picture}/>
                        <p>{laureate.prizes[0]}</p>
                        <p>{laureate.biography}</p>
                        {works}
                    </Segment>
                }
            </Segment>
        )
    }
}