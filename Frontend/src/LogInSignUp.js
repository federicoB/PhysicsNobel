import React from 'react'
import {Button, Form, Header} from 'semantic-ui-react'

function LoginSignUpContainer(props) {
    return (
        <div className="ui segment" style={{
            width: '25em',
            minWidth: '40vw',
            maxWidth: '95vw',
            margin: 'auto',
        }}>{props.children}
        </div>
    );
}

export default class LogInPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LoginSignUpContainer>
                    <Header size="large">Log in</Header>
                    <Form>
                        <Form.Input
                            fluid
                            size="medium"
                            icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                            type='email'
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            size="medium"
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />
                        <Button fluid size='large'>Log in</Button>
                    </Form>
            </LoginSignUpContainer>
        );
    }
}

export class SignInPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LoginSignUpContainer>
                <Header size="large" textAlign="center">Sign in</Header>
                <Form>
                    <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='E-mail address'
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                    />
                    <Button fluid size='large'>Sign in</Button>
                </Form>
            </LoginSignUpContainer>);
    }
}