const create = (subject) => {
    return fetch('http://localhost:5000/api/subjects', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subject)
    })
        .then((response) => {
            return response.json()
        }).catch((err) => console.log(err))
}

const list = () => {
    console.log("Bo in list subjects");
    return fetch('http://localhost:5000/api/subjects', {
        method: 'GET',
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}

const read = (params, credentials) => {
    return fetch('http://localhost:5000/api/subject/' + params.subjectId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }).then((response) => {
        return response.json()
    }).catch((err) => console.log(err))
}

const update = (params, credentials, subject) => {
    console.log("Bo inside update subject");
    console.log(params);
    console.log(credentials);
    return fetch('http://localhost:5000/api/subject/' + params.subjectId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(subject)
    }).then((response) => {
        return response.json()
    }).catch((err) => console.log(err))
}

const remove = (params, credentials) => {
    return fetch('http://localhost:5000/api/subject/' + params.subjectId, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }).then((response) => {
        return response.json()
    }).catch((err) => console.log(err))
}

export {
    create,
    list,
    read,
    update,
    remove
}
