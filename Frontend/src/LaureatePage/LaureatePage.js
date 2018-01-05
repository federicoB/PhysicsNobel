import React from 'react'
import {Loader} from 'semantic-ui-react'
import annotator from 'annotator'

import LaureateInfo from './LaureateInfo'
import PrizeInfo from './PrizeInfo'
import Biography from './Biography'
import LaureateWorks from './LaureateWorks'
import {getLaureateInfo} from '../NetworkRequests'

/**
 * Component showing detailed info about a laureate
 */
export default class LaureatePage extends React.Component {
    constructor(props) {
        super(props);
        //the only item of the state of a LaureatePage is the laureate to show
        this.state = {
            laureate: null,
        };
        //TODO lazy load annotator
        //setup annotator library
        this.app = new annotator.App();
        //include annotator user interface
        this.app.include(annotator.ui.main);
        //include annotator access control list
        //TODO check if really needed
        this.app.include(annotator.authz.acl);
        //include the backend remote storage
        this.app.include(annotator.storage.http, {prefix: "/annotations/api"});
        this.app.include(() => ({
            beforeAnnotationCreated: (ann) => {
                ann.page_title = this.props.name;
            }
        }));
    }

    componentDidMount() {
        //call network request for getting laureate info and set the state
        getLaureateInfo(this.props.name).then((laureate) => {
            this.setState({laureate: laureate});
            //start annotator
            this.app.start().then(() => {
                if (this.props.user !== null) {
                    const {user} = this.props;
                    //set identity
                    this.app.ident.identity = user.username;
                    //set header for CDRF token protection
                    this.app.annotations.store.setHeader('X-CSRFToken', user.crsfToken);
                    this.app.annotations.store.setHeader('Authorization',
                        "Token " + user.token);
                }
                //load annotation from store
                this.app.annotations.load({page_title: this.props.name});
            });
        });
    }

    render() {
        const {laureate} = this.state;

        return (laureate === null) ?
            <Loader active={true}/> :
            <div style={{margin: 'auto'}}>
                <LaureateInfo name={laureate.name} picture={laureate.picture}
                              prizes={laureate.prizes}/>
                <PrizeInfo prizes={laureate.prizes} name={laureate.name}/>
                <Biography biography={laureate.biography}/>
                <LaureateWorks works={laureate.works}/>
            </div>;
    }
}