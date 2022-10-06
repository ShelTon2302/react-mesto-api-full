const BASE_URL = 'https://api.project-mesto.nomoredomains.icu';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password}),
    credentials: "include"
    },)
    .then((response) => {
        console.log("response", response)
        try {
            if (response.status === 201){
                return response.json();
            }
        } 
        catch(e) {
            return (e)
        }
    })
    .then((res) => {
        console.log("res", res);
        return res;
    })
    .catch((err) => console.log(err));
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password}),
      credentials: "include"
    })
    .then((response) => {
      console.log("response", response)
      response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.token){
        localStorage.setItem('token', data.token);
        return data;
      }
    })
    .catch(err => console.log(err))
  }; 

  export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
      return data})
  } 