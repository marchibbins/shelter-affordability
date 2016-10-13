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
            opt_in: 'N',
            submitted: false
        };
        this.validatorTypes = strategy.createSchema({
            firstname: 'required',
            lastname: 'required',
            email: 'required|email'
        }, {
            'required.firstname': 'First name is required',
            'required.lastname': 'Last name is required',
            'required.email': 'Email is required',
            'email.email': 'Email is invalid'
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
        state[name] = event.target.type === 'checkbox' ? (event.target.checked ? 'Y' : 'N') : event.target.value;
        this.setState(state);
    }

    handleSubmit (event) {
        event.preventDefault();
        this.setState({submitted: true});
        const onValidate = error => {
            if (!error) {
                api.getJSON('/remote_content/affordability/shelter/?json=' + JSON.stringify(this.getPayload()), JSON.stringify(this.getPayload()));
                this.props.onSuccess();
            }
        };
        this.props.validate(onValidate);
    }

    getPayload () {
        return {
            ...this.getValidatorData(),
            appeal_code: '20161017-ACT-CA-01',
            postcode: this.props.submitData.postcode,
            year_of_birth: this.props.submitData.yob,
            housing_tenure: this.props.submitData.tenure
        };
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="form" noValidate>
                <ul className="unbulleted">
                    <li className="col--2up">
                        <label className="hide" htmlFor="firstname">First name</label>
                        <input type="text" id="firstname" value={this.state.firstname}
                            onChange={this.handleChange.bind(this, 'firstname')}
                            className={this.getFieldClass('firstname')}
                            required aria-required="true" placeholder="First name"/>
                        <div className='help-block'>
                            {this.props.getValidationMessages('firstname')[0]}
                        </div>
                    </li>
                    <li className="col--2up">
                        <label className="hide" htmlFor="lastname">Last name</label>
                        <input type="text" id="lastname" value={this.state.lastname}
                            onChange={this.handleChange.bind(this, 'lastname')}
                            className={this.getFieldClass('lastname')}
                            required aria-required="true" placeholder="Last name"/>
                        <div className='help-block'>
                            {this.props.getValidationMessages('lastname')[0]}
                        </div>
                    </li>
                </ul>
                <div className="field-container">
                    <label className="hide" htmlFor="email">Email</label>
                    <input type="email" id="email" value={this.state.email}
                        onChange={this.handleChange.bind(this, 'email')}
                        className={this.getFieldClass('email')}
                        required aria-required="true" placeholder="Email"/>
                    <div className='help-block'>
                        {this.props.getValidationMessages('email')[0]}
                    </div>
                </div>
                <div className="field-container">
                    <label htmlFor="opt_in">
                        <input type="checkbox" id="opt_in" checked={this.state.opt_in === 'Y'}
                            onChange={this.handleChange.bind(this, 'opt_in')}
                            required aria-required="true"/>
                        Email me updates
                        <span className="small">By giving your details you agree
                            that we may use them to send you information about
                            our work, campaigning and fundraising activities.
                        </span>
                        <span className="small">We will never share your personal
                            details. <a href="#">Privacy policy</a>.
                        </span>
                        <span className="small">If you prefer not to hear from us,
                            please contact our supporter helpdesk on 0300 330 1234 or
                            e-mail <a href="mailto:campaign@shelter.org.uk">campaign@shelter.org.uk</a>.
                        </span>
                    </label>
                </div>
                <input type="submit" className="button button--cta" value="Add my name"/>
            </form>
        );
    }

}

export default validation(strategy)(Petition);
