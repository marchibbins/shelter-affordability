import React from 'react';
import { connect } from 'react-redux';

import ErrorMessage from '../ErrorMessage';
import Pending from '../Pending';
import Postcode from '../forms/Postcode';

import { updateLocationData } from '../../actions';
import { api, formatCurrency, pick } from '../../utils';

class Milk extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            pending: false
        };
    }

    handleSubmit (formData) {
        this.setState({
            error: false,
            pending: true
        });
        api.getJSON('/data/location.json')
            .then(data => {
                this.props.updateLocationData({postcode: formData.postcode, ...data});
                this.props.gotoNext();
            })
            .catch(error => {
                this.setState({
                    error: error,
                    pending: false
                });
            });
    }

    componentWillUnmount () {
        this.setState({
            pending: false
        });
    }

    render () {
        return (
            <article>
                <h1>If a pint of milk had risen at the same rate as house prices, it would cost {formatCurrency(this.props.estimatedMilkPrice, '0,0.00')} today.</h1>
                <Postcode onSubmit={this.handleSubmit.bind(this)}/>
                {this.state.pending && <Pending/>}
                {this.state.error && <ErrorMessage message={this.state.error.message}/>}
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
