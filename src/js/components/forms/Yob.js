import React from 'react';

import strategy from 'react-validatorjs-strategy';
import validation from 'react-validation-mixin';

class Yob extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            yob: '',
            submitted: false
        };
        this.earliestYear = 1900;
        this.latestYear = new Date().getFullYear() - 18;
        this.validatorTypes = strategy.createSchema({
            yob: `required|numeric|min:${this.earliestYear}|max:${this.latestYear}`
        }, {
            'min.yob': `Birth year must be after ${this.earliestYear}`,
            'max.yob': `Birth year must be before ${this.latestYear}`,
            'numeric.yob': 'Birth year is invalid',
            'required.yob': 'Birth year is required'
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
                <label htmlFor="yob">What year were you born?</label>
                <ul className="unbulleted">
                    <li className="col--2up">
                        <input type="number" id="yob" value={this.state.yob}
                            onChange={this.handleChange.bind(this, 'yob')}
                            className={this.getFieldClass('yob')}
                            required aria-required="true" placeholder="Year of birth"/>
                        <div className='help-block'>
                            {this.props.getValidationMessages('yob')[0]}
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

export default validation(strategy)(Yob);
