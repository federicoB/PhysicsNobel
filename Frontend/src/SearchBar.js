import React from 'react';

import {Search} from 'semantic-ui-react'

export default class SearchBar extends React.Component {
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
        let laureates = this.props.laureates.map(({ name,picture,prizes })=>({title:name}));
        this.setState({
            value: value,
            results:laureates.filter(({title})=>title.startsWith(value))
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
                resultRenderer={this.resultRenderer}
            />
        )
    }
}