import React from 'react';
import { connect } from 'react-redux';

import SlideContainer from './SlideContainer';

class App extends React.Component {

    getSlide () {
        return React.createFactory(
            this.props.slides[this.props.current].slide
        )();
    }

    render () {
        return (
            <main>
                <h1>Affordability</h1>
                <SlideContainer>
                    {this.getSlide()}
                </SlideContainer>
            </main>
        );
    }

}

export default connect(state => state)(App);
