<template>
      <div class="container-chat">
        <div class="left">
          <div class="back"><router-link to="/">back</router-link></div>
          <div class="container-image">
              <img :src="getCurrentUser.image" alt="">
          </div>
          <div class="center">{{getCurrentUser.name}}</div>
          <div class="center">{{getCurrentUser.email}}</div>
          <div class="account">
              <h5>Account</h5>
              <span>{{getCurrentUser.noHp}}</span>
          </div>
          <div class="username">
              <h6>{{getCurrentUser.email}}</h6>
              <p>Username</p>
          </div>
          <div class="bio">
              <p>{{getCurrentUser.bio}}</p>
          </div>
          <button @click="updateProfile">Update Profile</button>
        </div>
      <div class="right">
        <div v-if="activupdateProfile" class="empty">
          <p>Please select a chat to start messaging</p>
        </div>
        <div v-else>
            <form enctype="multipart/form-data">
                <label for="name">Nama</label>
                <input type="text" v-model="name" name="name" id="name">
                <label for="image"></label>
                <input type="file" @change="selectFile" ref="file" name="image" id="image">
                <label for="nohp">No Hp</label>
                <input type="number" v-model="nohp" name="price" id="nohp">
                <label for="bio">Bio</label>
                <input type="text" v-model="bio" id="bio">
            </form>
            <button v-on:click="sendEdit">Edit</button>
        </div>
      </div>
      </div>
</template>

<script>
import io from 'socket.io-client'
import moment from 'moment'
// import inputChat from '../components/textMessage'
// import HeaderTelegram from '../components/HeaderTelegram'
// import Search from '../components/Search'
// import Menu from '../components/Menu'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Profile',
  components: {
    // inputChat,
    // HeaderTelegram,
    // Search,
    // Menu
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
      friend: {},
      tmpFriend: [],
      online: '',
      tmpMessages: [],
      activAttachment: false,
      activmenuFriend: false,
      noMessage: '',
      activupdateProfile: true,
      name: '',
      nohp: '',
      bio: '',
      image: ''
    }
  },
  props: ['idUser'],
  mounted () {
    // console.log(this.getUserId)
    // console.log('ini userid')
    // this.getUser(this.getUserId)
    this.actgetUser()
  },
  computed: {
    ...mapGetters(['getPersonalChat', 'getAddFriends', 'getMsg', 'getUserId', 'getCurrentUser'])
  },
  methods: {
    ...mapActions(['addUser', 'getFriends', 'actGetMessage', 'actGetMsg', 'sendImage', 'actgetUser', 'updateUser']),
    ...mapMutations(['mutMessage']),
    updateProfile () {
      alert('mmma')
      this.activupdateProfile = false
    },
    selectFile () {
      this.image = this.$refs.file.files[0]
    },
    sendEdit () {
      alert('edit')
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('file', this.image)
      formData.append('noHp', this.nohp)
      formData.append('bio', this.bio)
      this.updateUser({ id: this.getUserId, data: formData })
        .then(res => {
          this.name = ''
          this.nohp = ''
          this.bio = ''
          this.actgetUser()
        })
        .catch(err => {
          console.log(err)
        })
        // axios.patch('http://localhost:4000/api/v1/products/' + this.data2.id, formData)
        //   .then(res => {
        //     this.actAllProducts()
        //     this.data2.idCategory = ''
        //     this.data2.nameProduct = ''
        //     this.data2.price = 0
        //     this.data2.image = ''
        //     this.data2.qty = 0
        //     this.data2.index = 0
        //     this.mutActive(true)
        //     this.setMessage('Data berhasil diedit')
        //     resolve(res)
        //   })
        //   .catch(err => {
        //     console.log(err)
        //     reject(err)
        //   })
        // this.isActiveEdit = false
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
      alert('masuk')
      this.friend = friend
      let arrFriend = []
      arrFriend.push(friend)
      console.log('arrfriend')
      console.log(arrFriend)
      this.tmpFriend = arrFriend
      arrFriend = []
      this.mutMessage([])
      const payload = {
        id: this.userId,
        // idfriend: this.getPersonalChat.id,
        idfriend: this.friend.idFriend
      }
      this.actGetMsg(payload)
        .then(resi => {
          this.tmpMessages.push(this.getMsg)
        })
      console.log(arrFriend)
      this.socket.emit('online', this.userId, friend.idFriend)
      this.activ = false
    },
    sendEmail () {
      // alert(this.friend.email + 'be')
      this.socket.emit('sendMessage', {
        value: this.textMessage,
        id: this.userId,
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
.left div {
    padding: 0 20px;
}
.left div.center {
    text-align: center;
}
.container-image {
    width: 68px;
    height: 68px;
    overflow: hidden;
    background: brown;
    margin: 15px auto;
    padding: 0 !important;
}
.container-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
form {
    background: #ffffff;
}

</style>
