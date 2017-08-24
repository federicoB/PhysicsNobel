import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import '../semantic/dist/semantic.min.css';
import request from 'superagent'

import {Search,Label} from 'semantic-ui-react'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.resetComponent = this.resetComponent.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentWillMount() {
        this.resetComponent()
    }

    resetComponent() {
        this.setState({ isLoading: false, results: [], value: '' });
    }

    handleResultSelect(e, { result }){
        this.setState({ value: result.name })
    }

    handleSearchChange(e, { value }) {
        this.setState({ isLoading: true, value });
        request
            .get('/api/laureates/')
            .set('Accept', 'application/json')
            .end((err, res) => {
                const names = res.body.map(({ name,picture,prizes })=>({title:name}))
                    .filter(({title})=>title.startsWith(value));
                this.setState(
                    {isLoading:false,
                    results:names})
            });
    }

    render() {
        const {isLoading, value, results} = this.state;
        return (
            <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={value}
                resultRenderer={this.resultRenderer}
                {...this.props}
            />
        )
    }
}

let root = document.createElement("DIV");
document.body.appendChild(root);
ReactDOM.render(
    <SearchBar/>,
    root
);