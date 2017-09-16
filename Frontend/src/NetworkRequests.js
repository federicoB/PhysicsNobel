import request from 'superagent';

export function login(email, password) {
    return request
        .post('/rest-auth/login/')
        .data({email: email, password: password})
        .then((response) => response.body.key)
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