<template>
  <div class="container-login">
    <form class="form">
      <h5>Login</h5>
      <p>Hi, Welcome back!</p>
      <div class="form-group">
        <label for="exampleInputEmail1">Email </label>
        <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <small><router-link to="/forgotpassword">Forgot Password?</router-link></small><br>
      <button type="submit" @click="handleLogin" class="btn btn-primary">Login</button>
      <hr>
      <small class="Lw">Login With</small>
      <button type="submit" @click="handleLoginGoogle" class="btn btn-primary btn-google">Google</button>
      <small class="signUp">Don’t have an account? <router-link to="/register">Sign Up </router-link></small>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    ...mapActions(['login']),
    handleLoginGoogle () {

    },
    handleLogin (e) {
      e.preventDefault()
      alert('Login')
      const data = {
        email: this.email,
        password: this.password
      }
      this.login(data)
        .then((res) => {
          alert('berhasil login')
          console.log(res.id)
          this.$router.push({
            // path: '/chating'
            name: 'ChatTing',
            params: {
              userId: res.id,
              username: this.email
              // room: this.room
            }
          })
        })
        .catch(err => {
          alert('coba err')
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.container-login {
  background-color:  #E5E5E5;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: #232323;
  overflow: auto;
}
.form {
  width: 25%;
    padding: 40px;
    margin: 20px auto;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 10px;
}
.form h5 {
  color: #7E98DF;
  text-align: center;
}
.form p {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.form input {
  border: none;
  border-bottom: 1px solid #232323;
  border-radius: 0;
  margin: 0 !important;
}
.form label {
  color: #848484;
  opacity: 0.75;
  margin: 0 !important;
}
.form small {
  color: #7E98DF;
  text-align: right !important;
  display: inline-block;
  width: 100%;
}
.form button {
  background: #7E98DF;
  border-radius: 70px;
  width: 100%;
  margin-top: 10px;
  border: none;
}
.form hr {
  border: 1px solid #848484;
  margin-top: 50px;
}
.form small.Lw {
  background-color: #ffffff;
  text-align: center !important;
  height: 30px;
  position: relative;
  width: 45%;
  top: -28px;
  display: block;
  margin: 0 auto;
}
.btn-google {
  background-color: #ffffff !important;
  border: 1px solid #7E98DF !important;
  color: #7E98DF !important;
  box-sizing: border-box !important;
}
.form small.signUp {
  color: #313131;
  display: block;
  text-align: center !important;
  margin-top: 10px;
}
.form small router-link {
  color: #7E98DF !important;
}
</style>
