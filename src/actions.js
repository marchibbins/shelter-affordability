const NEXT = 'NEXT';
const UPDATE_LOCATION = 'UPDATE_LOCATION';
const UPDATE_YOB = 'UPDATE_YOB';

export function gotoNext () {
    return { type: NEXT };
}

export function updateLocation (location) {
    return { type: UPDATE_LOCATION, location };
}

export function updateYob (yob) {
    return { type: UPDATE_YOB, yob };
}

export const actions = {
    NEXT,
    UPDATE_LOCATION,
    UPDATE_YOB
};
