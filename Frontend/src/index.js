import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

//import global css rules
import './style.css';

import LaureatesGrid from './LaureatesGrid'
import ResultsPage from './ResultsPage'
import PageSwitcher from './PageSwitcher'
import Header from './Header'
import Footer from './Footer'
import {LogInPage, SignInPage} from './LogInSignUp'
import {getLaureates} from './NetworkRequests'

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            laureates: null,
            user: null,
        };
        this.loginCarriedOut = this.loginCarriedOut.bind(this);
        this.setLaureates = this.setLaureates.bind(this);
    }

    componentDidMount() {
        getLaureates().then(this.setLaureates);
    }

    loginCarriedOut(key) {
        this.setState(prevState => ({
            user: Object.assign(prevState.user, {key: response.body.key})
        }));
    }

    setLaureates(laureates) {
        this.setState({laureates: laureates});
    }

    render() {
        const {laureates, user} = this.state;
        const laureateGrid = () => (laureates !== null) ?
            <LaureatesGrid laureates={laureates}/>
            : null;
        const header = (props) => <Header laureates={laureates} {...props}/>;
        const pageSwitcher = (props) => (
            <PageSwitcher user={user} laureates={laureates} {...props}/>
        );
        const siteContainerStyle = {
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column'
        };
        const mainContentStyle = {
            flex: '1',
            minHeight: '600px',
            display: 'flex',
            paddingTop: '10vh',
        };
        return (
            <div style={siteContainerStyle}>
                <Route path="/" component={header}/>
                <div style={mainContentStyle}>
                    <Switch>
                        <Route exact path="/" component={laureateGrid}/>
                        <Route exact path="/signin" component={SignInPage}/>
                        <Route exact path="/login" component={LogInPage}/>
                        <Route exact path="/results/:query" component={ResultsPage}/>
                        <Route path="/pages/:page" component={pageSwitcher}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        )
    }
}


let root = document.createElement("DIV");
document.body.appendChild(root);
ReactDOM.render(
    <BrowserRouter>
        <Application/>
    </BrowserRouter>,
    root
);