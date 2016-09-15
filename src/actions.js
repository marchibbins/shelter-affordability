const NEXT = 'NEXT';
const UPDATE_TENURE = 'UPDATE_TENURE';
const UPDATE_LOCATION_DATA = 'UPDATE_LOCATION_DATA';
const UPDATE_YOB_DATA = 'UPDATE_YOB_DATA';

export function gotoNext () {
    return {type: NEXT};
}

export function updateTenure (value) {
    return {type: UPDATE_TENURE, value};
}

export function updateLocationData (data) {
    return {type: UPDATE_LOCATION_DATA, data};
}

export function updateYobData (data) {
    return {type: UPDATE_YOB_DATA, data};
}

export const actions = {
    NEXT,
    UPDATE_TENURE,
    UPDATE_LOCATION_DATA,
    UPDATE_YOB_DATA
};
