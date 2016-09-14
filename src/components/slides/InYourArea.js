import React from 'react';
import { connect } from 'react-redux';

class InYourArea extends React.Component {

    render () {
        return (
            <article>
                <h1>In {this.props.location}, house prices have risen {this.props.locationIncrease}% since you were born.</h1>
                <h2>It's never been harder to buy or rent. Which one best describes you?</h2>
                <button onClick={this.props.gotoNext}>Renter</button>
            </article>
        );
    }

}

const stateToProps = state => {
    return {
        location: state.location,
        locationIncrease: state.locationIncrease
    };
};

export default connect(stateToProps)(InYourArea);
