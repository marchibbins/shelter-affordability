import React from 'react';
import { connect } from 'react-redux';

import Pending from '../Pending';
import Yob from '../forms/Yob';

import { updateYobData } from '../../actions';
import { api } from '../../utils';

class Start extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
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
        this.setPending(true);
        api.getJSON('/data/age.json')
            .then(data => {
                this.handleMissingYears(formData.yob, data);
                this.props.updateYobData({yob: formData.yob, ...data});
                this.props.gotoNext();
            })
            .catch(error => {
                /* eslint-disable no-console */
                // TODO: UI
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
                <h1>How have house prices changed in your lifetime?</h1>
                <Yob onSubmit={this.handleSubmit.bind(this)}/>
                {this.state.pending && <Pending/>}
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
