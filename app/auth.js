import { AsyncStorage } from "react-native";
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:9000/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const USER_KEY = "auth-demo-key"
export const USER_INFO = "auth-user-info"

export const onSignIn = (email, password) => {
  return new Promise((resolve, reject) => {
    axios.post('/auth/signin', {
      login: email,
      password: password
    })
    .then(function (response) {
      if(response.data) {
        let token = response.data.token
        axios.defaults.headers.common['Token'] = token;
        console.log(token);
        AsyncStorage.setItem(USER_KEY, token);
        resolve(true)
      } else {
        resolve(false)
      }
    })
    .catch(function (error) {
      reject(error);
    });
  });
};

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(token => {
        if (token !== null) {
          resolve(token);
        } else {
          reject('No Token Found')
        }
      })
      .catch(err => reject(err));
  });
};

export const onSignUp = (name, last, age, gender, email, password) => {
  return new Promise((resolve, reject) => {
    let userData = {
      email: email,
      password: password,
      firstName: name,
      lastName: last,
      age: age,
      gender: gender,
      picUrl:'https://unsplash.it/400/600/?random'
    }
    axios.post('/auth/signup', userData)
    .then(function (response) {
      console.log(response.data);
      if(response.data) {
        let token = response.data.token
        axios.defaults.headers.common['Token'] = token;
        console.log(token);
        AsyncStorage.setItem(USER_KEY, token);
        resolve(true)
      } else {
        resolve(false)
      }
    })
    .catch(function (error) {
      reject(error);
    });
  });
};

export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    axios.get('/users/me')
    .then(function (response) {
      if(response.data) {
        console.log(response.data);
        resolve(response.data)
      } else {
        resolve({})
      }
    })
    .catch(function (error) {
      reject(error);
    });
  });
};

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    axios.get('/users')
    .then(function (response) {
      if(response.data) {
        console.log(response.data);
        resolve(response.data)
      } else {
        resolve([])
      }
    })
    .catch(function (error) {
      reject(error);
    });
  });
};
