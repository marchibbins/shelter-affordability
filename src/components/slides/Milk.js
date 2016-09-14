import React from 'react';
import { connect } from 'react-redux';

import { updateLocation } from '../../actions';
import { formatCurrency } from '../../utils';

class Milk extends React.Component {

    handleSubmit (event) {
        event.preventDefault();
        this.props.updateLocation('Sussex');
        this.props.gotoNext();
    }

    render () {
        return (
            <article>
                <h1>If a pint of milk had risen at the same rate as house prices, it would cost {formatCurrency(this.props.estimatedMilkPrice, '0,0.00')} today.</h1>
                <h2>What's happened to house prices in your area? Enter your postcode to find out.</h2>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" name="postcode" placeholder="Postcode"/>
                    <input type="submit" value="Compare"/>
                </form>
            </article>
        );
    }

}

const stateToProps = state => {
    return {
        estimatedMilkPrice: state.estimatedMilkPrice
    };
};

export default connect(stateToProps, dispatch => {
    return {
        updateLocation: (location) => {
            dispatch(updateLocation(location));
        }
    };
})(Milk);
