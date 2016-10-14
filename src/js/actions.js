export const actions = {
    GOTO_NEXT: 'GOTO_NEXT',
    GOTO_SLIDE: 'GOTO_SLIDE',
    UPDATE_EMAIL: 'UPDATE_EMAIL',
    UPDATE_TENURE: 'UPDATE_TENURE',
    UPDATE_LOCATION_DATA: 'UPDATE_LOCATION_DATA',
    UPDATE_YOB_DATA: 'UPDATE_YOB_DATA'
};

export const gotoNext = currentSlug => {
    return {type: actions.GOTO_NEXT, currentSlug};
};

export const gotoSlide = nextSlug => {
    return {type: actions.GOTO_SLIDE, nextSlug};
};

export const updateEmail = email => {
    return {type: actions.UPDATE_EMAIL, email};
};

export const updateTenure = value => {
    return {type: actions.UPDATE_TENURE, value};
};

export const updateLocationData = data => {
    return {type: actions.UPDATE_LOCATION_DATA, data};
};

export const updateYobData = data => {
    return {type: actions.UPDATE_YOB_DATA, data};
};
