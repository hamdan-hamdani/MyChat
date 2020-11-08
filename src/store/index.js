import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Router from '../router/index'
import moment from 'moment'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    emailForgotPassword: '',
    tokenForgotPassword: '',
    user: {},
    // user: localStorage.getItem('id') || null,
    token: localStorage.getItem('token') || null,
    register: [],
    message: '',
    personalChat: {},
    friends: [],
    textMessage: '',
    msg: [],
    userId: '',
    currentUser: [],
    NotifMsg: ''
  },
  mutations: {
    mutuserId (state, payload) {
      state.userId = payload
    },
    setUser (state, payload) {
      state.user = payload
      state.token = payload.token
    },
    setForgotPassword (state, payload) {
      state.emailForgotPassword = payload.email
      state.tokenForgotPassword = payload.token
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
    },
    mutMessage (state, payload) {
      state.msg = payload
    },
    mutCurrentUser (state, payload) {
      state.currentUser = payload
    },
    setNotifMsg (state, payload) {
      state.NotifMsg = payload
    }
  },
  actions: {
    actUpdateNotifMsg (setex, { noMsg, data }) {
      return new Promise((resolve, reject) => {
        axios.patch('https://api-mychat.fwdev.online/api/v1/users/notifmsg/' + data.id + '/' + data.idfriend + '/' + noMsg)
          .then(res => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    actNotifMsg (setex, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload.idfriend)
        console.log('id batur')
        axios.get('https://api-mychat.fwdev.online/api/v1/users/notifmsg/' + payload.idfriend, payload)
          .then(res => {
            console.log(res.data.result)
            console.log('ini actnotifmsg')
            if (res.data.result.length === 0) {
              axios.post('https://api-mychat.fwdev.online/api/v1/users/notifmsg', payload)
              // setex.commit('setNotifMsg', 0)
              resolve(0)
            } else {
              // setex.commit('setNotifMsg', res.data.result[0].noMsg)
              resolve(res.data.result[0].noMsg)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    login (setex, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios.post('https://api-mychat.fwdev.online/api/v1/users/login', payload)
          .then(res => {
            console.log('res')
            console.log(res.data.result)
            setex.commit('setUser', res.data.result)
            localStorage.setItem('token', res.data.result.token)
            localStorage.setItem('id', res.data.result.id)
            resolve(res.data.result)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    forgotPassword (setex, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios.post('https://api-mychat.fwdev.online/api/v1/users/forgotPassword', payload)
          .then(res => {
            console.log('res')
            console.log(res.data.result)
            setex.commit('setForgotPassword', res.data.result)
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
        axios.post('https://api-mychat.fwdev.online/api/v1/users/register', payload)
          .then(res => {
            // setex.commit('setRegister', res.data.result)
            resolve(res.data.result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    actGetMsg (setex, payload) {
      console.log('awal')
      console.log(payload)
      console.log('akhir')
      return new Promise((resolve, reject) => {
        axios.get('https://api-mychat.fwdev.online/api/v1/users/getmessage/' + payload.id + '/' + payload.idfriend)
          .then(async (reso) => {
            // alert('masukaj')
            // console.log('masukaj')
            // console.log(reso)
            console.log(reso.data.result)
            console.log('masukan')
            // const result = reso.data.result.map(item => {
            //   console.log(typeof (item.tgl))
            //   // item.tgl.split('T')
            // })
            // console.log(result)
            console.log(reso.data.result)
            console.log('akkh result')
            await setex.commit('mutMessage', reso.data.result)
            await resolve(reso.data.result)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    actGetMessage (setex, payload) {
      return new Promise((resolve, reject) => {
        axios.post('https://api-mychat.fwdev.online/api/v1/users/getmessage/', payload)
          .then(async (res) => {
            // axios.get('http://localhost:4000/api/v1/users/getmessage/' + payload.id + '/' + payload.idfriend)
            //   .then(reso => {
            //     setex.commit('mutMessage', reso.data.result)
            //   })
            //   .catch(err => {
            //     console.log(err)
            //   })
            console.log('actGetMessage')
            console.log(res)
            await resolve(payload)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    actgetUser (setex, payload) {
      return new Promise((resolve, reject) => {
        axios.get('https://api-mychat.fwdev.online/api/v1/users/userbyid/' + payload)
          .then(res => {
            setex.commit('mutCurrentUser', res.data.result)
          })
      })
    },
    updateUser (setex, payload) {
      return new Promise((resolve, reject) => {
        axios.patch('https://api-mychat.fwdev.online/api/v1/users/userbyid/' + payload.id, payload.data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    removeFriend (setex, { idUser, idFriend }) {
      return new Promise((resolve, reject) => {
        axios.delete('https://api-mychat.fwdev.online/api/v1/users/addfriend/' + idUser + '/' + idFriend)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getFriends (setex, payload) {
      return new Promise((resolve, reject) => {
        axios.get('https://api-mychat.fwdev.online/api/v1/users/getuser/' + payload.id)
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
            // const oldArr = []
            for (let i = 0; i < res.data.result.length; i++) {
              axios.get('https://api-mychat.fwdev.online/api/v1/users/getfriend/' + payload.id + '/' + res.data.result[i].idFriend)
                .then(resu => {
                  const data = resu.data.result[0]
                  // tmpArray.push(data)
                  // console.log('tmpArrat')
                  // console.log(tmpArray)
                  // console.log('tmpArray akhir')
                  console.log(data)
                  console.log('ya akhhir dara')
                  axios.get('https://api-mychat.fwdev.online/api/v1/users/getmessage/' + payload.id + '/' + res.data.result[i].idFriend)
                    .then(reso => {
                      // tmpArray = []
                      // console.log('notifmessage ba')
                      // console.log(oldArr.length)
                      // console.log(reso.data.result.length)
                      // if (oldArr.length < reso.data.result.length) {
                      // if (oldArr.length === 0) {
                      //   oldArr = reso.data.result
                      //   data.notifMessage = 0
                      //   console.log(data.notifMessage)
                      //   console.log('akhir notifMessage')
                      // } else {
                      //   data.notifMessage += reso.data.result.length - oldArr.length
                      //   oldArr = reso.data.result
                      // }
                      // }
                      const result = reso.data.result[reso.data.result.length - 1]
                      console.log(result)
                      console.log(reso.data.result)
                      console.log('akkh result 33')
                      if (reso.data.result.length !== 0) {
                        data.message = result.message
                        data.tgl = formatDate(result.tgl)
                      }
                      tmpArray.push(data)
                      function formatDate (date) {
                        return moment(date).format('LT')
                      }
                      // axios.patch('http://localhost:4000/api/v1/users/notifmsg/' + payload.id + '/' + payload.idfriend + '/' + payload.noMsg)
                      //   .then(res => {
                      //     // data.noMsg = payload.noMsg
                      // axios.get('http://localhost:4000/api/v1/users/notifmsg/' + payload.id + '/' + res.data.result[i].idFriend, payload)
                      //   .then(res => {
                      //     console.log(res.data.result)
                      //     data.noMsg = res.data.result[0].noMsg
                      //     tmpArray.push(data)
                      //     console.log('ini actnotifmsg')
                      //     // if (res.data.result.length === 0) {
                      //     //   axios.post('http://localhost:4000/api/v1/users/notifmsg', payload)
                      //     //   // setex.commit('setNotifMsg', 0)
                      //     //   resolve(0)
                      //     // } else {
                      //     //   // setex.commit('setNotifMsg', res.data.result[0].noMsg)
                      //     //   resolve(res.data.result[0].noMsg)
                      //     // }
                      //   })
                      //   .catch(err => {
                      //     reject(err)
                      //   })
                      //     resolve(payload)
                      //   })
                      //   .catch(err => {
                      //     reject(err)
                      //   })
                      // setex.commit('mutMessage', reso.data.result)
                      resolve(reso.data.result)
                    })
                  // .catch(err => {
                  //   console.log(err)
                  //   reject(err)
                  // })

                  // console.log(resu)
                  // tmpArray.push(resu.data.result[0])
                  // console.log(res)
                  // console.log('res addUser akhir')
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
        axios.get('https://api-mychat.fwdev.online/api/v1/users/user/' + payload.email)
          .then(resultUser => {
            // alert('res addUser')
            console.log('res addUser')
            console.log(resultUser.data.result)
            console.log(resultUser.data.result.id)
            console.log(resultUser)
            setex.commit('setAddUser', resultUser.data.result)
            resolve(resultUser.data.result)
            // axios.get('http://localhost:4000/api/v1/users/addfriend/' + payload.id)
            //   .then(res => {
            //     const resFilter = res.data.result.filter(item => {
            //       // return item.idUser === resultUser.data.result.id
            //       return item.idFriend === resultUser.data.result.id
            //     })
            //     console.log(resFilter)
            //     setex.commit('setAddFriends', resFilter)
            //     console.log('res addUser akhir')
            //     if (resFilter.length === 0) {
            //       const data = {
            //         idUser: payload.id,
            //         idFriend: resultUser.data.result.id
            //       }
            //       axios.post('http://localhost:4000/api/v1/users/addfriend/', data)
            //         .then(r => {
            //           resolve(resultUser.data.result)
            //         })
            //         .catch(err => {
            //           reject(err)
            //         })
            //     }
            //   })
            //   .catch(err => {
            //     console.log(err)
            //   })
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    cekUser (setex, { resultUser, id }) {
      return new Promise((resolve, reject) => {
        axios.get('https://api-mychat.fwdev.online/api/v1/users/addfriend/' + id)
          .then(res => {
            console.log(resultUser)
            console.log('cek Resultttsa')
            const resFilter = res.data.result.filter(item => {
              // return item.idUser === resultUser.data.result.id
              return item.idFriend === resultUser.id
            })
            console.log(resFilter)
            // setex.commit('setAddFriends', resFilter)
            console.log('res addUser akhir')
            if (resFilter.length === 0) {
              const data = {
                idUser: id,
                idFriend: resultUser.id
              }
              resolve(data)
            } else {
              const str = 'Anda sudah berteman'
              reject(str)
            }
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    insertFriend (setex, data) {
      console.log(data)
      console.log('insertfriens')
      return new Promise((resolve, reject) => {
        axios.post('https://api-mychat.fwdev.online/api/v1/users/addfriend/', data)
          .then(r => {
            resolve(r)
          })
          .catch(err => {
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
        console.log(payload, 'response bri')
        return response
      }, function (error) {
        console.log(payload)
        console.log('ini error response')
        console.log(error.response)
        // if (error.response.status === 401 && error.response.data.result.message === 'Email Not Found') {
        //   alert('Email salah ya bro')
        //   localStorage.removeItem('token')
        //   setex.commit('setToken', null)
        //   Router.push('/login')
        // } else
        if (error.response.status === 401 && error.response.data.result.message === 'token invalid') {
          alert('Jangang coba-coba masukan token')
          localStorage.removeItem('token')
          setex.commit('setToken', null)
          Router.push('/login')
        } else if (error.response.status === 401 && error.response.data.result.message === 'token expired') {
          alert('Token expired silahkan login')
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
    },
    getMsg (state) {
      return state.msg
    },
    getUserId (state) {
      return state.userId
    },
    getCurrentUser (state) {
      return state.currentUser
    },
    getUser (state) {
      state.user.id = localStorage.getItem('id')
      return state.user.id
    },
    getNotifMsg (state) {
      return state.NotifMsg
    }
  }
})
