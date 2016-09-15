import React from 'react';
import ReactDOM from 'react-dom';

import Joi from 'joi';
import strategy from 'joi-validation-strategy';
import validation from 'react-validation-mixin';

class Petition extends React.Component {

    constructor (props) {
        super(props);
        this.validatorTypes = {
            firstname: Joi.string().required().label('First name'),
            lastname: Joi.string().required().label('Last name'),
            email: Joi.string().email().required().label('Email')
        };
    }

    getValidatorData () {
        return {
            firstname: ReactDOM.findDOMNode(this.refs.firstname).value,
            lastname: ReactDOM.findDOMNode(this.refs.lastname).value,
            email: ReactDOM.findDOMNode(this.refs.email).value
        };
    }

    handleSubmit (event) {
        event.preventDefault();
        const onValidate = (error) => {
            if (!error) {
                // TODO: POST data
                this.props.onSuccess();
            }
        };
        this.props.validate(onValidate);
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} noValidate>
                <label>First name</label>
                <input type="text" ref="firstname"/>
                <span className='help-block'>{this.props.getValidationMessages('firstname')[0]}</span>
                <label>Last name</label>
                <input type="text" ref="lastname"/>
                <span className='help-block'>{this.props.getValidationMessages('lastname')[0]}</span>
                <label>Email</label>
                <input type="email" ref="email"/>
                <span className='help-block'>{this.props.getValidationMessages('email')[0]}</span>
                <input type="submit" value="Sign our petition"/>
            </form>
        );
    }

}

const options = {
    language: {
        any: {
            empty: '{{key}} is required'
        },
        string: {
            email: '{{key}} must be valid'
        }
    }
};

export default validation(strategy(options))(Petition);
