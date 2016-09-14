import React from 'react';
import { connect } from 'react-redux';

import Pending from '../Pending';

import { updateLocationData } from '../../actions';
import { api, formatCurrency } from '../../utils';

class Milk extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            pending: false
        };
    }

    handleSubmit (event) {
        event.preventDefault();
        this.setPending(true);

        api('/data/location.json')
            .then(data => {
                this.props.updateLocationData(data);
                this.props.gotoNext();
            })
            .catch(error => {
                // TODO: UI
                /* eslint-disable no-console */
                console.error(error);
                /* eslint-enable no-console */
                this.setPending(false);
            });
    }

    setPending (value) {
        this.setState({
            pending: value
        });
    }

    componentWillUnmount () {
        this.setPending(false);
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
                {this.state.pending && <Pending/>}
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
        updateLocationData: data => {
            dispatch(updateLocationData(data));
        }
    };
})(Milk);