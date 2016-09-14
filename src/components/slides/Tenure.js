import React from 'react';
import { connect } from 'react-redux';

import { formatCurrency } from '../../utils';

class Tenure extends React.Component {

    render () {
        return (
            <article>
                <h1>Renting is getting more expensive — the average rent for a two-bed in your area is {formatCurrency(this.props.locationAverage, '0,0')} per month</h1>
                <button onClick={this.props.gotoNext}>Just how many people are struggling?</button>
            </article>
        );
    }

}

const stateToProps = state => {
    return {
        locationAverage: state.locationAverage
    };
};

export default connect(stateToProps)(Tenure);