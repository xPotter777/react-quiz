import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./ActionTypes";

export function auth (email, password, isLogin) {
    return async dispatch => {
     const authData = {
      email,password, returnSecureToken: true
     }
     let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBBrCnAG2ucbSTgGds_6lZOs7k0vHpBJMg'

     if(isLogin) {
         url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBBrCnAG2ucbSTgGds_6lZOs7k0vHpBJMg'
     }
     const response = await axios.post(url,authData)
        const data = response.data

        const expirationDate =  new Date(new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId',data.localId)
        localStorage.setItem('expDate',expirationDate)

        dispatch (authSuccess(data.idToken))
        dispatch (autoLogout(data.expiresIn))

    }
 }
 
 
export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        },time * 1000)
    }
}
export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expDate')
    return {
        type: AUTH_LOGOUT

    }
}