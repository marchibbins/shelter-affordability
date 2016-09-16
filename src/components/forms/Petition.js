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
            optin: false
        };
        this.validatorTypes = strategy.createSchema({
            firstname: 'required',
            lastname: 'required',
            email: 'required|email'
        });
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

export default validation(strategy)(Petition);
