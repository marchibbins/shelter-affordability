import React from 'react';

import strategy from 'react-validatorjs-strategy';
import validation from 'react-validation-mixin';

class Yob extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            yob: ''
        };
        this.validatorTypes = strategy.createSchema({
            yob: 'required|numeric|min:1900|max:' + (new Date().getFullYear() - 18)
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
        const onValidate = (error) => {
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
                    <label>What year were you born?</label>
                    <input type="number" value={this.state.yob}
                        onChange={this.handleChange.bind(this, 'yob')}/>
                    <div className='help-block'>
                        {this.props.getValidationMessages('yob')[0]}
                    </div>
                </div>
                <input type="submit" value="Compare"/>
            </form>
        );
    }

}

export default validation(strategy)(Yob);
