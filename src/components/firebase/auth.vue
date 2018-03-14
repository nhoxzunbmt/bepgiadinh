<template>
  <div>

    <v-container fluid>
      <v-layout row>
        <v-flex xs12>

          <v-text-field name="email" label="email" id="email" v-model="email"></v-text-field>

          <v-text-field name="password" label="Password" id="password" v-model="password"></v-text-field>

          <v-btn color="success" @click="signUp">Sign Up</v-btn>
          <v-btn color="success" @click="logIn">Login</v-btn>
          <v-btn color="success" @click="sendPasswordReset">send Password Reset</v-btn>
          <v-btn color="success" @click="sendEmailVerification">send Email Verification</v-btn>
          <v-btn color="success" @click="signInAnonymously">sign In Anonymously</v-btn>
          <v-btn color="success" @click="signInWithGoogle">signInWithGoogle</v-btn>

          <v-toolbar flat class="transparent" v-if="user">
            <v-list class="pa-0">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img :src="user.photoURL">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ user.email }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-toolbar>

          {{ user }}

        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase";
import firebase from "firebase";
export default {
  data() {
    return {
      email: "thanhloi@ringier.com.vn",
      password: "123456"
    };
  },
  computed: {
    user() {
      return firebase.auth().currentUser;
    }
  },
  beforeCreate: function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //this.user = user;
        console.log(user);
        //this.$bindAsArray("items", db.ref(`items/${user.uid}`));
      }
      //this.loading = false;
    });
  },
  methods: {
    signUp() {
      if (this.email.length < 4) {
        alert("Please enter an email address");
      }

      const credentials = {
        email: this.email,
        password: this.password
      };
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
    },
    logOut() {
      firebase.auth().signOut();
    },
    logIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password.");
          } else {
            alert(errorMessage);
          }
          console.log(error);

          // [END_EXCLUDE]
        });
    },
    sendEmailVerification() {
      // [START sendemailverification]
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(function() {
          // Email Verification sent!
          // [START_EXCLUDE]
          alert("Email Verification Sent!");
          // [END_EXCLUDE]
        });
      // [END sendemailverification]
    },
    sendPasswordReset() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(function() {
          // Password Reset Email Sent!
          // [START_EXCLUDE]
          alert("Password Reset Email Sent!");
          // [END_EXCLUDE]
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == "auth/invalid-email") {
            alert(errorMessage);
          } else if (errorCode == "auth/user-not-found") {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
      // [END sendpasswordemail];
    },
    signInAnonymously() {
      // [START authanon]
      firebase
        .auth()
        .signInAnonymously()
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === "auth/operation-not-allowed") {
            alert("You must enable Anonymous auth in the Firebase Console.");
          } else {
            console.error(error);
          }
          // [END_EXCLUDE]
        });
      // [END authanon]
    },
    signInWithGoogle: function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(result => {
          this.user = result.user;
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>

</style>