<template>
    <div>
        <h1>Oauth3</h1>

        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                context: 'oauth2 context',
                code: this.$route.query.code,
                type: this.$route.params.type
            };
        },
        mounted() {
  alert(this.type)
            if (this.code) {
                alert(this.code)
                this.$auth.oauth2({
                    code: true,
                    provider: this.type,
                    params: {
                        code: this.code,
                    },
                    success: function(res) {
                        console.log('success ' + this.context);
                    },
                    error: function (res) {
                        console.log('error ' + this.context);
                    }
                });
            }
        },

        methods: {
            social(type) {
                this.$auth.oauth2({
                    provider: type || this.type
                });
            }
        }
    }
</script>