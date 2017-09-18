import React from 'react'
import {Grid, Segment, Form, Button, Header} from 'semantic-ui-react'

export default class LogInPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Grid columns="3" centered verticalAlign="middle">
            <Grid.Column>
                <Segment>
                    <Header size="large">Log in</Header>
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
                        <Button fluid size='large'>Log in</Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>);
    }
}