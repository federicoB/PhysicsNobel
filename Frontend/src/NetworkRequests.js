import request from 'superagent';

export function logIn(email, password) {
    return request
        .post('/rest-auth/login/')
        .send({email: email, password: password})
}

export function signUp(username, email, password1, password2) {
    return request
        .post('/rest-auth/registration/')
        .send({username: username, email: email, password1: password1, password2: password2})
}

export function logOut() {
    return request
        .post('/rest-auth/logout/')
}

export function getLoggedUserInfo() {
    return request
        .get("rest-auth/user/")
        .set('Authorization', "Token " + sessionStorage.getItem('token'))
}

export function getLaureates() {
    return request
        .get('/api/laureates/')
        .set('Accept', 'application/json')
        .then((response) => response.body)
}

export function getLaureateInfo(name) {
    return request
        .get('/api/laureates/' + name + "/")
        .set('Accept', 'application/json')
        .then((response) => response.body)
}

export function getPrizeInfo(prizeURl) {
    return request
        .get(prizeURl)
        .set('Accept', 'application/json')
        .then((response) => response.body)
}