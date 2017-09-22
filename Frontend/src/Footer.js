import React from 'react'
import {Label, Image, Grid, Segment, Divider} from 'semantic-ui-react'
import GridColumn from "semantic-ui-react/dist/es/collections/Grid/GridColumn";

export default class Footer extends React.Component {

    render() {
        const images = [
            "http://www.innovaformazione.net/wp-content/uploads/2017/04/corso_ReactJS.png",
            "https://www.djangoproject.com/s/img/logos/django-logo-positive.png",
            "https://upload.wikimedia.org/wikipedia/commons/6/66/Wikidata-logo-en.svg",
            "https://assets.crossref.org/logo/crossref-logo-landscape-200.svg",
        ];
        const imageColumns = images.map((image) =>
            <Grid.Column key={image} verticalAlign="middle">
                <Image size="small" centered src={image}/>
            </Grid.Column>
        );
        return (
            <Segment attached="bottom">
                <Label attached='top left'>Made with:</Label>
                <Grid centered columns={images.length + 4} stackable>
                    {imageColumns}
                    <Grid.Row only="mobile">
                        <Divider hidden/>
                    </Grid.Row>
                </Grid>
                <Label attached='bottom left'>
                    GPLv3 License, view on
                    <a href="https://github.com/federicoB/PhysicsNobel"> github</a>
                </Label>
                <Label attached="bottom right">
                    About
                </Label>
            </Segment>
        )
    }
}