const NEXT = 'NEXT';
const UPDATE_LOCATIONDATA = 'UPDATE_LOCATIONDATA';
const UPDATE_YOBDATA = 'UPDATE_YOBDATA';

export function gotoNext () {
    return { type: NEXT };
}

export function updateLocationData (locationData) {
    return { type: UPDATE_LOCATIONDATA, locationData };
}

export function updateYobData (yobData) {
    return { type: UPDATE_YOBDATA, yobData };
}

export const actions = {
    NEXT,
    UPDATE_LOCATIONDATA,
    UPDATE_YOBDATA
};
