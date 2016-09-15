import React from 'react';
import ReactDOM from 'react-dom';

import Joi from 'joi';
import strategy from 'joi-validation-strategy';
import validation from 'react-validation-mixin';

import { api } from '../../utils';

class Petition extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            optin: false
        };
        this.validatorTypes = {
            firstname: Joi.string().required().label('First name'),
            lastname: Joi.string().required().label('Last name'),
            email: Joi.string().email().required().label('Email')
        };
    }

    getValidatorData () {
        return this.state;
    }

    handleChange (name, event) {
        let state = this.state;
        state[name] = event.target.type === 'checkbox' ? event.target.checked: event.target.value;
        this.setState(state);
    }

    handleSubmit (event) {
        event.preventDefault();
        const onValidate = (error) => {
            if (!error) {
                api.postJSON('/survey', JSON.stringify(this.getValidatorData()));
                this.props.onSuccess();
            }
        };
        this.props.validate(onValidate);
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} noValidate>
                <div>
                    <label>First name</label>
                    <input type="text" value={this.state.firstname}
                        onChange={this.handleChange.bind(this, 'firstname')}/>
                    <div className='help-block'>
                        {this.props.getValidationMessages('firstname')[0]}
                    </div>
                </div>
                <div>
                    <label>Last name</label>
                    <input type="text" value={this.state.lastname}
                        onChange={this.handleChange.bind(this, 'lastname')}/>
                    <div className='help-block'>
                        {this.props.getValidationMessages('lastname')[0]}
                    </div>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={this.state.email}
                        onChange={this.handleChange.bind(this, 'email')}/>
                    <div className='help-block'>
                        {this.props.getValidationMessages('email')[0]}
                    </div>
                </div>
                <div>
                    <label>
                        <input type="checkbox" checked={this.state.optin}
                            onChange={this.handleChange.bind(this, 'optin')}/>
                        Opt-in
                    </label>
                </div>
                <input type="submit" value="Sign our petition"/>
            </form>
        );
    }

}

const options = {
    language: {
        any: {
            required: '{{key}} is required'
        },
        string: {
            email: '{{key}} must be valid'
        }
    }
};

export default validation(strategy(options))(Petition);
