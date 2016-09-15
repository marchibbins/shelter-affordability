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
        {slide: Start, slug: 'start'},
        {slide: HousePrices, slug: 'house-prices'},
        {slide: Milk, slug: 'milk'},
        {slide: InYourArea, slug: 'in-your-area'},
        {slide: Tenure, slug: 'tenure'},
        {slide: HomeStandard, slug: 'home-standard'},
        {slide: Future, slug: 'future'},
        {slide: Share, slug: 'share'},
        {slide: Questions, slug: 'questions'}
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
    locationRentIncrease: '',
    locationSocialHomes: '',
    locationTempHouseholds: '',
    locationAverage: '',
    locationStruggling: '',

    // Tenure
    tenure: '',

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
        case (actions.UPDATE_TENURE):
            return {...state, tenure: action.value};
        case (actions.UPDATE_YOB_DATA):
        case (actions.UPDATE_LOCATION_DATA):
            return {...state, ...action.data};
        default:
            return state;
    }
});
