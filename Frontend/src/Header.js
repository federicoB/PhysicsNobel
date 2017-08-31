import React from 'react'
import {Grid, Loader, Menu, Button, Image, Segment, Header as HeaderSemantic} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import logo from './assets/atom_white.svg'

import SearchBar from './SearchBar'

export default class Header extends React.Component {
    render() {
        const {laureates, match} = this.props;
        const searchBar = laureates !== null ?
            <SearchBar laureates={laureates}/> : <Loader active={true}/>;
        if (match.path === "/" && match.isExact) {
            return (
                <Segment basic inverted size="massive">
                    <Grid centered doubling>
                        <Grid.Row>
                            <Link to="/"><Image centered size="tiny" src={logo}/></Link>
                        </Grid.Row>
                        <Grid.Row>
                            <HeaderSemantic inverted size="large">PhysicsNobel</HeaderSemantic>
                        </Grid.Row>
                        <Grid.Row>
                                {searchBar}
                        </Grid.Row>
                    </Grid>
                </Segment>
            )
        } else {
            return (
                <Segment basic inverted size="small">
                    <Grid columns="16">
                        <Grid.Column mobile="4" computer="1">
                            <Link to="/"><Image size="small" src={logo}/></Link>
                        </Grid.Column>
                        <Grid.Column mobile="4" computer="1">
                            <HeaderSemantic inverted>PhysicsNobel</HeaderSemantic>
                        </Grid.Column>
                        <Grid.Column mobile="0" computer="9"/>
                        <Grid.Column mobile="4" computer="3">
                            {searchBar}
                        </Grid.Column>
                        <Grid.Column mobile="4" computer="2">
                            <Link to="/"><Button>Home</Button></Link>
                        </Grid.Column>
                    </Grid>
                </Segment>
            );
        }
    }
}