import React from 'react';

import strategy from 'react-validatorjs-strategy';
import validation from 'react-validation-mixin';

import { api } from '../../utils';

class Phone extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            phone: '',
            showForm: true,
            submitted: false
        };
        this.validatorTypes = strategy.createSchema({
            phone: 'required'
        }, {
            'required.phone': 'Phone number is required'
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
        state[name] = event.target.value;
        this.setState(state);
    }

    handleSubmit (event) {
        event.preventDefault();
        this.setState({submitted: true});
        const onValidate = error => {
            if (!error) {
                api.postJSON('/phone', JSON.stringify(this.getValidatorData()));
                this.setState({showForm: false});
            }
        };
        this.props.validate(onValidate);
    }

    render () {
        if (this.state.showForm) {
            return (
                <div>
                    <h2 className="slide__title">Want to find out how else you can help? If you’d like to chat to us
                        about other ways you can get involved, please enter your phone number below.</h2>
                    <form onSubmit={this.handleSubmit.bind(this)} className="form" noValidate>
                        <label htmlFor="phone">Phone number</label>
                        <ul className="unbulleted">
                            <li className="col--2up">
                                <input type="number" id="phone" value={this.state.phone}
                                    onChange={this.handleChange.bind(this, 'phone')}
                                    className={this.getFieldClass('phone')}
                                    required aria-required="true"/>
                                <div className='help-block'>
                                    {this.props.getValidationMessages('phone')[0]}
                                </div>
                            </li>
                            <li className="col--2up">
                                <input type="submit" className="button button--cta" value="Submit"/>
                            </li>
                        </ul>
                    </form>
                </div>
            );
        } else {
            return <div/>; // TODO
        }
    }

}

export default validation(strategy)(Phone);
