<template>
    <div class="container">
        <h2>Selamat datang di MyChat</h2>
        <div class="row">
            <div class="col-md-4">

            </div>
            <div class="col-md-8">
                <div class="box-chat">
                  <ul class="list-group">
                    <li class="list-group-item" v-for="(msg, index) in messages" :key="index">{{msg}}</li>
                  </ul>
                  <inputChat @send-message="handleSendMessage"/>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import io from 'socket.io-client'
import inputChat from '../components/textMessage'
export default {
  name: 'Chat',
  components: {
    inputChat
  },
  data () {
    // userId: this.$route.params.userId,
    // userName: this.$route.params.username
    return {
      socket: io('http://localhost:4000'),
      userId: this.$route.params.userId,
      username: this.$route.params.username,
      room: this.$route.params.room,
      messages: []
    }
  },
  mounted () {
    if (!this.$route.params.userId) {
      this.$router.push('/about')
    }
    this.socket.emit('welcomeMessage', {
      id: this.userId,
      username: this.username,
      room: this.room
    })
    this.socket.on('message', message => {
      this.messages.push(message)
    })
    this.socket.on('notif', message => {
      alert(message)
    })
  },
  methods: {
    handleSendMessage (value) {
      console.log(value)
      alert('ini')
      this.socket.emit('sendMessage', {
        value: value,
        id: this.userId,
        username: this.username,
        room: this.room
      })
    }
  }
}
</script>

<style scoped>

</style>
