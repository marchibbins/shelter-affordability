const NEXT = 'NEXT';
const UPDATE_YOB = 'UPDATE_YOB';

export function gotoNext () {
    return { type: NEXT };
}

export function updateYob (yob) {
    return { type: UPDATE_YOB, yob };
}

export const actions = {
    NEXT,
    UPDATE_YOB
};
