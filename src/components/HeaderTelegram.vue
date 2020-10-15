<template>
    <div class="header">
        <div class="name-app"><h2>MyChating</h2></div>
        <div @click="menu" class="container-image"><img src="../assets/bars-solid.png" alt=""></div>
        <div v-if="activMenu" class="activ-menu">
          <ul>
            <li @click="profile">
                <div>
                  <img src="../assets/cog-solid.png" alt="">
                </div>Settings
            </li>
            <!-- <li><div><img src="../assets/user-solid.png" alt=""></div>Contacts</li> -->
            <!-- <li><div><img src="../assets/phone-solid.png" alt=""></div>Calls</li> -->
            <!-- <li><div><img src="../assets/bookmark-regular.png" alt=""></div>Save Messages</li> -->
            <li @click="inviteFriend"><div><img src="../assets/user-plus-solid.png" alt=""></div>Invite Friends</li>
            <!-- <li><div><img src="../assets/question-circle-regular.png" alt=""></div>MyChat FAQ</li> -->
          </ul>
        </div>
        <div class="container-add-friend" v-if="containerAddFriend">
          <div class="container-add">
            <label for="addUser">Add Friend</label>
            <input type="text" name="" id="addUser" v-model="searchUser">
            <button @click="AddFriend">Add</button>
          </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'HeaderTelegram',
  data () {
    return {
      activMenu: false,
      containerAddFriend: false,
      searchUser: ''
    }
  },
  props: ['idUser'],
  methods: {
    ...mapActions(['addUser', 'cekUser', 'insertFriend', 'getFriends']),
    ...mapMutations(['mutuserId']),
    profile () {
      alert(this.idUser)
      this.mutuserId(this.idUser)
      this.$router.push({
        path: '/profile',
        params: {
          userId: this.idUser
          // username: this.email
          // room: this.room
        }
      })
    },
    menu () {
      if (this.activMenu === false) {
        this.activMenu = true
      } else if (this.activMenu === true) {
        this.activMenu = false
      }
    },
    inviteFriend () {
      this.activMenu = false
      this.containerAddFriend = true
    },
    AddFriend () {
      this.addUser({ email: this.searchUser }) //, id: this.idUser
        .then(res => {
          console.log(res)
          this.containerAddFriend = false
          this.searchUser = ''
          alert('data ditemukan')
          this.cekUser({ resultUser: res, id: this.idUser })
            .then(resCekUser => {
              alert('data akan dikirim')
              this.insertFriend(resCekUser)
                .then(resInsertFriend => {
                  const payload = {
                    id: this.idUser
                  }
                  this.getFriends(payload)
                  alert('data berhasil terkirim')
                })
                .catch(() => {
                  alert('data gagal dikirim')
                })
            })
            .catch(erro => {
              alert(erro)
            })
        })
        .catch(err => {
          this.containerAddFriend = false
          this.searchUser = ''
          alert('data tidak ditemukan')
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}
.header .name-app {
  flex: 3;
  color: #7E98DF;
}
.header .container-image {
  width: 27px;
  flex: 0.2;
}
.container-image img {
  width: 100%;
  object-fit: contain;
}
.activ-menu {
    right: 20px;
    position: absolute;
    top: 44px;
    border-radius: 20px;
    border-top-right-radius: 5px;
    background: #7E98DF;
    padding: 0 20px;
}
.activ-menu ul {
  padding: 0;
  margin: 0;
}
.activ-menu ul li {
  list-style-type: none;
  padding: 10px 0;
  margin: 0;
  color: #ffffff;
}
.activ-menu ul li div {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 15px;
  box-sizing: border-box;
}
.activ-menu ul li div img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.container-add-friend {
  position: fixed;
  top: 59px;
  left: 12px;
  background-color: gray;
  /* opacity: .3; */
}
.container-add {
  background: #ffffff;
}
</style>
