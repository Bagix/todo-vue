<template>
  <div id="user-info" class="col-md-6 m-auto">
    <div class="card">
      <div class="card-body">
          <p class="h4 text-center py-4">Your Info</p>
          <div class="md-form user-image">
            <label for="avatar">
                <img class="avatar" v-if="user.avatar" v-bind:src="user.avatar">
                <img class="avatar" v-else-if="image" v-bind:src="image">
                <div v-else class="avatar-placeholder">
                  <font-awesome-icon icon="user-plus" size="3x" />
                </div>
            </label>
            <input type="file" id="avatar" class="form-control" v-on:change="onFileSelected">
            <button class="btn btn-sm btn-outline-info" v-on:click="uploadImage" :disabled="!imageData">Save image</button>
            <transition name="fade-down">
              <div class="alert alert-success" role="alert" v-show="savedImage">
                Image Saved! <font-awesome-icon icon="check-circle" />
              </div>
            </transition>
            <transition name="fade-down">
              <div class="alert alert-danger" role="alert" v-if="errorImage">
                Error! Try again later. <font-awesome-icon icon="exclamation-circle" />
              </div>
            </transition>
          </div>
          <div class="md-form">
            <input type="text" id="first-name" class="form-control" placeholder="First name" v-model="user.first_name">
          </div>
          <div class="md-form">
            <input type="text" id="last-name" class="form-control" placeholder="Last name" v-model="user.last_name">
          </div>
          <div class="text-center py-4 mt-3">
            <button class="btn btn-lg btn-cyan" v-on:click="SaveUserInfo()">Save Info</button>
          </div>
      </div>
    </div>
    <transition name="fade-down">
      <div class="alert alert-success" role="alert" v-show="saved">
        Info Saved! <font-awesome-icon icon="check-circle" />
      </div>
    </transition>
    <transition name="fade-down">
      <div class="alert alert-danger" role="alert" v-if="error">
        Error! Try again later. <font-awesome-icon icon="exclamation-circle" />
      </div>
    </transition>
  </div>
</template>

<script>

import { fireAuth } from '../main'
import { db } from '../main'
import { dbStorage } from '../main'

export default {
  data() {
    return {
      user:{},
      saved: 0,
      error: 0,
      image: null,
      imageData: null,
      imageName: '',
      savedImage: 0,
      errorImage: 0,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser
    }
  },
  methods: {
    SaveUserInfo: function() {
      this.error = 0
      this.saved = 0
      db.collection("users").doc(this.currentUser.uid).set({
        first_name: this.user.first_name,
        last_name: this.user.last_name,
      })
      .then(() => {
        this.error = 0
        this.saved = 1
      })
      .catch(error => {
        this.saved = 0
        this.error = 1
      })
    },
    onFileSelected: function(event) {
      this.imageData = event.target.files[0];
      this.image = URL.createObjectURL(this.imageData)
      let user_prefix = this.currentUser.email.match(/([^@]+)/)[0]
      let file_extension = this.imageData.name.match(/(?:\.([^.]+))?$/)[0]
      this.imageName = user_prefix + "avatar" + file_extension;
    },
    uploadImage: function() {
      const storageRef = dbStorage.ref("avatars/" + this.imageName).put(this.imageData);
      storageRef.on(`state_changed`,snapshot => {
        
      }, 
      error => {
        this.errorImage = 1;
        console.log(error.message)
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          db.collection("users").doc(this.currentUser.uid).set({
            avatar: url
          },{merge: true})
          this.savedImage = 1
          this.image = url
        });
      });
    }
  },
  firestore () {
    return {
      user: db.collection('users').doc(this.currentUser.uid)
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "@/styles/components/userInfo.scss";
</style>