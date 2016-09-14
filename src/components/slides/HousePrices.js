import React from 'react';
import { connect } from 'react-redux';

import { formatCurrency } from '../../utils';

class HousePrices extends React.Component {

    render () {
        return (
            <article>
                <h2>In {this.props.yob}, the average cost of a three-bedroom house in the UK was {formatCurrency(this.props.yobAverageHousePrice, '0,0')}.</h2>
                <h3>Today it's a whopping {formatCurrency(this.props.todayAverageHousePrice, '0,0')}.</h3>
                <button onClick={this.props.gotoNext}>What's the got to do with the price of milk?</button>
            </article>
        );
    }

}

const stateToProps = state => {
    return {
        yob: state.yob,
        yobAverageHousePrice: state.yobAverageHousePrice,
        todayAverageHousePrice: state.todayAverageHousePrice
    };
};

export default connect(stateToProps)(HousePrices);
