import React from 'react'
import {
    Grid, Loader, Menu, Label, Responsive, Dropdown, Icon, Button, Image, Segment,
    Header as HeaderSemantic
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {logOut} from "./NetworkRequests"

import logo from './assets/atom_white.svg'
import backgroud from './assets/background.jpg'
import SearchBar from './SearchBar'
import {urlPrefix} from "./NetworkRequests";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {laureates, match} = this.props;
        const headerBackgroud = {
            backgroundImage: "url(" + backgroud + ")",
            backgroundSize: 'cover',
            padding: '3vh'
        }
        const searchBar = laureates !== null ?
            <SearchBar laureates={laureates}/> : <Loader active={true}/>;
        if (match.path === "/" && match.isExact) {
            //Home page header
            return (
                <div className="basic inverted massive top attached"
                     style={headerBackgroud}>
                    <Grid centered stackable columns="16">
                        <Grid.Column width="16">
                            <Link to={urlPrefix + "/"}><Image centered size="small" src={logo}/></Link>
                        </Grid.Column>
                        <Grid.Column width="16">
                            <HeaderSemantic id="title" inverted textAlign="center"
                                            size="large">PhysicsNobel</HeaderSemantic>
                        </Grid.Column>
                        <Grid.Column mobile="14" tablet="8" computer="4">
                            {searchBar}
                        </Grid.Column>
                    </Grid>
                </div>
            )
        } else {
            return (
                //Sub pages header
                <div className="basic inverted small top attached"
                     style={headerBackgroud}>
                    <Grid columns="16">
                        <Grid.Column mobile="3" tablet="2" computer="1"
                                     verticalAlign="middle">
                            <Link to={urlPrefix + "/"}><Image size="small" src={logo}/></Link>
                        </Grid.Column>
                        <Grid.Column
                            only="computer tablet" tablet="5" computer="1" verticalAlign="middle">
                            <HeaderSemantic id="title" inverted>PhysicsNobel</HeaderSemantic>
                        </Grid.Column>
                        <Grid.Column only="computer" computer="6"/>
                        <Grid.Column mobile="8" tablet="5" computer="3" verticalAlign="middle"
                                     textAlign="right">
                            {searchBar}
                        </Grid.Column>
                        <Grid.Column mobile="5" tablet="4" computer="5"
                                     verticalAlign="middle" textAlign="right">
                            <Menu >
                                <Menu.Item>
                                    <Link to={urlPrefix + "/"}>Home</Link>
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                    </Grid>
                </div>
            );
        }
    }
}

function RevealMenu(props) {
    if (props.open) return (
        <div className="ui vertical menu" style={{
            position: 'absolute',
            right: '3vw', top: '3vh'
        }}>
            {props.children}
        </div>
    );
    else return null;
}

function RevealMenuLogout(props) {
    return (<RevealMenu open={props.open}>
        {props.children}
        <Menu.Item onClick={props.logOut}>
            <Icon name="log out"/>
            Log out
        </Menu.Item>
    </RevealMenu>)
}
