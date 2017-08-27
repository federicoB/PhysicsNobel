import React from 'react'
import wiki from 'wikijs'
import {Link} from 'react-router-dom'
import {Loader} from 'semantic-ui-react'

export default class ResultsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            results: []
        }
    }

    componentDidMount(){
        let query = this.props.match.params.query;
        this.fetchResults(query);
    }

    fetchResults(query) {
        wiki().search(query,20).then(data=>this.setState({
            results: data.results
        }));
    }

    render() {
        const {results} = this.state;
        const resultsView = results.map((result)=>
            <p key={result}><Link  to={"/pages/"+result}>{result}</Link></p>)
        return (
            <div>
            {(resultsView.length>0)?resultsView:<Loader active={true}/>}
            </div>
    )
    }
}