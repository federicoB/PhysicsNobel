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
                <Segment basic inverted size="massive" attached="top">
                    <Grid centered>
                        <Grid.Row>
                            <Link to="/"><Image centered size="small" src={logo}/></Link>
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
                <Segment basic inverted size="small" attached="top">
                    <Grid columns="16">
                        <Grid.Column mobile="3" tablet="2" computer="1"
                                     verticalAlign="middle">
                            <Link to="/"><Image size="small" src={logo}/></Link>
                        </Grid.Column>
                        <Grid.Column
                            only="computer tablet" tablet="5" computer="1" verticalAlign="middle">
                            <HeaderSemantic inverted>PhysicsNobel</HeaderSemantic>
                        </Grid.Column>
                        <Grid.Column only="computer" computer="9"/>
                        <Grid.Column mobile="8" tablet="5" computer="3" verticalAlign="middle">
                            {searchBar}
                        </Grid.Column>
                        <Grid.Column mobile="5" tablet="4" computer="2"
                                     verticalAlign="middle">
                            <Link to="/"><Button>Home</Button></Link>
                        </Grid.Column>
                    </Grid>
                </Segment>
            );
        }
    }
}