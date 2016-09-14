import { createStore } from 'redux';

import Start from './components/slides/Start';
import HousePrices from './components/slides/HousePrices';
import Milk from './components/slides/Milk';
import InYourArea from './components/slides/InYourArea';
import Tenure from './components/slides/Tenure';
import HomeStandard from './components/slides/HomeStandard';
import Future from './components/slides/Future';
import Share from './components/slides/Share';
import Questions from './components/slides/Questions';

import { actions } from './actions';

const initialState = {
    slides: [
        Start,
        HousePrices,
        Milk,
        InYourArea,
        Tenure,
        HomeStandard,
        Future,
        Share,
        Questions
    ],
    current: 0,

    // Yob data
    yob: '',
    yobAverageHousePrice: '',
    todayAverageHousePrice: '',
    estimatedMilkPrice: '',

    // Location data
    location: '',
    locationRegion: '',
    locationIncrease: '',
    locationAverage: '',
    locationStruggling: '',

    // Graph data
    buildsLastYear: 170000,
    buildsYob: 220000
};

export default createStore((state = initialState, action) => {
    switch (action.type) {
        case (actions.NEXT):
            if (state.current < initialState.slides.length - 1) {
                return {...state, current: state.current + 1};
            } else {
                return state;
            }
        case (actions.UPDATE_YOBDATA):
            return {...state, ...action.yobData};
        case (actions.UPDATE_LOCATIONDATA):
            return {...state, ...action.locationData};
        default:
            return state;
    }
});
