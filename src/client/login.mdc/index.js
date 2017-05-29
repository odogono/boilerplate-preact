import _ from 'underscore';
import React from 'react';
import Tcomb from 'tcomb-form';

import Button from 'preact-material-components/Button';
import Card from 'preact-material-components/Card';
import Formfield from 'preact-material-components/Formfield';

require('./styles');

export default class LoginContainer extends React.Component {
    render() {
        return (
            <div className="container">
                <Card>
                    <Card.Media className="mdc-theme--primary-bg">
                        <Card.Title className="mdc-theme--text-primary-on-primary" large={true}>Zentrack</Card.Title>
                    </Card.Media>

                    <Card.SupportingText>
                        <LoginForm />
                    </Card.SupportingText>

                </Card>
            </div>
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
    return (<Formfield>
        {_.values(locals.inputs)}
    </Formfield>);
}


Tcomb.form.Form.templates.textbox = require('./tcomb-mdc/textbox').default;

class LoginForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                
                <Tcomb.form.Form ref="form" type={FormSchema} options={formOptions} />
                
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