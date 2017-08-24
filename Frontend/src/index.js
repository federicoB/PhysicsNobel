import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import '../semantic/dist/semantic.min.css';
import request from 'request';

import {Search} from 'semantic-ui-react'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
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
        this.setState({ value: result.title })
    }

    handleSearchChange(e, { value }) {
        this.setState({ isLoading: true, value })

        //TODO make request, filter set result and set loading to false.
        request('http://localhost:8000/laureates/',(error,response,body)=>{
            const laureates = JSON.parse(body);
            console.log(laureates);
            this.setState({isLoading:false})
        })
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