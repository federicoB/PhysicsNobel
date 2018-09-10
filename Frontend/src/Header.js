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
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        logOut().then(
            () => this.props.logoutSuccess()
        )
    }

    render() {
        const {laureates, match, user} = this.props;
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
                    <UserMenu user={user} logOut={this.logOut}
                              style={{
                                  position: 'absolute',
                                  right: '1vw', top: '1vh', zIndex: 1
                              }}/>
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
                            <UserMenu user={user} logOut={this.logOut}>
                                <Menu.Item>
                                    <Link to={urlPrefix + "/"}>Home</Link>
                                </Menu.Item>
                            </UserMenu>
                        </Grid.Column>
                    </Grid>
                </div>
            );
        }
    }
}

class UserMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.toggleOpen = this.toggleOpen.bind(this);
    }

    toggleOpen() {
        this.setState((prevstate) => ({open: !prevstate.open}))
    }

    render() {
        const {user, logOut, style, children} = this.props;
        const {open} = this.state;
        //TODO with react 16 DRY up the not logged in case
        if (user !== null) return (
            <div style={style}>
                <Responsive {...Responsive.onlyMobile} >
                    <i className="circular user icon black"
                       style={{backgroundColor: 'white'}}
                       onClick={this.toggleOpen}>
                        <RevealMenuLogout open={open} logOut={logOut}>
                            <Menu.Item>{user.username}</Menu.Item>
                        </RevealMenuLogout>
                    </i>
                </Responsive>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <Label onClick={this.toggleOpen}>
                        <Icon name="user"/>
                        {user.username}
                        <RevealMenuLogout open={open} logOut={logOut}/>
                    </Label>
                </Responsive>
            </div>
        );
        else return (
            <div style={style}>
                <Responsive {...Responsive.onlyMobile}>
                    <i className="circular user icon black"
                       style={{backgroundColor: 'white'}}
                       onClick={this.toggleOpen}>
                        <RevealMenu open={open}>
                            <Menu.Item>
                                <Link to={urlPrefix + "/login"}>Log in</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to={urlPrefix + "/signup"}>Sign up</Link>
                            </Menu.Item>
                        </RevealMenu>
                    </i>
                </Responsive>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <Menu compact>
                        {children}
                        <Menu.Item>
                            <Link to={urlPrefix + "/login"}>Log in</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={urlPrefix + "/signup"}>Sign up</Link>
                        </Menu.Item>
                    </Menu>
                </Responsive>
            </div>
        );
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