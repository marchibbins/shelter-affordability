import React from 'react';

import strategy from 'react-validatorjs-strategy';
import validation from 'react-validation-mixin';

import { api } from '../../utils';

class Petition extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            optin: false,
            submitted: false
        };
        this.validatorTypes = strategy.createSchema({
            firstname: 'required',
            lastname: 'required',
            email: 'required|email'
        });
    }

    getFieldClass (name) {
        if (this.state.submitted) {
            return this.props.getValidationMessages(name).length ? 'field-error' : 'field-valid';
        } else {
            return '';
        }
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
        this.setState({submitted: true});
        const onValidate = error => {
            if (!error) {
                api.postJSON('/survey', JSON.stringify({
                    ...this.props.submitData, ...this.getValidatorData()
                }));
                this.props.onSuccess();
            }
        };
        this.props.validate(onValidate);
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="form" noValidate>
                <div className="field-container">
                    <label htmlFor="firstname">First name</label>
                    <input type="text" id="firstname" value={this.state.firstname}
                        onChange={this.handleChange.bind(this, 'firstname')}
                        className={this.getFieldClass('firstname')}
                        required aria-required="true"/>
                    <div className='help-block'>
                        {this.props.getValidationMessages('firstname')[0]}
                    </div>
                </div>
                <div className="field-container">
                    <label htmlFor="lastname">Last name</label>
                    <input type="text" id="lastname" value={this.state.lastname}
                        onChange={this.handleChange.bind(this, 'lastname')}
                        className={this.getFieldClass('lastname')}
                        required aria-required="true"/>
                    <div className='help-block'>
                        {this.props.getValidationMessages('lastname')[0]}
                    </div>
                </div>
                <div className="field-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={this.state.email}
                        onChange={this.handleChange.bind(this, 'email')}
                        className={this.getFieldClass('email')}
                        required aria-required="true"/>
                    <div className='help-block'>
                        {this.props.getValidationMessages('email')[0]}
                    </div>
                </div>
                <div className="field-container">
                    <label htmlFor="optin">
                        <input type="checkbox" id="optin" checked={this.state.optin}
                            onChange={this.handleChange.bind(this, 'optin')}
                            required aria-required="true"/>
                        Opt-in
                    </label>
                </div>
                <input type="submit" className="button button--cta" value="Sign our petition"/>
            </form>
        );
    }

}

export default validation(strategy)(Petition);
