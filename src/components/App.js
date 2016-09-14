import React from 'react';
import { connect } from 'react-redux';

import SlideContainer from './SlideContainer';

class App extends React.Component {

    render () {
        let Slide = React.createFactory(this.props.slides[this.props.current])();
        return (
            <main>
                <h1>Affordability</h1>
                <SlideContainer>
                    {Slide}
                </SlideContainer>
            </main>
        );
    }

}

export default connect(state => state)(App);