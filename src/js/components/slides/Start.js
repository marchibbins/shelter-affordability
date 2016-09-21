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
    }

    handleMissingYears (yob, data, missingYears = [1939, 1945]) {
        if (yob >= missingYears[0] && yob <= missingYears[1]) {
            data['yobAgeReplacement'] = (missingYears[1] + 1) - yob;
        } else {
            data['yobAgeReplacement'] = null;
        }
    }

    handleSubmit (formData) {
        this.setState({
            error: false,
            pending: true
        });
        api.getJSON(`${api.URL}/YoBData/${formData.yob}`)
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
            <article>
                <h1>How have house prices changed in your lifetime?</h1>
                <Yob onSubmit={this.handleSubmit.bind(this)}/>
                {this.state.pending && <Pending/>}
                {this.state.error && <ErrorMessage message={this.state.error.message}/>}
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
