<template>
    <div>
        <h1>Oauth2</h1>

        <div v-show="!code || !type">
            <b>NOTE:</b> Absolutely <b>NO</b> data is actually stored on the demo server. Nor is there a request being made to any third party service (Facebook, Google, etc). The demo server will simply send back a token based on a hard coded user with credentials (social / secret).
            
            <hr/>

            <button v-on:click="social('facebook')">Facebook</button>
            <button v-on:click="social('google')">Google</button>

            <hr/>
            
            <b>NOTE:</b> Google will not work since it's domain set is very restricted but the code is setup as a sample (in the end they all work the same).
        </div>

        <div v-show="!is_success && code && type">
            Verifying {{ type }} code...
        </div>

        <div v-show="is_success">
            Login Successfully!
        </div>
    </div>
</template>

<script>
import fb from "@/config/social";
import axios from "axios";
export default {
  data() {
    return {
      context: "oauth2 context",
      code: this.$route.query.code,
      type: this.$route.params.type,
      is_success : false
    };
  },
  mounted() {
    if (this.code) {
      const payload = {
        client_id: fb.client_id,
        client_secret: fb.client_secret,
        redirect_uri: fb.redirect_uri,
        code: this.code
      };

      axios
        .get("https://graph.facebook.com/v2.4/oauth/access_token", {
          params: payload
        })
        .then(response => {
          this.login(response.data.access_token);
        });
    }
  },

  methods: {
    social(type) {
      this.$auth.oauth2({
        provider: type || this.type
      });
    },
    login(access_token) {
      const payload = {
        access_token: access_token
      };
      axios.get("/login/facebook", { params: payload }).then(response => {
        console.log(response.data);
        this.is_success = true;
      });
    }
  }
};
</script>