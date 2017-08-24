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
                <Route exact path="/" component={()=>(
                    <div>
                    {laureateLength ?
                        <div>
                            <SearchBar laureates={laureates}/>
                            <LaureatesGrid laureates={laureates}/>
                        </div>
                        : <Loader active={true}/>}
                </div>)}/>
            <Route exact path="/results" component={ResultsPage}/>
            <Route path="/:page" component={PageSwitcher}/>
            </Switch>

        )
    }
}

//TODO if page is in laureate category return LaureatePage, BasicWikiPage otherwise
const PageSwitcher = (props) => null;


let root = document.createElement("DIV");
document.body.appendChild(root);
ReactDOM.render(
    <BrowserRouter>
        <Application/>
    </BrowserRouter>,
    root
);