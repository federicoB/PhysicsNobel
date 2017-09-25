import React from 'react'
import {Button, Form, Header, Message} from 'semantic-ui-react'

import {logIn as logInToServer, signUp as signUpToServer} from './NetworkRequests'

function LoginSignUpContainer(props) {
    return (
        <div className="ui segment" style={{
            width: '25em',
            minWidth: '40vw',
            maxWidth: '95vw',
            margin: 'auto',
            textAlign: 'center'
        }}>{props.children}
        </div>
    );
}

export class LogInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.loginIn = this.loginIn.bind(this);
    }

    handleChange(e, {name, value}) {
        this.setState({[name]: value});
    }

    loginIn() {
        this.setState({loading: true});
        const {email, password} = this.state;
        logInToServer(email, password).end(
            (error, reponse) => logInSignresponseHandler(error, reponse, null, this))
    }

    render() {
        const {email, password, loading, error} = this.state;
        return (
            <LoginSignUpContainer>
                <Header size="large" textAlign="center">Log in</Header>
                <Form loading={loading} error={(error !== null)}>
                    <FormInput
                        icon='mail'
                        placeholder='E-Mail'
                        type="email"
                        value={email}
                        name="email"
                        onChange={this.handleChange}
                        error={error}
                        errorValue={(error !== null) ? error.email : null}
                    />
                    <FormInput
                        icon='lock'
                        placeholder='Password'
                        type="password"
                        value={password}
                        name="password"
                        onChange={this.handleChange}
                        error={error}
                        errorValue={(error !== null) ? error.password : null}
                    />
                    {(error !== null) && (error.non_field_errors !== null) ?
                        <Message error list={error.non_field_errors}/> : null}
                    <Button size='large' onClick={this.loginIn}>Log in</Button>
                </Form>
            </LoginSignUpContainer>
        );
    }
}

function logInSignresponseHandler(error, response, username, component) {
    let state = {};
    if (error || !response.ok) {
        state.error = response.body;
        state.loading = false;
        component.setState(state);
    } else {
        component.props.loginCarriedOut(username, response.body.key);
        component.props.history.push('/');
    }
}

export class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            username: '',
            email: '',
            password1: '',
            password2: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    handleChange(e, {name, value}) {
        this.setState({[name]: value});
    }

    signUp() {
        this.setState({loading: true});
        const {username, email, password1, password2} = this.state;
        signUpToServer(username, email, password1, password2).end(
            (error, reponse) => logInSignresponseHandler(error, reponse, username, this))
    }

    render() {
        const {username, email, password1, password2, loading, error} = this.state;
        return (
            <LoginSignUpContainer>
                <Header size="large">Sign up</Header>
                <Form loading={loading} error={(error !== null)}>
                    <FormInput
                        icon='user'
                        placeholder='Username'
                        value={username}
                        name="username"
                        onChange={this.handleChange}
                        error={error}
                        errorValue={(error !== null) ? error.username : null}
                    />
                    <FormInput
                        icon='mail'
                        placeholder='E-mail address'
                        type="email"
                        value={email}
                        name="email"
                        onChange={this.handleChange}
                        error={error}
                        errorValue={(error !== null) ? error.email : null}
                    />
                    <FormInput
                        icon='lock'
                        placeholder='Password'
                        type='password'
                        value={password1}
                        name="password1"
                        onChange={this.handleChange}
                        error={error}
                        errorValue={(error !== null) ? error.password1 : null}
                    />
                    <FormInput
                        icon='lock'
                        placeholder='Repeat Password'
                        type='password'
                        value={password2}
                        name="password2"
                        onChange={this.handleChange}
                        error={error}
                        errorValue={(error !== null) ? error.password2 : null}
                    />
                    {(error !== null) && (error.non_field_errors !== null) ?
                        <Message error list={error.non_field_errors}/> : null}
                    <Button size='large' onClick={this.signUp}>Sign in</Button>
                </Form>
            </LoginSignUpContainer>);
    }
}

function FormInput(props) {
    return (<div style={{margin: '1em'}}>
        <Form.Input
            fluid
            icon={props.icon}
            iconPosition='left'
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
            name={props.name}
            onChange={props.onChange}
            error={(props.error !== null) && (props.errorValue !== undefined)}
        />
        {(props.error !== null) && (props.errorValue !== null) ? <Message error content={props.errorValue}/> : null}
    </div>);
}