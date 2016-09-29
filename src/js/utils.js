import numeral from 'numeral';

import 'whatwg-fetch';

import { URLS } from './config';

export const api = {
    getJSON: path => {
        return fetch(URLS.api + path)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        });
    },

    postJSON: (path, body) => {
        return fetch(URLS.api + path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });
    }
};

export const formatCurrency = (value, format) => {
    return '£' + numeral(value).format(format);
};

export const formatNumber = value => {
    return numeral(value).format('0,0');
};

export const pick = (obj, props) => {
    return Object.assign({}, ...props.map(prop => {
        return {[prop]: obj[prop]};
    }));
};

export const tenures = {
    HOMEOWNER: 'Homeowner',
    RENTER: 'Renter',
    SOCIAL_RENTER: 'Social renter',
    PARENTS: 'Living with parents',
    TEMPORARY: 'Living in temporary accommodation'
};
