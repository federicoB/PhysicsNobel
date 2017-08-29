import React from 'react';
import ReactDOM from 'react-dom';
import '../semantic/dist/semantic.min.css';
import request from 'superagent'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import {Loader} from "semantic-ui-react";

import './style.css';
import SearchBar from './SearchBar'
import LaureatesGrid from './LaureatesGrid'
import ResultsPage from './ResultsPage'
import PageSwitcher from './PageSwitcher'
import Header from './Header'

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            laureates: [],
            user: null,
        };
        this.loginCarriedOut = this.loginCarriedOut.bind(this);
        this.setLaureates = this.setLaureates.bind(this);
    }

    loginCarriedOut(key) {
        this.setState(prevState => ({
            user: Object.assign(prevState.user, {key: response.body.key})
        }));
    }

    setLaureates(laureates) {
        this.setState({laureates: laureates});
    }

    render() {
        const {laureates, user} = this.state;
        const laureateLength = (laureates.length > 0);
        return (
            <div>
                {laureateLength ?
                    <Switch>
                        <Route exact path="/" render={() => (
                            <div>
                                <SearchBar laureates={laureates}/>
                                <LaureatesGrid laureates={laureates}/>
                            </div>
                        )}/>
                        <Route exact path="/results/:query" component={ResultsPage}/>
                        <Route path="/pages/:page"
                               render={props => (<PageSwitcher {...props} user={user} laureates={laureates}/>)}/>
                    </Switch> : <Loader active={true}/>}
            </div>)
    }
}


let root = document.createElement("DIV");
document.body.appendChild(root);
ReactDOM.render(
    <BrowserRouter>
        <Application/>
    </BrowserRouter>,
    root
);