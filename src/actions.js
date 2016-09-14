const NEXT = 'NEXT';
const UPDATE_LOCATION = 'UPDATE_LOCATION';
const UPDATE_YOBDATA = 'UPDATE_YOBDATA';

export function gotoNext () {
    return { type: NEXT };
}

export function updateLocation (location) {
    return { type: UPDATE_LOCATION, location };
}

export function updateYobData (yobData) {
    return { type: UPDATE_YOBDATA, yobData };
}

export const actions = {
    NEXT,
    UPDATE_LOCATION,
    UPDATE_YOBDATA
};
