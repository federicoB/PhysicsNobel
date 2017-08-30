import React from 'react'
import {Container,Label,Image,Grid,Segment} from 'semantic-ui-react'

export default class Footer extends React.Component {

    render() {
        const images = [
            "http://www.innovaformazione.net/wp-content/uploads/2017/04/corso_ReactJS.png",
            "https://www.djangoproject.com/s/img/logos/django-logo-positive.png",
            "https://upload.wikimedia.org/wikipedia/commons/6/66/Wikidata-logo-en.svg",
            "https://assets.crossref.org/logo/crossref-logo-landscape-200.svg",
        ];
        const imageViews = images.map((image)=>
            <Grid.Column key={image} verticalAlign="middle">
                <Image size="tiny" src={image}/>
            </Grid.Column>
        );
        return (
            <Segment>
                <Label attached='top left'>Made with:</Label>
            <Grid columns={images.length} stackable={true}>
                <Grid.Row centered={true}>
                    {imageViews}
                </Grid.Row>
            </Grid>
            </Segment>
        )
    }
}