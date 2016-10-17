import React from 'react';
import { connect } from 'react-redux';

import ErrorMessage from '../ErrorMessage';
import Pending from '../Pending';
import Yob from '../forms/Yob';

import { updateYobData } from '../../actions';
import { api } from '../../utils';

class Start extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            error: false,
            pending: false
        };
        this.earliestYear = 1947;
    }

    handleMissingYears (yob, data) {
        if (yob < this.earliestYear) {
            data['yobAgeReplacement'] = this.earliestYear - yob;
        } else {
            data['yobAgeReplacement'] = null;
        }
    }

    handleSubmit (formData) {
        this.setState({
            error: false,
            pending: true
        });
        api.getJSON(`/api/YoBData/${Math.max(formData.yob, this.earliestYear)}`)
            .then(data => {
                this.handleMissingYears(formData.yob, data);
                this.props.updateYobData({yob: formData.yob, ...data});
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
            <article className="slide">
                <h3 className="slide__title">Just how expensive have house
                    prices become in your lifetime?</h3>
                <Yob onSubmit={this.handleSubmit.bind(this)}/>
                {this.state.pending && <Pending/>}
                {this.state.error && <ErrorMessage error={this.state.error}/>}
            </article>
        );
    }

}

Start.slug = 'start';

export default connect(null, dispatch => {
    return {
        updateYobData: data => {
            dispatch(updateYobData(data));
        }
    };
})(Start);
