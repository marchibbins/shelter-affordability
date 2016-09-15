import numeral from 'numeral';

import 'whatwg-fetch';

export function api (url) {
    return fetch(url)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        });
}

export function formatCurrency (value, format) {
    return '£' + numeral(value).format(format);
}

export const tenures = {
    HOMEOWNER: 'Homeowner',
    RENTER: 'Renter',
    SOCIAL_RENTER: 'Social renter',
    PARENTS: 'Living with parents',
    TEMPORARY: 'Living in temporary accommodation'
};
