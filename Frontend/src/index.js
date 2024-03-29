//external libraries imports
import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Header as HeaderUi, Image, Segment} from 'semantic-ui-react'

//import global css rules
import './style.css';

//project modules imports
import LaureatesGrid from './LaureatesGrid'
import ResultsPage from './ResultsPage'
import PageSwitcher from './PageSwitcher'
import Header from './Header'
import Footer from './Footer'
import {getLaureates, urlPrefix} from './NetworkRequests'

/**
 * Root container of application.
 * Application handle routing, fetch laureate list at startup.
 * The application state contains laureate list and logged in user.
 * It's state is used as props by a lots of components.
 */
class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            laureates: null,
        };
    }

    /**
     * Called after render method. Only one time after the component is rendered. Not at every update.
     */
    componentDidMount() {
        //make a network request for fetch laureates and save the list in the application state.
        getLaureates().then((laureates) => this.setState({laureates: laureates}));
    }

    render() {
        //retrieve laureates list and user from state (can be null)
        const {laureates} = this.state;
        //render the laureate grid only if the laureates has been fetched
        const laureateGrid = () => (laureates !== null) ?
            <LaureatesGrid laureates={laureates}/>
            : null;
        //add other ...props for passing match and history prop to components that need to redirect of check matched url
        const header = (props) => <Header laureates={laureates}
                                           {...props} logoutSuccess={this.logOutSuccessful}/>;
        const pageSwitcher = (props) => (
            <PageSwitcher laureates={laureates} {...props}/>
        );
        //style for the root container that include header, main content and footer
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
            justifyContent: 'center'
        };
        return (

            <div style={siteContainerStyle}>
                {/* HEADER */}
                {/*using render attribute instead of component when using funcional components for avoiding re-rendering
                as described in the docs https://reacttraining.com/react-router/web/api/Route/render-func  */}
                <Route path="/" render={header}/>
                {/* WEBSITE MAIN CONTENT */}
                <div style={mainContentStyle}>
                    <Switch>
                        {/* homepage laureate list/grid */}
                        <Route exact path={urlPrefix + "/"} render={laureateGrid}/>
                        {/* Result page from wikipedia search with keyword not relating to a laureate */}
                        <Route exact path={urlPrefix + "/results/:query"} component={ResultsPage}/>
                        {/* Detail page, the url is the same for laureate of generic wikipedia articles.
                        page switcher handle the component choose. */}
                        <Route path={urlPrefix + "/pages/:page"} render={pageSwitcher}/>
                        {/* Switch is exclusive so if a Route has no matched yet at this point 404 will be show*/}
                        <Route path={urlPrefix + "/:something"} component={NotFound404}/>
                    </Switch>
                </div>
                {/* FOOTER */}
                <Footer/>

            </div>
        )
    }
}

//application root element, required by ReactDom.render
let root = document.createElement("DIV");
//add application root element to the DOM
document.body.appendChild(root);
//first render call of the application
ReactDOM.render(
    <BrowserRouter>
        <Application/>
    </BrowserRouter>,
    root
);

/**
 * Functional component for a 404 page.
 */
function NotFound404() {
    return (
        <Segment basic>
            <HeaderUi textAlign="center" size="huge">404 page not found</HeaderUi>
            {/* Einstein grimace */}
            <Image shape="rounded" src="https://upload.wikimedia.org/wikipedia/en/8/86/Einstein_tongue.jpg"/>
        </Segment>
    );
}
