import _ from 'underscore';
import React from 'react';
import Tcomb from 'tcomb-form';

import { Button } from 'react-toolbox/lib/button';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

require('./styles.scss');

export default class RTLoginContainer extends React.Component {
    render() {
        return (
            <Layout>
                <Panel>
                    <div className="login">
                    <Card  style={{ width: '350px' }}>
                        <CardTitle className='login-title' title="Zentrack" />
                        <CardText>
                            <LoginForm />
                        </CardText>
                    </Card>
                    </div>

                </Panel>
            </Layout>
        );
    }
}




let formOptions = {
    auto: 'placeholders',
    fields: {}
};

let username = {
    label: 'Username',
    maxLength: 50,
    editable: true, //!this.props.form.isFetching,
    hasError: false, //this.props.form.fields.usernameHasError,
    error: 'Must have 6-12 characters and/or numbers'
};

let password = {
    label: 'Password',
    maxLength: 12,
    type: 'password',
    secureTextEntry: true, //secureTextEntry,
    editable: true, //!this.props.form.isFetching,
    hasError: false, //this.props.form.fields.passwordHasError,
    error: 'Must have 6-12 characters with at least 1 number'
};

const FormSchema = Tcomb.struct({
    username: Tcomb.String,
    password: Tcomb.String
});

formOptions.fields = {username, password};
// formOptions.fields['username'] = username;
// formOptions.fields['password'] = password;

formOptions.template = (locals) => {
    return (<div>
        {_.values(locals.inputs)}
    </div>);
}


Tcomb.form.Form.templates.textbox = require('./tcomb-rt/textbox').default;

class LoginForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)} className='login-form'>
                

                <div><Tcomb.form.Form ref="form" type={FormSchema} options={formOptions} /></div>

                <Button type="submit" primary={true} raised={true}>
                    Login
                </Button>
            </form>
        );
    }

    onSubmit(evt) {
        const formState = this.refs.form.getValue();
        evt.preventDefault();

        console.log('[onSubmit]', formState);
    }
}