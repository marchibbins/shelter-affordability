import numeral from 'numeral';

export function formatCurrency (value, format) {
    return '£' + numeral(value).format(format);
}
