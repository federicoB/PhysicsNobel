import React from 'react'
import {Loader,Divider,Container} from 'semantic-ui-react'
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
        this.inizializeAnnotator = this.inizializeAnnotator.bind(this)
        this.fetchLaureateInfo = this.fetchLaureateInfo.bind(this)
        this.inizializeAnnotator()
    }

    inizializeAnnotator() {
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
        //add hook on annotation creation
        this.app.include(() => ({
            beforeAnnotationCreated: (ann) => {
                //to include page title inside annotation
                ann.page_title = this.props.name;
            }
        }));
    }

    fetchLaureateInfo(laureateName) {
        //call network request for getting laureate info and set the state
        getLaureateInfo(laureateName).then((laureate) => {
            this.setState({laureate: laureate});
            //start annotator
            this.app.start().then(() => {
                if (this.props.user !== null) {
                    const {user} = this.props;
                    //set identity
                    this.app.ident.identity = user.username;
                    //set header for CDRF token protection
                    this.app.annotations.store.setHeader('X-CSRFToken', user.crsfToken);
                    //use token authentication
                    this.app.annotations.store.setHeader('Authorization',"Token " + user.token);
                } else {
                    this.app.ident.identity = ""
                }
                //load annotation from store
                this.app.annotations.load({'page_title': this.props.name});
            });
        });
    }

    componentDidMount() {
        this.fetchLaureateInfo(this.props.name)
    }

    componentWillReceiveProps(newProps) {
        //check if a new laureate is requested
        if (this.props.name !== newProps.name) {
            this.setState({laureate: null});
            //destroy annotator object to clean up
            if (this.app) this.app.destroy()
            //re-fetch laureate info
            this.fetchLaureateInfo(newProps.name)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.name!==nextState.name)
    }

    componentWillUnmount() {
        //destroy annotator object to clean up
        if (this.app) this.app.destroy()
    }

    render() {
        const {laureate} = this.state;

        return (laureate === null) ?
            <Loader active={true}/> :
            <Container style={{marginBottom: "10%"}}>
                <LaureateInfo name={laureate.name} picture={laureate.picture}
                              prizes={laureate.prizes}/>
                <Divider/>
                <PrizeInfo prizes={laureate.prizes} name={laureate.name}/>
                <Divider/>
                <Biography biography={laureate.biography}/>
                <Divider/>
                <LaureateWorks name={laureate.name} works={laureate.works}/>
            </Container>;
    }
}