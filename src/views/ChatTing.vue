  <template>
      <div class="container-chat">
        <div class="left">
          <HeaderTelegram :id-user="userId"/>
          <Search />
          <Menu />
          <div v-for="friend in getAddFriends" :key="friend.id">
            <div class="container-user">
              <div @click="handleDataFriend(friend)" class="user">
                <div class="image">
                  <img :src="friend.image" alt="">
                </div>
                <div class="body-user">
                  <p>{{friend.name}}</p>
                  <p class="friend-message">{{friend.message}}</p>
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
                <p>{{friend.tgl}}</p>
                <p><span @click="unFriend(friend.idFriend)" class="notif">X</span></p>
                <!-- {{friend.notifMessage}} -->
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
              <div class="user right-user">
                <div class="image">
                  <img :src="friend.image" alt="">
                </div>
                <div class="body-user">
                  <span>{{friend.name}}</span>
                  <p>{{online}}</p>
                </div>
                <div @click="menuFriend" class="menu-friend"><img src="../assets/ellipsis-v-solid.png" alt=""></div>
                <div v-if="activmenuFriend" class="activ-menu-friend">
                  <ul>
                    <li><div><img src="../assets/phone-solid.png" alt=""></div>Call</li>
                    <li @click="deleteHistoryChat"><div><img src="../assets/trash-solid.png" alt=""></div>Delete Chat History</li>
                    <li><div><img src="../assets/bell-solid.png" alt=""></div>Mute Notification</li>
                    <li><div><img src="../assets/search-solid.png" alt=""></div>Search</li>
                  </ul>
                </div>
              </div>
              <!-- <div v-for="friendsMsg in tmpMessages" :key="friendsMsg.id"> -->
                <div v-for="(friendMsg, index) in getMsg" :key="index">
                  <div v-if="friend.idFriend === friendMsg.idFriend" class="user-message">
                    <div class="image">
                      <img :src="friendMsg.image" alt="">
                    </div>
                    <ul class="list-group">
                        <li class="friend-left list-group-item"><span>{{friendMsg.message}}</span></li>
                    </ul>
                    <div class="friend-tgl"><span>{{formatDate(friendMsg.tgl)}}</span></div>
                  </div>
                  <div v-else-if="friendMsg.idFriend !== friend.idFriend" class="user-message-right">
                    <div class="friend-tgl"><span>{{formatDate(friendMsg.tgl)}}</span></div>
                    <ul class="list-group">
                        <li class="friend-right list-group-item"><span>{{friendMsg.message}}</span></li>
                    </ul>
                    <div class="image-right">
                      <img :src="friendMsg.image" alt="">
                    </div>
                  </div>
                </div>
              <!-- </div> -->
                <div class="box-chat rltv">
                  <!-- <ul class="list-group">
                    <li class="list-group-item" v-for="(msg, index) in messages" :key="index">{{msg}}</li>
                  </ul> -->
                  <div class="input-group mb-3 inp-btm">
                    <input v-model="textMessage" @keyup.enter="sendEmail" type="text" class="form-control" placeholder="Type your message..." aria-label="Recipient's username" aria-describedby="button-addon2">
                    <div class="input-group-append">
                        <div v-if="activAttachment">
                          <div class="activ-attachment">
                            <ul>
                              <li @click="sendMessageImage">
                                <form enctype="multipart/form-data">
                                  <div>
                                    <!-- <input type="file" @change="selectFile" ref="file" name="image" id="image"> -->
                                    <img src="../assets/image-solid.png" alt=""></div>Image
                                </form>
                              </li>
                              <li><div><img src="../assets/file-alt-solid.png" alt=""></div>Documents</li>
                              <li><div><img src="../assets/user-solid.png" alt=""></div>Contacts</li>
                              <li><div><img src="../assets/map-marker-alt-solid.png" alt=""></div>Location</li>
                            </ul>
                          </div>
                        </div>
                        <button @click="attachment" class="btn btn-outline-secondary" type="button"><img src="../assets/plus-solid.png" alt=""></button>
                        <button class="btn btn-outline-secondary" type="button"><img src="../assets/surprise-solid.png" alt=""></button>
                        <button @click="sendEmail" class="btn btn-outline-secondary" type="button" id="button-addon2"><img src="../assets/paper-plane-solid.png" alt=""></button>
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
</template>

<script>
import io from 'socket.io-client'
import moment from 'moment'
// import inputChat from '../components/textMessage'
import HeaderTelegram from '../components/HeaderTelegram'
import Search from '../components/Search'
import Menu from '../components/Menu'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'ChatTing',
  components: {
    // inputChat,
    HeaderTelegram,
    Search,
    Menu
  },
  data () {
    return {
      socket: io('http://localhost:4000'),
      userId: this.$route.params.userId,
      // username: this.$route.params.username,
      // room: this.$route.params.room,
      messages: [],
      searchUser: '',
      activfriend: false,
      textMessage: '',
      activ: 'true',
      friend: {},
      tmpFriend: [],
      online: '',
      tmpMessages: [],
      activAttachment: false,
      activmenuFriend: false,
      noMessage: '',
      currentfriend: 0
    }
  },
  mounted () {
    // if (!this.$route.params.userId) {
    //   this.$router.push('/login')
    // }
    this.socket.on('notifMessage', data => {
      // alert(data)
      this.noMessage = data
      console.log('notifmessssssss')
    })
    this.getFriends({ email: this.searchUser, id: this.userId })
    this.socket.emit('welcomeMessage', {
      id: this.getUser,
      // id: localStorage.getItem('id'),
      username: this.username
      // room: this.room
    })
    this.socket.on('message', message => {
      this.messages.push(message)
    })
    this.socket.on('MessageGo', data => {
      // alert('MessafeGo')
      // console.log(data)
      // console.log('MessafeGo akhir')
      this.actGetMessage(data)
        .then(async (res) => {
          // alert('actMessafeGo')
          // console.log('actMessafeGo')
          // console.log(res)
          await this.actGetMsg(res)
            .then(async (respol) => {
              // alert('berhasil bang (^_*)')
              // console.log('b ga y')
              console.log(respol)
              console.log('akhir respol')
              await this.socket.emit('GetMessageGo', { data: data, respol: respol })
              // this.getFriends({ email: this.searchUser, id: this.getUser })
            })
            .catch(err => {
              alert('Ampun bang jago')
              console.log(err)
            })
        })
        .catch(err => {
          alert('masig err')
          console.log(err)
        })
      // this.actGetMsg(data)
      //   .then(resi => {
      //     this.tmpMessages.push(this.getMsg)
      //   })
    })
    this.socket.on('GetMessageGogo', ({ data, respol }) => {
      // alert('getmessage go ya')
      console.log('getmessage go ya')
      console.log(respol)
      if (data.id === this.currentfriend || data.idfriend === this.currentfriend) {
        this.mutMessage(respol)
      }
      // this.actGetMsg(data)
      //   .then(async (resl) => {
      //     await console.log(resl)
      //     // alert('bismilah')
      //     await this.actGetMsg(data)
      //     // this.getFriends({ email: this.searchUser, id: this.getUser })
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    })
    this.socket.on('notif', message => {
      alert(message)
    })
    this.socket.on('online', message => {
      this.online = message
    })
  },
  computed: {
    ...mapGetters(['getPersonalChat', 'getAddFriends', 'getMsg', 'getUser'])
  },
  methods: {
    ...mapActions(['addUser', 'getFriends', 'actGetMessage', 'actGetMsg', 'sendImage', 'removeFriend']),
    ...mapMutations(['mutMessage']),
    unFriend (idFriend) {
      // alert(idFriend)
      this.removeFriend({ idUser: this.getUser, idFriend })
        .then(res => {
          const payload = {
            id: this.getUser
            // id: localStorage.getItem('id')
          }
          this.getFriends(payload)
        })
    },
    sendMessageImage () {
      alert('image')
      this.sendImage()
    },
    deleteHistoryChat () {
      alert('Hapus')
    },
    formatDate (date) {
      return moment(date).format('LT')
    },
    menuFriend () {
      if (this.activmenuFriend === false) {
        this.activmenuFriend = true
      } else if (this.activmenuFriend === true) {
        this.activmenuFriend = false
      }
    },
    handleDataFriend (friend) {
      console.log(friend)
      console.log('frined bro')
      // alert('masuk')
      this.currentfriend = friend.idFriend
      this.friend = friend
      let arrFriend = []
      arrFriend.push(friend)
      console.log('arrfriend')
      console.log(arrFriend)
      this.tmpFriend = arrFriend
      arrFriend = []
      this.mutMessage([])
      const payload = {
        id: this.getUser,
        // id: localStorage.getItem('id'),
        // idfriend: this.getPersonalChat.id,
        idfriend: this.friend.idFriend
      }
      this.actGetMsg(payload)
        .then(resi => {
          this.tmpMessages.push(this.getMsg)
        })
      console.log(arrFriend)
      this.socket.emit('online', this.getUser, friend.idFriend)
      this.activ = false
    },
    sendEmail () {
      alert(this.friend.email + 'be')
      this.socket.emit('sendMessage', {
        value: this.textMessage,
        id: this.getUser,
        // id: localStorage.getItem('id'),
        // idfriend: this.getPersonalChat.id,
        idfriend: this.friend.idFriend,
        username: this.username
        // room: this.room
      })
      this.textMessage = ''
    },
    handleSendMessage (email) {
      // console.log(value)
      // alert(value)
      alert(email)
      alert('ini')
      this.socket.emit('sendMessage', {
        value: this.textMessage,
        id: this.getUser,
        // id: localStorage.getItem('id'),
        // idfriend: this.getPersonalChat.id,
        idfriend: email,
        username: this.username
        // room: this.room
      })
    },
    AddFriend () {
      this.addUser({ email: this.searchUser, id: this.getUser })
        .then(res => {
          this.activfriend = true
          alert('data ditemukan')
        })
        .catch(err => {
          alert('data tidak ditemukan')
          console.log(err)
        })
    },
    attachment () {
      if (this.activAttachment === false) {
        this.activAttachment = true
      } else if (this.activAttachment === true) {
        this.activAttachment = false
      }
    }
  }
}
</script>

<style scoped>
.container-chat {
  display: flex;
}
.left {
  flex: 0.5;
  border-right: 1px solid #E5E5E5;
}
.right {
  flex: 2;
  background-color:  #E5E5E5;
  text-align: center;
  height: 100%;
  /* border: 1px solid green; */
}
.right .empty {
  margin: 300px auto;
}
.right-user {
  background: #ffffff;
  padding: 20px 50px !important;
}
.right-user .body-user{
  flex: 2;
  text-align: left;
}
.friend-message {
  max-width: 160px;
  overflow: hidden;
  box-sizing: border-box;
}
.container-user {
  display: flex;
  padding: 0 20px;
}
.container-user p {
  margin: 0;
}
.container-user .user, .user {
  flex: 4;
  padding: 5px 0;
  display: flex;
}
.menu-friend {
  flex: 0.2;
  /* width: 25px; */
  height: 25px;
  align-self: center;
  position: relative;
}
.activ-menu-friend {
  position: absolute;
  top: 66px;
  right: 83px;
  border-radius: 20px;
  background: #7E98DF;
  border-top-right-radius: 5px;
  z-index: 99999;
}
.activ-menu-friend ul {
  padding: 10px;
  margin: 0;
}
.activ-menu-friend ul li {
  padding: 0;
  margin: 5px 0;
  color: #ffffff;
  text-align: left;
  list-style-type: none;
}
.menu-friend img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.container-user .user .image, .user .image, .user-message .image {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 10px;
}
.user-message-right .image-right {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 0;
}
.container-user .user .image img,.user .image img, .user-message .image img, .user-message-right .image-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.container-user .user .body-user, .user .body-user, .user-message .body-user, .user-message-right .body-user {
  font-size: 18px;
}
.container-user .user .body-user p,.user .body-user p, .user-message .body-user p, .user-message-right .body-user p{
  font-size: 14px;
  color: #7E98DF;
  margin-bottom: 5px;
}
.container-user .user-notif {
  flex: 1;
  padding: 5px 0;
  box-sizing: border-box;
  text-align: right;
}
.user-notif span {
  background: #7E98DF;
  width: 25px;
  display: inline-block;
  border-radius: 50%;
  text-align: center;
}
/* .rltv {
  position: relative;
} */
.activ-attachment {
    width: 197px;
    background: #7E98DF;
    top: -186px;
    left: -146px;
    position: absolute;
    padding: 20px;
    border-radius: 25px;
    border-bottom-right-radius: 10px;
    box-sizing: border-box;
    color: #ffffff;
}
.activ-attachment ul {
  padding: 0;
  margin: 0;
}
.activ-attachment ul li {
  padding: 0;
  margin: 5px 0;
  list-style-type: none;
  text-align: left;
}
.activ-attachment ul li div,.activ-menu-friend ul li div {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 15px;
  box-sizing: border-box;
}
.activ-attachment ul li div img,.activ-menu-friend ul li div img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.inp-btm {
  margin-top: 485px;
}
.input-group-append {
  position: relative;
}
.input-group-append button {
  width: 50px;
  height: 38px;
}
.input-group-append button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.user-message {
  display: flex;
  padding: 10px 20px;
}
.user-message-right {
  display: flex;
  padding: 10px 20px;
  justify-content: flex-end;
}
.user-message .friend-left {
  background: #7E98DF;
  border-radius: 20px;
  border-top-left-radius: 5px;
  max-width: 230px;
}
.user-message-right .friend-right {
  background: #ffffff;
  margin-right: 10px;
  border-radius: 20px;
  border-top-right-radius: 5px;
  max-width: 230px;
}
.friend-tgl {
  padding: 10px;
  box-sizing: border-box;
}
</style>
