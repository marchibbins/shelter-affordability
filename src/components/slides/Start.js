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

    handleSubmit (formData) {
        this.setPending(true);
        api.getJSON('/data/age.json')
            .then(data => {
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
