import React from 'react'
import {Loader,Divider,Container} from 'semantic-ui-react'

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
        this.fetchLaureateInfo = this.fetchLaureateInfo.bind(this)
    }

    fetchLaureateInfo(laureateName) {
        //call network request for getting laureate info and set the state
        getLaureateInfo(laureateName).then((laureate) => {
            this.setState({laureate: laureate});
        });
    }

    componentDidMount() {
        this.fetchLaureateInfo(this.props.name)
    }

    componentWillReceiveProps(newProps) {
        //check if a new laureate is requested
        if (this.props.name !== newProps.name) {
            this.setState({laureate: null});
            //re-fetch laureate info
            this.fetchLaureateInfo(newProps.name)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.name!==nextState.name)
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

/**
 *
 * Determines whether the user identified by `identity` is permitted to
 * perform the specified action in the given context.
 *
 * If the context has a "permissions" object property, then actions will
 * be permitted if either of the following are true:
 *
 *   a) permissions[action] is undefined or null,
 *   b) permissions[action] is an Array containing the authorized userid
 *      for the given identity.
 *
 * If the context has no permissions associated with it then all actions
 * will be permitted.
 *
 * If the annotation has a "user" property, then actions will be permitted
 * only if `identity` matches this "user" property.
 *
 * If the annotation has neither a "permissions" property nor a "user"
 * property, then all actions will be permitted.
 *
 * @param action String:  The action to perform.
 * @param context context: The permissions context for the authorization check.
 * @param identity identity: The identity whose authorization is being checked.
 * @return {boolean} Boolean: Whether the action is permitted in this context for this
 * identity.
 */
function permits(action, context, identity) {
    const currentUser = identity
    const permissions = context.permissions
    const annotationOwner = context.user

    if (currentUser && currentUser !== "") {
        if (permissions) {
            // Fine-grained authorization on permissions field
            const tokens = permissions[action]

            if (typeof tokens === 'undefined' || tokens === null || ((typeof tokens === 'object') && (tokens.length === 0))) {
                // Missing tokens array for this action: anyone can perform
                // action.
                return true
            }

            for (let i = 0, len = tokens.length; i < len; i++) {
                if (currentUser === tokens[i]) {
                    return true
                }
            }

            // No tokens matched: action should not be performed.
            return false
        } else if (context.user) {
            // Coarse-grained authorization
            return currentUser === annotationOwner
        } else return true //annotation creation mode
    }

    //default deny
    return false
}
