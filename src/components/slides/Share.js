import React from 'react';
import { connect } from 'react-redux';

class Share extends React.Component {

    render () {
        return (
            <article>
                <h1>Thank you.</h1>
                <h2>With you support, we will send a strong, loud message to the Prime Minister and her government.</h2>
                <h2>To help us spread the word about our campaign, please can you share the below with your friends and followers?</h2>
                <a href="https://twitter.com/intent/tweet?text=" target="_blank">Share on Twitter</a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=" target="_blank">Share on Facebook</a>
                <button onClick={this.props.gotoNext}>One last thing</button>
            </article>
        );
    }

}

Share.slug = 'share';

export default connect()(Share);
