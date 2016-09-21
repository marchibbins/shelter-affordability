import React from 'react';

import strategy from 'react-validatorjs-strategy';
import validation from 'react-validation-mixin';

class Phone extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            phone: '',
            submitted: false
        };
        this.validatorTypes = strategy.createSchema({
            phone: 'required'
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
                this.props.onSubmit(this.getValidatorData());
            }
        };
        this.props.validate(onValidate);
    }

    render () {
        return (
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
        );
    }

}

export default validation(strategy)(Phone);