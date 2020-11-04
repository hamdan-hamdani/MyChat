<template>
    <div class="container-forgot-password">
        <form class="form">
          <h5>Forgot Password</h5>
            <div class="form-group">
                <small id="emailHelp" class="form-text text-muted">You’ll get messages soon on your e-mail</small>
                <label for="exampleInputEmail1">Email</label>
                <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <button type="submit" @click="handleRegister" class="btn btn-primary">Send</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
// var nodemailer = require('nodemailer')
// import nodemailer from 'nodemailer'
// var fs = require('fs')
export default {
  name: 'Forgot Password',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    ...mapActions(['forgotPassword']),
    handleRegister (e) {
      e.preventDefault()
      // var transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: 'mychat709@gmail.com',
      //     pass: 'Konsisten1!'
      //   }
      // })
      alert(this.email)
      const data = {
        email: this.email
      }
      this.forgotPassword(data)
        .then(res => {
          alert('masuk')

          // var transporter = nodemailer.createTransport({
          //   service: 'gmail',
          //   auth: {
          //     user: 'mychat709@gmail.com',
          //     pass: 'Konsisten1!'
          //   }
          // })

          // var template = fs.readFileSync('index.html', 'utf-8')

          // var mailOptions = {
          //   from: 'mychat709',
          //   to: this.email,
          //   subject: 'Ubah kata sandi',
          //   // html: template
          //   html: '<h1> Silahkan klik link di bawah</h1> <p>Silahkan klik tautan dibawah untuk mengubah kata sandi</p> <a href="http://localhost:8080/changepassword">Klik</a>'
          // }
          // console.log(mailOptions.html)

          // transporter.sendMail(mailOptions, (err, info) => {
          //   if (err) throw err
          //   console.log('Email sent: ' + info.response)
          // })
        })
        .catch(err => {
          alert('err')
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.container-forgot-password {
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
  margin-top: 50px;
  border: none;
}
</style>
