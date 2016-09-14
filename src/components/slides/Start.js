import React from 'react';
import { connect } from 'react-redux';

import { updateYob } from '../../actions';

class Start extends React.Component {

    handleSubmit (event) {
        event.preventDefault();
        this.props.updateYob(1984);
        this.props.gotoNext();
    }

    render () {
        return (
            <article>
                <h1>How have house prices changed in your lifetime?</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>What year were you born?</label>
                    <input type="text" name="yob" placeholder="Year of birth"/>
                    <input type="submit" value="Compare"/>
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