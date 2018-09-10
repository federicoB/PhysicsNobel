import request from 'superagent';

//url prefix to append before all urls
export const urlPrefix = "";

/**
 * Log in into authentication backend
 * @param email: string
 * @param password: string
 */
export function logIn(email, password) {
    return request
        .post(urlPrefix + '/rest-auth/login/')
        .send({email: email, password: password})
}

/**
 * Sign up a new user
 * @param username: string
 * @param email: string
 * @param password1: string
 * @param password2: string
 */
export function signUp(username, email, password1, password2) {
    return request
        .post(urlPrefix + '/rest-auth/registration/')
        .send({username: username, email: email, password1: password1, password2: password2})
}

/**
 * Perform log to authentication backend
 * @returns {*}
 */
export function logOut() {
    return request
        .post(urlPrefix + '/rest-auth/logout/')
}

/**
 * Get logged in user info like username
 * @return {Promise}
 */
export function getLoggedUserInfo() {
    return request
        .get(urlPrefix + "/rest-auth/user/")
        .set('Authorization', "Token " + sessionStorage.getItem('token'))
}

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