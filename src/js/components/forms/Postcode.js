import React from 'react';

import strategy from 'react-validatorjs-strategy';
import validation from 'react-validation-mixin';

class Postcode extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            postcode: '',
            submitted: false
        };
        this.validatorTypes = strategy.createSchema({
            postcode: 'required|regex:/^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i'
        }, {
            'regex.postcode': 'Postcode is invalid',
            'required.postcode': 'Postcode is required'
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
                let data = this.getValidatorData(),
                    postcode = data['postcode'].replace(/ /g,'').toLowerCase();
                this.props.onSubmit({...data, postcode});
            }
        };
        this.props.validate(onValidate);
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="form" noValidate>
                <label htmlFor="postcode">
                    What's happened to house prices in your area?
                    <span className="hide">Enter your postcode to find out.</span></label>
                <ul className="unbulleted">
                    <li className="col--2up">
                        <input type="text" id="postcode" value={this.state.postcode}
                            onChange={this.handleChange.bind(this, 'postcode')}
                            className={this.getFieldClass('postcode')}
                            required aria-required="true" placeholder="Postcode"/>
                        <div className='help-block'>
                            {this.props.getValidationMessages('postcode')[0]}
                        </div>
                    </li>
                    <li className="col--2up">
                        <input type="submit" className="button button--cta" value="Compare"/>
                    </li>
                </ul>
            </form>
        );
    }

}

export default validation(strategy)(Postcode);
