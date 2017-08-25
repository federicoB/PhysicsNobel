import React from 'react';
import ReactDOM from 'react-dom';
import '../semantic/dist/semantic.min.css';
import request from 'superagent'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import {Loader} from "semantic-ui-react";

import './style.css';
import SearchBar from './SearchBar'
import LaureatesGrid from './LaureatesGrid'
import LaureatePage from './LaureatePage'
import ResultsPage from './ResultsPage'
import BasicWikiPage from './BasicWikiPage'

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            laureates: []
        };
        this.getLaureates();
    }

    getLaureates() {
        request
            .get('/api/laureates/')
            .set('Accept', 'application/json')
            .end((err, res) => {
                this.setState(
                    {laureates: res.body})
            });
    }

    render() {
        const {laureates} = this.state;
        const laureateLength = (laureates.length>0);
        return (
            <Switch>
                <Route exact path="/" render={()=>(
                    <div>
                    {laureateLength ?
                        <div>
                            <SearchBar laureates={laureates}/>
                            <LaureatesGrid laureates={laureates}/>
                        </div>
                        : <Loader active={true}/>}
                </div>)}/>
            <Route exact path="/results" component={ResultsPage}/>
            <Route path="/pages/:page" render={props=>(<PageSwitcher {...props} laureates={laureates}/>)}/>
            </Switch>

        )
    }
}

//TODO if page is in laureate category return LaureatePage, BasicWikiPage otherwise
const PageSwitcher = ({match,laureates}) => {
    let pageName = match.params.page;
    let page = (laureates.filter(({name})=>(name===pageName)).length===1) ?
        <LaureatePage name={pageName}/> : <BasicWikiPage name={pageName}/>;
    return page;
};


let root = document.createElement("DIV");
document.body.appendChild(root);
ReactDOM.render(
    <BrowserRouter>
        <Application/>
    </BrowserRouter>,
    root
);