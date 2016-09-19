import React from 'react';

import strategy from 'react-validatorjs-strategy';
import validation from 'react-validation-mixin';

class Postcode extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            postcode: ''
        };
        this.validatorTypes = strategy.createSchema({
            postcode: 'required|regex:/^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i'
        });
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
        const onValidate = error => {
            if (!error) {
                this.props.onSubmit(this.getValidatorData());
            }
        };
        this.props.validate(onValidate);
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} noValidate>
                <div>
                    <label>What's happened to house prices in your area? Enter your postcode to find out.</label>
                    <input type="text" value={this.state.postcode}
                        onChange={this.handleChange.bind(this, 'postcode')}/>
                    <div className='help-block'>
                        {this.props.getValidationMessages('postcode')[0]}
                    </div>
                </div>
                <input type="submit" value="Compare"/>
            </form>
        );
    }

}

export default validation(strategy)(Postcode);
