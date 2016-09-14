import React from 'react';
import { connect } from 'react-redux';

import 'whatwg-fetch';

import { updateYobData } from '../../actions';


class Start extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            yob: '',
            yobValid: false,
            pending: false
        };
    }

    handleChange (event) {
        let yob = parseInt(event.target.value, 10);
        this.setState({
            yob,
            yobValid: yob > 1900 && yob < 2000
        });
    }

    handleSubmit (event) {
        event.preventDefault();
        this.setPending(true);

        // TODO: POST yob, headers etc
        fetch('/data/age.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (yobData) {
                this.props.updateYobData({yob: this.state.yob, ...yobData});
                this.props.gotoNext();
            }.bind(this))
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
                <h1>How have house prices changed in your lifetime?</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>What year were you born?</label>
                    <input type="text" placeholder="Year of birth"
                        value={this.state.yob} onChange={this.handleChange.bind(this)}/>
                    <input type="submit" value="Compare" disabled={!this.state.yobValid}/>
                </form>
                {this.state.pending && 'Pending' /* TODO: Component */}
            </article>
        );
    }

}

export default connect(state => ({}), dispatch => {
    return {
        updateYobData: (yobData) => {
            dispatch(updateYobData(yobData));
        }
    };
})(Start);
