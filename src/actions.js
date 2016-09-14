const NEXT = 'NEXT';
const UPDATE_LOCATION_DATA = 'UPDATE_LOCATION_DATA';
const UPDATE_YOB_DATA = 'UPDATE_YOB_DATA';

export function gotoNext () {
    return {type: NEXT};
}

export function updateLocationData (data) {
    return {type: UPDATE_LOCATION_DATA, data};
}

export function updateYobData (data) {
    return {type: UPDATE_YOB_DATA, data};
}

export const actions = {
    NEXT,
    UPDATE_LOCATION_DATA,
    UPDATE_YOB_DATA
};
