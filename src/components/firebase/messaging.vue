<template>
    <div>
      <h1>Hello there!</h1>
      <p>Fill in your email and click the button below to subscribe to notifications.</p>
      <form v-on:submit.prevent="subscribe">
        <label for="email">Email address</label>
        <input class="form-control" type="email" id="email" v-model="email" required>
        <button v-cloak class="btn" type="submit" v-bind:disabled="buttonDisable || emailInvalid" v-text="buttonText">Enable Push Messages</button>
        <button v-cloak v-if="isPushEnabled" class="btn btn-danger" type="button" v-on:click.prevent="unsubscribe" v-bind:disabled="buttonDisableDisable">
            <span v-if="emailInvalid">Enter An Email To Unsubscribe</span>
            <span v-else>Disable Push Messages</span>
        </button>

        <v-btn color="success" @click="test">Sub</v-btn>
      </form>
    </div>
</template>

<script>
import { db } from "@/plugins/firebase";
export default {
  created: function() {
    //this.registerServiceWorker();
  
  },
  data() {
    return {
      isPushEnabled: false,
      buttonText: "Enable Push Messages",
      buttonDisable: false,
      buttonDisableDisable: false,
      email: "nhoxzunbmt@gmail.com"
    };
  },
  computed: {
    emailInvalid: function() {
      return this.email.length < 1;
    },
    safeEmail: function() {
      // make a safe key for the firebase objects
      return this.email.replace(/\W/g, "");
    }
  },
  methods: {
     test(){
  db.ref("subscriptions/").push(this.email)
     } ,
    registerServiceWorker: function() {
      // checks service worker support
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/sw.js", {
            scope: "/"
          })
          .then(function(reg) {
            // registration worked
            console.log("Registration succeeded. Scope is " + reg.scope);
          })
          .catch(function(error) {
            // registration failed
            console.log("Registration failed with " + error);
          });
      }
    },
    checkIfAlreadyRegistered: function() {
      // does the user already exist?
      return db
        .ref("subscriptions/" + this.safeEmail)
        .once("value");
    },
    registerForPush: function() {
      navigator.serviceWorker.ready.then(
        function(serviceWorkerRegistration) {
          console.log('Xy ly serviceWorkerRegistration');
          serviceWorkerRegistration.pushManager
            .subscribe({
              userVisibleOnly: true // required for the current version of browser push
            })
            .then(
              function(subscription) {
                console.log(subscription);
                // The subscription was successful
                this.isPushEnabled = true;
                this.buttonText = "Already Registered";
                this.buttonDisable = true;

                // Send the subscription.endpoint to your server
                // and save it to send a push message at a later date
                return this.sendSubscriptionToServer(subscription);
              }.bind(this)
            )
            .catch(
              function(e) {
                if (Notification.permission === "denied") {
                  // The user denied the notification permission which
                  // means we failed to subscribe and the user will need
                  // to manually change the notification permission to
                  // subscribe to push messages
                  console.warn("Permission for Notifications was denied");
                  this.buttonDisable = true;
                } else {
                  // A problem occurred with the subscription; common reasons
                  // include network errors, and lacking gcm_sender_id and/or
                  // gcm_user_visible_only in the manifest.
                  console.error("Unable to subscribe to push.", e);
                  this.buttonDisable = false;
                  this.buttonText = "Enable Push Messages";
                }
              }.bind(this)
            );
        }.bind(this)
      );
    },
    subscribe: function() {
      // Disable the button so it can't be changed while
      // we process the permission request
      this.buttonDisable = true;

      // make sure we don't double register
      this.checkIfAlreadyRegistered().then(
        function(result) {
            console.log(result,result.exists());
          if (!result.exists()) {
                  console.log('Xy ly registerForPush');
            this.registerForPush();
          } else {
            this.buttonText = "Already Registered";
            this.isPushEnabled = true;
          }
        }.bind(this)
      );
    },
    unsubscribe: function() {
      // require an email for unsubscribe
      if (!this.safeEmail) {
        return;
      }

      this.buttonDisableDisable = true;

      navigator.serviceWorker.ready.then(
        function(serviceWorkerRegistration) {
          // To unsubscribe from push messaging, you need get the
          // subscription object, which you can call unsubscribe() on.
          serviceWorkerRegistration.pushManager
            .getSubscription()
            .then(
              function(pushSubscription) {
                // remove the user from Firebase
                db
                  .ref("subscriptions/" + this.safeEmail)
                  .remove();
                serviceWorkerRegistration.unregister().then(function(success) {
                  console.log(
                    "Service worker removal was completed? ",
                    success
                  );
                });
                // Check we have a subscription to unsubscribe
                if (!pushSubscription) {
                  // No subscription object, so set the state
                  // to allow the user to subscribe to push
                  this.isPushEnabled = false;
                  this.buttonDisable = false;
                  this.buttonDisableDisable = false;
                  this.buttonText = "Enable Push Messages";
                  return;
                }

                var subscriptionId = pushSubscription.subscriptionId;
                // TODO: Make a request to your server to remove
                // the subscriptionId from your data store so you
                // don't attempt to send them push messages anymore

                // since we use Firebase with an email key - this may be unrequired

                // We have a subscription, so call unsubscribe on it
                pushSubscription
                  .unsubscribe()
                  .then(
                    function(successful) {
                      // turn everything back to the initial state
                      this.buttonDisable = false;
                      this.buttonDisableDisable = false;
                      this.buttonText = "Enable Push Messages";
                      this.isPushEnabled = false;
                    }.bind(this)
                  )
                  .catch(
                    function(e) {
                      // We failed to unsubscribe, this can lead to
                      // an unusual state, so may be best to remove
                      // the users data from your data store and
                      // inform the user that you have done so

                      console.log("Unsubscription error: ", e);
                      this.buttonDisable = false;
                      this.buttonDisableDisable = false;
                      this.buttonText = "Enable Push Messages";
                    }.bind(this)
                  );
              }.bind(this)
            )
            .catch(
              function(e) {
                console.error(
                  "Error thrown while unsubscribing from push messaging.",
                  e
                );
              }.bind(this)
            );
        }.bind(this)
      );
    },
    sendSubscriptionToServer: function(subscription) {
      // clone the object without any of the extra getters and setters
      var newSubscription = JSON.parse(JSON.stringify(subscription));
      console.log(newSubscription);

      // create the user in the database
      db
        .ref("subscriptions/" + this.safeEmail)
        .set({
          endpoint: newSubscription.endpoint,
          keys: newSubscription.keys,
          created_at: Date.now()
        })
        .then(function() {
          console.log("Successfully saved into database.");
        })
        .catch(function(err) {
          console.error(err);
        });
    }
  }
};
</script>

<style scoped>
 [v-cloak] {
      display:none;
    }
</style>