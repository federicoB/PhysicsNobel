import React from 'react'
import {
    Grid,
    Loader,
    Label,
    Dropdown,
    Responsive,
    Icon,
    Button,
    Image,
    Segment,
    Header as HeaderSemantic
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {logOut} from "./NetworkRequests"

import logo from './assets/atom_white.svg'
import backgroud from './assets/background.jpg'
import SearchBar from './SearchBar'

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
        const searchBar = laureates !== null ?
            <SearchBar laureates={laureates}/> : <Loader active={true}/>;
        if (match.path === "/" && match.isExact) {
            //Home page header
            return (
                <div className="basic inverted massive top attached"
                     style={{
                         backgroundImage: "url(" + backgroud + ")",
                         backgroundSize: 'cover'
                     }}>
                    <UserMenu user={user} logOut={this.logOut}/>
                    <Grid centered stackable columns="16">
                        <Grid.Column width="16">
                            <Link to="/"><Image centered size="small" src={logo}/></Link>
                        </Grid.Column>
                        <Grid.Column width="16">
                            <HeaderSemantic inverted textAlign="center" size="large">PhysicsNobel</HeaderSemantic>
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
                            {user !== null ? <Icon name="user"/> : null}
                        </Grid.Column>
                    </Grid>
                </Segment>
            );
        }
    }
}

class UserMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    render() {
        const {user} = this.props;
        if (user !== null) return (
            <Responsive {...Responsive.onlyMobile} >
                <i className="circular user icon black"
                   style={{backgroundColor: 'white', position: 'relative', left: '80%'}}
                   onClick={() => this.setState((prevstate) => ({open: !prevstate.open}))}>
                    <Dropdown open={this.state.open}>
                        <Dropdown.Menu className='left'>
                            <Dropdown.Item text={user.username}/>
                            <Dropdown.Item text="Log out" icon="log out" onClick={this.props.logOut}/>
                        </Dropdown.Menu>
                    </Dropdown>
                </i>
            </Responsive>
        )
        else return null;
    }
}

/*<Responsive minWidth={Responsive.onlyTablet.minWidth} >
                {user.username}
                <Dropdown>
                    <Dropdown.Menu className='left'>
                        <Dropdown.Item text="Log out" icon="log out" onClick={props.logOut}/>
                    </Dropdown.Menu>
                </Dropdown>
            </Responsive>*/