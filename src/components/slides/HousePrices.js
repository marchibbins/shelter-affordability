import React from 'react';
import { connect } from 'react-redux';

class HousePrices extends React.Component {

    render () {
        return (
            <article>
                <h2>In {this.props.yob}, the average cost of a three-bedroom house in the UK was £[24,000].</h2>
                <h3>Today it's a whopping £[280,000].</h3>
            </article>
        );
    }

}

const stateToProps = state => {
    return { yob: state.yob };
};

export default connect(stateToProps)(HousePrices);
