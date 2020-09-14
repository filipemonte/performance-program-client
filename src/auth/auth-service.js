
import { myConfig } from '../config';

class AuthService {
  async login(username, password) {

    var headers = {
      "Content-Type": "application/json",
      "Access-Control-Origin": "*"
    }

    var postData = {
      "user": username,
      "pwd": password
    }

    let response = "";

    try{
      response = await fetch(`${myConfig.apiUrl}/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(postData)
      });
      if (!response.ok)
      {
        throw Error(response.message)
      }
    }
    catch (error)
    {
      console.log(error)
    }
    

    const json = await response.json();
    if (json.accessToken) {
      localStorage.setItem("user", JSON.stringify(json));
      window.location.href = '/';
    }
    else
    {
      return json.message;
    }
    
  }

  loginOAuth(user) {
    var headers = {
      "Content-Type": "application/json",
      "Access-Control-Origin": "*"
    }

    fetch(`${myConfig.apiUrl}/loginoauth`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(function (data) {
        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(data));
          window.location.href = '/';
        }
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  // register(username, email, password) {
  //   return axios.post(API_URL + "signup", {
  //     username,
  //     email,
  //     password
  //   });
  // }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  isAuthenticated() {
    return localStorage.getItem('user') != null;
  }

  ehCoach() {
    return JSON.parse(localStorage.getItem('user')).ehcoach;
  }
}

export default new AuthService();