import decode from 'jwt-decode';
import axios from 'axios'
import auth0 from 'auth0-js';
// import {HashRouter,Route} from 'react-router-dom'


var redirectUrl = '';
// TODO CHANGE TO ENV VARIABLES
if (window.location.href.includes("localhost")) {
    redirectUrl = 'http://localhost:3000'
  } else {
    redirectUrl = 'https://ipo-react.herokuapp.com/'
  }

export default class AuthService {

    auth0 = new auth0.WebAuth({
     domain: 'ipo.auth0.com',
     clientID: '819L7Ucik9a3CHqkMYgg-hRNb8Q7hQde',
     redirectUri: redirectUrl,
     responseType: 'token id_token',
     scope: 'openid email profile'
   });

    // Initializing important variables
    constructor(domain) {
        this.domain = domain || 'https://rails-api-ipo.herokuapp.com' // API server domain
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
        this.auth0Login = this.auth0Login.bind(this)
        this.auth0Logout = this.auth0Logout.bind(this)
        this.handleAuthentication = this.handleAuthentication
    }

    auth0Login() {
      console.log('loggin in')
     this.auth0.authorize();
   }

   handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        console.log(authResult)
      } else if (err) {
        window.location = "/auth0-login"
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('email', authResult.idTokenPayload.email);
    localStorage.setItem('name', authResult.idTokenPayload.name);
    localStorage.setItem('expires_at', expiresAt);
    console.log(authResult.idTokenPayload)
    // navigate to the home route
    window.location = "/"
  }

  auth0Logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
  }

  isAuth0Authenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

    login(email, password) {
        // Get a token from api server using the fetch api
        // return axios.post(' https://rails-api-ipo.herokuapp.com/api/v1/authenticate', {
        //   email,
        //   password
        // })
        // .then(res => {
        //     this.setToken(res.data.auth_token) // Setting the token in localStorage
        //     return Promise.resolve(res);
        // })
    }

    signup(email, password) {
        // Get a token from api server using the fetch api
        return axios.post('https://rails-api-ipo.herokuapp.com/api/v1/register', {
          email,
          password
        })
        .then(res => {
            this.setToken(res.data.auth_token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // Getting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
