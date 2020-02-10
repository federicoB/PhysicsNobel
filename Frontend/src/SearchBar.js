import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router'
import {Search, Segment} from 'semantic-ui-react'
import {urlPrefix} from "./NetworkRequests";

class SearchBarNoRouter extends React.Component {
    constructor(props) {
        super(props);
        this.history = this.props.history;
        this.state = {
            value: "",
            results: []
        };
        this.resetComponent = this.resetComponent.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.gotoGenericSearch = this.gotoGenericSearch.bind(this);
        this.resultRenderer = ({ title }) =>
            <Link to={urlPrefix + "/pages/" + title}><Segment basic compact size="small"> {title} </Segment></Link>;
        this.resultRenderer.propTypes = {
            title: PropTypes.string,
        }
    }

    componentDidMount() {
        this.resetComponent()
    }

    resetComponent() {
        this.setState({ results: [], value: '' });
    }

    handleResultSelect(e, { result }){
        this.setState({ value: result.name })
    }

    gotoGenericSearch() {
        this.history.push(urlPrefix + '/results/' + this.state.value)
    }

    handleSearchChange(e, { value }) {
        let laureates = this.props.laureates.map(
            ({ name,picture,prizes })=>({title:name})
        );
        this.setState({
            value: value,
            results:laureates.filter(({title})=>title.startsWith(value))
        })
    }

    render() {
        const {value, results} = this.state;
        return (
            <Search
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                onKeyDown={(e) => {
                    if (e.keyCode === 13) this.gotoGenericSearch()
                }}
                results={results}
                value={value}
                resultRenderer={this.resultRenderer}
            />
        )
    }
}

export default withRouter(SearchBarNoRouter);
