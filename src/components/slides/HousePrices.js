import React from 'react';
import { connect } from 'react-redux';

class HousePrices extends React.Component {

    render () {
        console.log(this.props);
        return (
            <article>
                <h2>In {this.props.yob}, the average cost of a three-bedroom house in the UK was £{this.props.yobAverageHousePrice}.</h2>
                <h3>Today it's a whopping £{this.props.todayAverageHousePrice}.</h3>
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
