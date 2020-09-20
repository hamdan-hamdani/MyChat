<template>
    <div class="container-register">
        <form class="form">
          <h5>Register</h5>
            <div class="form-group">
                <small id="emailHelp" class="form-text text-muted">Let’s create your account!</small>
                <label for="username">Name</label>
                <input type="email" v-model="username" class="form-control" id="username" aria-describedby="emailHelp">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <button type="submit" @click="handleRegister" class="btn btn-primary">Register</button>
            <hr>
            <small class="Lw">Register With</small>
            <button type="submit" @click="handleRegisterGoogle" class="btn btn-primary btn-google">Google</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['register']),
    handleRegisterGoogle () {

    },
    handleRegister (e) {
      e.preventDefault()
      const data = {
        email: this.email,
        password: this.password,
        username: this.username
      }
      this.register(data)
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style scoped>
.container-register {
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
  margin-top: 10px !important;
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
</style>
