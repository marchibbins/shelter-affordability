import { createStore } from 'redux';

import Start from './components/slides/Start';
import HousePrices from './components/slides/HousePrices';
import Milk from './components/slides/Milk';
import InYourArea from './components/slides/InYourArea';
import Tenure from './components/slides/Tenure';
import HomeStandard from './components/slides/HomeStandard';
import LivingHomeStandard from './components/slides/LivingHomeStandard';
import Future from './components/slides/Future';
import Share from './components/slides/Share';
import Questions from './components/slides/Questions';

const initialState = {
    slides: [
        Start,
        HousePrices,
        Milk,
        InYourArea,
        Tenure,
        HomeStandard,
        LivingHomeStandard,
        Future,
        Share,
        Questions
    ],
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
