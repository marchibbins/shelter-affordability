import React from 'react';
import { connect } from 'react-redux';

import { formatCurrency, tenures } from '../../utils';

class Tenure extends React.Component {

    getStatement () {
        switch (this.props.tenure) {
            case tenures.RENTER:
                return (
                    <h1>Renting is getting more expensive — the average rent for a two-bed in your area is {formatCurrency(this.props.locationAverage, '0,0')} per month</h1>
                );
            default:
                return (
                    <h1>{this.props.tenure} statement</h1>
                );
        }
    }

    render () {
        return (
            <article>
                {this.getStatement()}
                <button onClick={this.props.gotoNext}>Just how many people are struggling?</button>
            </article>
        );
    }

}

Tenure.slug = 'tenure';

const stateToProps = state => {
    return {
        locationAverage: state.locationAverage,
        tenure: state.tenure
    };
};

export default connect(stateToProps)(Tenure);
