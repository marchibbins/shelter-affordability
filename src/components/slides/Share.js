import React from 'react';
import { connect } from 'react-redux';

class Share extends React.Component {

    render () {
        return (
            <article>
                <h1>Thank you.</h1>
                <button onClick={this.props.gotoNext}>One last thing</button>
            </article>
        );
    }

}

Share.slug = 'share';

export default connect()(Share);
