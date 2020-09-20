<template>
    <div class="container">
      <div class="container-chat">
        <div class="left">
          <div class="header">
            <h2>MyChating</h2>
            <div>-</div>
          </div>
          <div class="search">
            <span class="inputMsg"><i>s</i><input type="text" name="" id="" placeholder="Type your message"></span>
            <span>+</span>
          </div>
          <div class="menu">
            <ul>
              <li><div>All</div></li>
              <li><div>Important</div></li>
              <li><div>Unread</div></li>
            </ul>
          </div>
          <div v-for="friend in getAddFriends" :key="friend.id">
            <div @click="handleDataFriend(friend)" class="container-user">
              <div class="user">
                <div class="image">
                  <img src="../assets/Koala.jpg" alt="">
                </div>
                <div class="body-user">
                  <span>{{friend.name}}</span>
                  <p>what did you do that?</p>
                  <!-- <div v-for="friend in getAddFriends" :key="friend.id">
                      <div>
                        <p>{{friend.id}}</p>
                        <p>{{friend.email}}</p>
                        <p>{{friend.name}}</p>
                        <input type="text" v-model="textMessage" @keyup.enter="handleSendMessage(friend.email)">
                      </div>
                  </div> -->
                </div>
              </div>
              <div class="user-notif">
                <p>15:20</p>
                <p>2</p>
              </div>
            </div>
          </div>
      </div>
      <div class="right">
        <div class="empty" v-if="activ">
          <p>Please select a chat to start messaging</p>
        </div>
        <div v-else>
          <!-- <div class="row"> -->
            <!-- <div class="col-md-2">
            </div> -->
            <!-- <div class="col-md-10"> -->
                <div class="box-chat">
                  <ul class="list-group">
                    <li class="list-group-item" v-for="(msg, index) in messages" :key="index">{{msg}}</li>
                  </ul>
                  <div class="input-group mb-3">
                    <input v-model="textMessage" @keyup.enter="sendEmail" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
                    <div class="input-group-append">
                        <button @click="sendEmail" class="btn btn-outline-secondary" type="button" id="button-addon2">Send</button>
                    </div>
                  </div>
                  <!-- <inputChat/>
                  <label for="addUser">Add Friend</label>
                  <input type="text" name="" id="addUser" v-model="searchUser">
                  <button @click="AddFriend">Add</button> -->
                  <!-- <div v-if="activfriend"> -->
                  <!-- </div> -->
                </div>
            <!-- </div> -->
        <!-- </div> -->
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import io from 'socket.io-client'
// import inputChat from '../components/textMessage'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ChatTing',
  components: {
    // inputChat
  },
  data () {
    return {
      socket: io('http://localhost:4000'),
      userId: this.$route.params.userId,
      username: this.$route.params.username,
      // room: this.$route.params.room,
      messages: [],
      searchUser: '',
      activfriend: false,
      textMessage: '',
      activ: 'true',
      friend: {}
    }
  },
  mounted () {
    // if (!this.$route.params.userId) {
    //   this.$router.push('/login')
    // }
    this.getFriends({ email: this.searchUser, id: this.userId })
    this.socket.emit('welcomeMessage', {
      id: this.userId,
      username: this.username
      // room: this.room
    })
    this.socket.on('message', message => {
      this.messages.push(message)
    })
    this.socket.on('notif', message => {
      alert(message)
    })
  },
  computed: {
    ...mapGetters(['getPersonalChat', 'getAddFriends'])
  },
  methods: {
    ...mapActions(['addUser', 'getFriends']),
    handleDataFriend (friend) {
      console.log(friend)
      this.friend = friend
      this.activ = false
    },
    sendEmail () {
      alert(this.friend.email)
      this.socket.emit('sendMessage', {
        value: this.textMessage,
        id: this.userId,
        // idfriend: this.getPersonalChat.id,
        idfriend: this.friend.idFriend,
        username: this.username
        // room: this.room
      })
    },
    handleSendMessage (email) {
      // console.log(value)
      // alert(value)
      alert(email)
      alert('ini')
      this.socket.emit('sendMessage', {
        value: this.textMessage,
        id: this.userId,
        // idfriend: this.getPersonalChat.id,
        idfriend: email,
        username: this.username
        // room: this.room
      })
    },
    AddFriend () {
      this.addUser({ email: this.searchUser, id: this.userId })
        .then(res => {
          this.activfriend = true
          alert('data ditemukan')
        })
        .catch(err => {
          alert('data tidak ditemukan')
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.container-chat {
  /* border: 1px solid ; */
  display: flex;
}
.header {
  display: flex;
}
.header h2 {
  flex: 3;
  /* border: 1px solid; */
}
.header div {
  flex: 1;
}
.search {
  display: flex;
}
.menu ul {
  display: flex;
  justify-content: space-around;
  /* border: 1px solid; */
}
.menu ul li div{
  padding: 0 30px;
}
.menu ul li:hover div{
  background: #7E98DF;
  border-radius: 20px;
}
.menu ul li {
  list-style-type: none;
}
.left {
  flex: 1;
  /* border: 1px solid red; */
}
.right {
  flex: 2;
  background-color:  #E5E5E5;
  text-align: center;
  height: 650px;
  /* border: 1px solid green; */
}
.right .empty {
  margin: 300px auto;
}
.container-user {
  /* border: 1px solid red; */
  display: flex;
}
.container-user .user {
  flex: 4;
  /* border: 1px solid green; */
  display: flex;
}
.container-user .user .image {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  /* border: 1px solid; */
}
.container-user .user .image img {
  width: 100%;
  object-fit: cover;
}
.container-user .user .body-user {
  font-size: 18px;
}
.container-user .user .body-user p{
  font-size: 14px;
  color: #7E98DF;
}
.container-user .user-notif {
  flex: 1;
  /* border: 1px solid brown; */
}
</style>
