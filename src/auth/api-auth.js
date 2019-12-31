console.log("I am in api-auth");
const login = (user) => {
    console.log("I am inside login");
    console.log(user);
    return fetch('http://localhost:5000/auth/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        credentials: "omit",
        
      body: JSON.stringify(user)
    })
    .then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
}

const signout = () => {
    return fetch('http://localhost:5000/auth/signout', {
    method: 'GET',
  }).then(response => {
      return response.json()
  }).catch((err) => console.log(err))
}

export {
  login,
  signout
}
