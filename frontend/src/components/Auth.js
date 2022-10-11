const BASE_URL = 'https://api.project-mesto.nomoredomains.icu';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password}),
    credentials: 'include'
    },)
    .then((response) => {
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
        return res;
    })
    .catch((err) => console.log(err));
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password}),
      credentials: 'include'
    })
    .then((response) => {
        try {
            if (response.status === 200){
                return response.json();
            }
        } 
        catch(e) {
            return (e)
        }
    })
    .then((data) => {
        return data;
    })
    .catch(err => console.log(err))
  }; 

  export const logout = () => {
    return fetch(`${BASE_URL}/signout`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .catch(err => console.log(err))
  }; 

  export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    .then(response => {
        
      try {
        if (response.status === 200){
          return response.json();
        }
      } 
      catch(e) {
        return (e)
      }
    })
    .then(data => {
      return data})
  } 