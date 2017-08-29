import LaureatePage from './LaureatePage/LaureatePage'
import BasicWikiPage from './BasicWikiPage'

export const PageSwitcher = ({match, laureates, user}) => {
    let pageName = match.params.page;
    let page = (laureates.filter(({name}) => (name === pageName)).length === 1) ?
        <LaureatePage user={user} name={pageName}/> : <BasicWikiPage name={pageName}/>;
    return page;
};