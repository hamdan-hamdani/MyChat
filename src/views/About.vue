<template>
  <div>
    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" v-model="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="form-group">
    <label for="room">Password</label>
    <select name="" id="room" v-model="room">
      <option value="arka1">Arka 1</option>
      <option value="arka2">Arka 2</option>
      <option value="arka3">Arka 3</option>
    </select>
  </div>
  <button type="submit" @click="handleLogin" class="btn btn-primary">Submit</button>
</form>
  </div>
</template>

<script>
export default {
  name: 'About',
  data: () => ({
    username: '',
    password: '',
    room: ''
  }),
  methods: {
    handleSubmit () {
      alert(this.room)
      const useriId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
      this.$router.push({
        name: 'Chat',
        params: {
          userId: useriId,
          username: this.username,
          room: this.room
        }
      })
    },
    handleLogin (e) {
      e.preventDefault()
      alert('Login')
      // const userId = Math.random.toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
      const useriId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)
      this.$router.push({
        name: 'Chat',
        params: {
          userId: useriId,
          username: this.username,
          room: this.room
        }
      })
      // this.$router.push({
      //   name: 'Chat',
      //   params: {
      //     userId: useriId,
      //     username: this.username
      //   }
      // })
    }
  }
}
</script>

<style scoped>

</style>
