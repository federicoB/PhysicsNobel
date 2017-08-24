import React from 'react';
import {Grid,Card,Image} from 'semantic-ui-react'

export default class LaureatesGrid extends React.Component {
    render() {
        const start = Math.random()*(this.props.laureates.length-20);
        const laureateslice = this.props.laureates.slice(start,start+20);
        let cards = laureateslice.map(({name, picture, prizes}) => (
            <Card key={name}>
                <Image src={picture}/>
                <Card.Content>
                    <Card.Header>
                        {name}
                    </Card.Header>
                    <Card.Meta>
                    <span className='date'>
                        {prizes[0]}
                    </span>
                    </Card.Meta>
                </Card.Content>
            </Card>
        ));
        return (
            <Grid>
                {cards}
            </Grid>
        )
    }
}