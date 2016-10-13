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
        api.getJSON(`/HouseData/${formData.postcode}`)
            .then(houseData => {
                this.props.updateLocationData({postcode: formData.postcode, ...houseData});
                api.getJSON(`/HouseInflation/${formData.postcode}`)
                    .then(inflationData => {
                        this.props.updateLocationData({locationInflation: inflationData.inflation});
                        api.getJSON(`/Struggling/${formData.postcode}`)
                            .then(strugglingData => {
                                this.props.updateLocationData({locationStruggling: strugglingData.struggling});
                                this.props.gotoNext();
                            })
                            .catch(error => {
                                this.setState({
                                    error: error,
                                    pending: false
                                });
                            });
                    })
                    .catch(error => {
                        this.setState({
                            error: error,
                            pending: false
                        });
                    });
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
            <article className="slide">
                <h3 className="slide__title">
                    If a pint of milk had risen in line with house prices, it would
                    cost {formatCurrency(this.props.estimatedMilkPrice, '0,0.00')} today.</h3>
                <h3 className="slide__title">What about house prices in your area?</h3>
                <Postcode onSubmit={this.handleSubmit.bind(this)}/>
                {this.state.pending && <Pending/>}
                {this.state.error && <ErrorMessage error={this.state.error}/>}
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
