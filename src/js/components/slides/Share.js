import React from 'react';
import { connect } from 'react-redux';

class Share extends React.Component {

    handleClick () {
        this.props.gotoNext();
    }

    render () {
        return (
            <article>
                <h1>Thank you.</h1>
                <h2>With you support, we will send a strong, loud message to the Prime Minister and her government.</h2>
                <h2>To help us spread the word about our campaign, please can you share the below with your friends and followers?</h2>
                <ul className="unbulleted">
                    <li>
                        <a href="https://twitter.com/intent/tweet?text="
                            onClick={this.handleClick.bind(this)} target="_blank">
                            Share on Twitter
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/sharer/sharer.php?u="
                            onClick={this.handleClick.bind(this)} target="_blank">
                            Share on Facebook
                        </a>
                    </li>
                </ul>
            </article>
        );
    }

}

Share.slug = 'share';

export default connect()(Share);
