import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router'
import {Search} from 'semantic-ui-react'

class SearchBarNoRouter extends React.Component {
    constructor(props) {
        super(props);
        this.history = this.props.history;
        this.resetComponent = this.resetComponent.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleGenericSearch = this.handleGenericSearch.bind(this);
        this.resultRenderer = ({ title }) => <Link to={"/pages/"+title} > {title} </Link>;
        this.resultRenderer.propTypes = {
            title: PropTypes.string,
        }
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

    handleGenericSearch(e) {
        //if enter is pressed
        if (e.keyCode===13) {
            this.history.push('/results/'+this.state.value)
        }
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
                onKeyDown={this.handleGenericSearch}
                results={results}
                value={value}
                resultRenderer={this.resultRenderer}
            />
        )
    }
}

export default withRouter(SearchBarNoRouter);