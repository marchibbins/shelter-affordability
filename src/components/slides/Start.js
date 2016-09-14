import React from 'react';
import { connect } from 'react-redux';

import { updateYob } from '../../actions';

class Start extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            yob: '',
            yobValid: false
        };
    }

    handleChange (event) {
        let yob = parseInt(event.target.value, 10);
        this.setState({
            yob,
            yobValid: yob > 1900 && yob < 2000
        });
    }

    handleSubmit (event) {
        event.preventDefault();
        this.props.updateYob(this.state.yob);
        this.props.gotoNext();
    }

    render () {
        return (
            <article>
                <h1>How have house prices changed in your lifetime?</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>What year were you born?</label>
                    <input type="text" placeholder="Year of birth"
                        value={this.state.yob} onChange={this.handleChange.bind(this)}/>
                    <input type="submit" value="Compare" disabled={!this.state.yobValid}/>
                </form>
            </article>
        );
    }

}

export default connect(state => ({}), dispatch => {
    return {
        updateYob: (year) => {
            dispatch(updateYob(year));
        }
    };
})(Start);
