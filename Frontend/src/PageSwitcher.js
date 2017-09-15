import React from 'react'

import LaureatePage from './LaureatePage/LaureatePage'
import BasicWikiPage from './BasicWikiPage'


export default class PageSwitcher extends React.Component {
    render() {
        const {match, laureates, user} = this.props;
        let pageName = match.params.page;
        if (laureates) {
            return (laureates.filter(({name}) => (name === pageName)).length === 1) ?
                <LaureatePage user={user} name={pageName}/> :
                <BasicWikiPage name={pageName}/>;
        } else return null;
    }
}