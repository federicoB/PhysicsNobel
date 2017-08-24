import React from 'react';
import ReactDOM from 'react-dom';
import '../semantic/dist/semantic.min.css';
import request from 'superagent'

import './style.css';
import SearchBar from './SearchBar'
import LaureatesGrid from './LaureatesGrid'
import {Loader} from "semantic-ui-react";

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
            <div>
            {laureateLength ?
                <div>
                <SearchBar laureates={laureates}/>
                <LaureatesGrid laureates={laureates}/>
                </div>
                : <Loader active={true}/>}
            </div>
        )
    }
}


let root = document.createElement("DIV");
document.body.appendChild(root);
ReactDOM.render(
    <Application/>,
    root
);