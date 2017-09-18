import React from 'react'
import {Grid, Segment, Form, Button, Header} from 'semantic-ui-react'

export default class SignInPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid columns="3" centered verticalAlign="middle">
                <Grid.Column>
                    <Segment>
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
                    </Segment>
                </Grid.Column>
            </Grid>);
    }
}