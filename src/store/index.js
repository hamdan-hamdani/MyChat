import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Router from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: localStorage.getItem('token') || null,
    register: [],
    message: '',
    personalChat: {},
    friends: [],
    textMessage: ''
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      state.token = payload.token
    },
    setToken (state, payload) {
      state.token = payload
    },
    setMessage (state, payload) {
      state.message = payload
    },
    setAddUser (state, payload) {
      console.log(payload)
      console.log('res setaddUser akhir')
      state.personalChat = payload
    },
    setAddFriends (state, payload) {
      state.friends = payload
    },
    setTextMessage (state, payload) {
      state.textMessage = payload
    }
  },
  actions: {
    login (setex, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:4000/api/v1/users/login', payload)
          .then(res => {
            console.log('res')
            console.log(res)
            setex.commit('setUser', res.data.result)
            localStorage.setItem('token', res.data.result.token)
            resolve(res.data.result)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    register (_setex, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:4000/api/v1/users/register', payload)
          .then(res => {
            // setex.commit('setRegister', res.data.result)
            resolve(res.data.result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getFriends (setex, payload) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:4000/api/v1/users/getuser/' + payload.id)
          .then(res => {
            // const resFilter = res.data.result.filter(item => {
            //   console.log(item)
            //   if (item.idUser === payload.id) {
            //     alert(payload.id)
            //   } else if (item.idFriend === payload.id) {
            //     alert('mas')
            //   }
            //   // else {
            //   //   alert('istirahat')
            //   // }
            // })
            console.log(res)
            console.log('bratbe')
            const tmpArray = []
            for (let i = 0; i < res.data.result.length; i++) {
              axios.get('http://localhost:4000/api/v1/users/getfriend/' + payload.id + '/' + res.data.result[i].idFriend)
                .then(resu => {
                  console.log(resu)
                  tmpArray.push(resu.data.result[0])
                  // console.log(res)
                  console.log('res addUser akhir')
                  resolve(resu.data.result)
                })
            }
            setex.commit('setAddFriends', tmpArray)
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    addUser (setex, payload) {
      console.log(payload)
      console.log('akkh')
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:4000/api/v1/users/user/' + payload.email)
          .then(resultUser => {
            alert('res addUser')
            console.log('res addUser')
            console.log(resultUser.data.result)
            console.log(resultUser.data.result.id)
            console.log(resultUser)
            setex.commit('setAddUser', resultUser.data.result)
            axios.get('http://localhost:4000/api/v1/users/addfriend/' + payload.id)
              .then(res => {
                const resFilter = res.data.result.filter(item => {
                  // return item.idUser === resultUser.data.result.id
                  return item.idFriend === resultUser.data.result.id
                })
                console.log(resFilter)
                setex.commit('setAddFriends', resFilter)
                console.log('res addUser akhir')
                if (resFilter.length === 0) {
                  const data = {
                    idUser: payload.id,
                    idFriend: resultUser.data.result.id
                  }
                  axios.post('http://localhost:4000/api/v1/users/addfriend/', data)
                  resolve(resultUser.data.result)
                }
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    interceptorsRequest (setex, payload) {
      axios.interceptors.request.use(function (config) {
      // Do something before request is sent
        console.log(payload)
        config.headers.Authorization = `Bearer ${setex.state.token}`
        return config
      }, function (error) {
        console.log(payload)
        console.log('ini error request')
        console.log(error)
        // Do something with request error
        return Promise.reject(error)
      })
    },

    // Add a response interceptor
    interceptorsResponse (setex, payload) {
      axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
        console.log(response)
        console.log(payload, 'response')
        return response
      }, function (error) {
        console.log(payload)
        console.log('ini error response')
        console.log(error.response)
        if (error.response.status === 401 && error.response.data.result.message === 'token invalid') {
          // alert('Jangang coba-coba masukan token')
          localStorage.removeItem('token')
          setex.commit('setToken', null)
          Router.push('/login')
        } else if (error.response.status === 401 && error.response.data.result.message === 'token expired') {
          // alert('Token expired silahkan login')
          localStorage.removeItem('token')
          setex.commit('setToken', null)
          Router.push('/login')
        } else if (error.response.status === 401 && error.response.data.result.message === 'data sudah ada') {
          // alert('Email sudah digunakan')
          setex.commit('setMessage', error.response.data.result.message)
          // localStorage.removeItem('token')
          // setex.commit('setToken', null)
          // Router.push('/login')
        } else if (error.response.status === 401 && error.response.data.result.message === 'Email Or Password Wrong') {
          alert('Email Or Password Wrong')
          setex.commit('setMessage', error.response.data.result.message)
          localStorage.removeItem('token')
          // setex.commit('setToken', null)
          // Router.push('/login')
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
      })
    }
  },
  getters: {
    getMessage (state) {
      return state.message
    },
    isLogin (state) {
      return state.token !== null
    },
    getPersonalChat (state) {
      return state.personalChat
    },
    getAddFriends (state) {
      return state.friends
    },
    getTextMessage (state) {
      return state.textMessage
    }
  }
})
