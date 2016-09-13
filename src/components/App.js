import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {

    render () {
        let Slide = React.createFactory(this.props.slides[this.props.current])();
        return (
            <main>
                <h1>Affordability {this.props.foo}</h1>
                {Slide}
                <div onClick={this.props.onClick}>Next</div>
            </main>
        );
    }

}

export default connect(state => state, dispatch => {
    return {
        onClick: () => {
            dispatch({type: 'next'});
        }
    };
})(App);
