import { createStore } from 'redux';

import SlideOne from './components/slides/One';
import SlideTwo from './components/slides/Two';

const initialState = {
    slides: [SlideOne, SlideTwo],
    current: 0
};

export default createStore((state = initialState, action) => {
    switch (action.type) {
        case ('next'):
            if (state.current < initialState.slides.length - 1) {
                return {...state, current: state.current + 1};
            } else {
                return state;
            }
        default:
            return state;
    }
});
