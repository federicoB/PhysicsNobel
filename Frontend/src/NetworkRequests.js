import request from 'superagent';

//url prefix to append before all urls
export const urlPrefix = "";

/**
 * Returns all laureates with name, pictures and prizes won
 * @returns {Array}
 */
export function getLaureates() {
    return request
        .get(urlPrefix + '/api/laureates/')
        .set('Accept', 'application/json')
        .then((response) => response.body)
}

/**
 * Get laureate detailed info like biography and works
 * @param name: string
 * @returns {Object}
 */
export function getLaureateInfo(name) {
    return request
        .get(urlPrefix + '/api/laureates/' + name + "/")
        .set('Accept', 'application/json')
        .then((response) => response.body)
}

/**
 * Given the year of the prize return the laureates of that year
 * @param prizeURl the URI that identify a prize, using its year
 * @returns Promise
 */
export function getPrizeInfo(prizeURl) {
    return request
        .get(urlPrefix + prizeURl)
        .set('Accept', 'application/json')
        .then((response) => response.body)
}
