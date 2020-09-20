<template>
    <div>
        <div class="input-group mb-3">
            <input v-model="textMessage" @keyup.enter="sendEmail" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
            <div class="input-group-append">
                <button @click="sendEmail" class="btn btn-outline-secondary" type="button" id="button-addon2">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'TextMessage',
  data () {
    return {
      textMessage: ''
    }
  },
  methods: {
    ...mapMutations(['setTextMessage']),
    sendEmail () {
      this.setTextMessage(this.textMessage)
      this.textMessage = ''
    }
  }
}
</script>

<style scoped>

</style>
