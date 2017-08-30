import React from 'react'
import {Grid, Loader, Button, Image} from 'semantic-ui-react'
import logo from './assets/atom_color.svg'

import SearchBar from './SearchBar'

export default class Header extends React.Component {
    render() {
        const {laureates, match} = this.props;
        const size = match.path === "/" ? "massive" : "small";
        const searchBar = laureates !== null ?
            <SearchBar laureates={laureates}/> : <Loader active={true}/>;
        return (
            <Grid columns="3">
                <Grid.Row centered={true}>
                    <Grid.Column>
                        <Image size="tiny" src={logo}/>
                    </Grid.Column>
                    <Grid.Column>
                        {searchBar}
                    </Grid.Column>
                    <Grid.Column>
                        <Button>Home</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}