export const actions = {
    GOTO_NEXT: 'GOTO_NEXT',
    GOTO_SLIDE: 'GOTO_SLIDE',
    UPDATE_TENURE: 'UPDATE_TENURE',
    UPDATE_LOCATION_DATA: 'UPDATE_LOCATION_DATA',
    UPDATE_YOB_DATA: 'UPDATE_YOB_DATA'
};

export const gotoNext = () =>{
    return {type: actions.GOTO_NEXT};
}

export const gotoSlide = slug => {
    return {type: actions.GOTO_SLIDE, slug};
}

export const updateTenure = value => {
    return {type: actions.UPDATE_TENURE, value};
}

export const updateLocationData = data => {
    return {type: actions.UPDATE_LOCATION_DATA, data};
}

export const updateYobData = data => {
    return {type: actions.UPDATE_YOB_DATA, data};
}
