import React from 'react';

import { tenures } from '../../utils';

export default class Petition extends React.Component {

    handleSubmit (event) {
        event.preventDefault();
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div>
                    <label>Tenure</label>
                    {Object.keys(tenures).map(key => {
                        return (
                            <span key={key}>
                                <input key={key} type="radio"/>{tenures[key]}
                            </span>
                        );
                    })}
                    <input type="radio"/>Other
                </div>
                <div>
                    <label>Which generations live in your home? (Tick all that apply)</label>
                    <label>
                        <input type="checkbox"/>Children
                    </label>
                    <label>
                        <input type="checkbox"/>Parents
                    </label>
                    <label>
                        <input type="checkbox"/>Grandparents
                    </label>
                </div>
                <div>
                    <label>How many people live in your home?</label>
                    {[...Array(6).keys()].map(i => {
                        return (
                            <span key={i}>
                                <input type="radio"/>{i}
                            </span>
                        );
                    })}
                </div>
                <div>
                    <label>Number of bedrooms</label>
                    {[...Array(4).keys()].map(i => {
                        return (
                            <span key={i}>
                                <input type="radio"/>{i}
                            </span>
                        );
                    })}
                </div>
                <div>
                    <label>Your occupaion</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Gender</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Your mobile number</label>
                    <input type="email"/>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        );
    }

}
