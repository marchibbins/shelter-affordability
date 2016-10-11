import { createStore } from 'redux';
import { browserHistory } from 'react-router';

import Start from './components/slides/Start';
import HousePrices from './components/slides/HousePrices';
import Milk from './components/slides/Milk';
import InYourArea from './components/slides/InYourArea';
import Tenure from './components/slides/Tenure';
import HomeStandard from './components/slides/HomeStandard';
import Future from './components/slides/Future';
import Share from './components/slides/Share';

import { actions } from './actions';
import { URLS } from './config';

const slides = [
    Start,
    HousePrices,
    Milk,
    InYourArea,
    Tenure,
    HomeStandard,
    Future,
    Share
];

export const slugs = (() => slides.map(slide => slide.slug))();

const initialState = {
    slides: slides,

    // Yob data
    yob: '',
    yobAgeReplacement: '',
    yobAverageHousePrice: {
        house_price: '',
        inflation: '',
        multiple: ''
    },
    todayAverageHousePrice: '',
    estimatedMilkPrice: '',

    // Location data
    postcode: '',
    location: '',
    locationRegion: '',
    locationLivingParents: '',
    locationRentAverage: '',
    locationSocialHomes: '',
    locationTempHouseholds: '',
    locationStruggling: 'XXX',

    // Inflation data
    locationInflation: '',

    // Tenure
    tenure: ''
};

export default createStore((state = initialState, action) => {
    switch (action.type) {
        case (actions.GOTO_NEXT): {
            let defaultSlug = action.currentSlug || slides[0].slug;
            browserHistory.push(URLS.baseUrl + '/' + slugs[slugs.indexOf(defaultSlug) + 1]);
            return state;
        }
        case (actions.GOTO_SLIDE):
            browserHistory.push(URLS.baseUrl + '/' + action.nextSlug);
            return state;
        case (actions.UPDATE_TENURE):
            return {...state, tenure: action.value};
        case (actions.UPDATE_YOB_DATA):
        case (actions.UPDATE_LOCATION_DATA):
            return {...state, ...action.data};
        default:
            return state;
    }
});
