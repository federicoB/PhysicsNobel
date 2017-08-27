import React from 'react'
import request from 'superagent'
import {Image,Loader} from 'semantic-ui-react'
import annotator from 'annotator'

export default class LaureatePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            laureate : null
        };
    }
    componentDidMount() {
        this.fetchLaureateInfo(this.props.name);
        let app = new annotator.App();
        app.include(annotator.ui.main);
        app.include(annotator.storage.http, { prefix: "/annotations"});
        app.start();
    }

    fetchLaureateInfo(name) {
        request
            .get('/api/laureates/'+name+"/")
            .set('Accept', 'application/json')
            .end((err, res) => {
                this.setState(
                    {laureate: res.body})
            });
    }

    render() {
        const {laureate} = this.state;
        let works;
        if (laureate!==null) {
            works = laureate.works.map(({title, URL}) => (<p key={URL}>{title} : {URL}</p>));
        }
        return (
            <div>
                {(laureate===null) ? <Loader active={true}/> :
                    <div>
                    <p>{laureate.name}</p>
                    <Image src={laureate.picture}/>
                    <p>{laureate.prizes[0]}</p>
                    <p>{laureate.biography}</p>
                        {works}
                    </div>
                }
            </div>
        )
    }
}