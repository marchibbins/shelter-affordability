import React from 'react';
import { connect } from 'react-redux';

import Pending from '../Pending';

import { updateLocationData } from '../../actions';
import { api, formatCurrency, pick } from '../../utils';

class Milk extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            postcode: '',
            postcodeValid: false,
            pending: false
        };
    }

    handleChange (event) {
        this.setState({
            postcode: event.target.value,
            postcodeValid: event.target.value.length > 1
        });
    }

    handleSubmit (event) {
        event.preventDefault();
        this.setPending(true);

        api.getJSON('/data/location.json')
            .then(data => {
                this.props.updateLocationData({...data, postcode: this.state.postcode});
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
                    <input type="text" placeholder="Postcode"
                        value={this.state.postcode} onChange={this.handleChange.bind(this)}/>
                    <input type="submit" value="Compare" disabled={!this.state.postcodeValid}/>
                </form>
                {this.state.pending && <Pending/>}
            </article>
        );
    }

}

Milk.slug = 'milk';

const stateToProps = state => pick(state, ['estimatedMilkPrice']);

export default connect(stateToProps, dispatch => {
    return {
        updateLocationData: data => {
            dispatch(updateLocationData(data));
        }
    };
})(Milk);
