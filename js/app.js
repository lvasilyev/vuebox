// Your VueJS code goes here
Vue.component('super-button', {
    data() {
        return {
            enabled: false
        }
    },
    methods: {
        toggle() {
            this.enabled = !this.enabled;
            this.$emit('state', this.enabled);
        }
    },
    computed: {
        buttonText() {
            return this.enabled ? 'On' : 'Off';
        }
    },
    template:
    `
    <div class="button">
        <a href="#" 
            :class="[
                'btn',
                { 'btn-on' : enabled }
            ]"
            @click.prevent="toggle">{{buttonText}}</a>
    </div>
    `
});

new Vue({
    el: '#app',
    methods: {
        buttonHandler(e) {
            console.log(e);
        }
    },
    template:
    `
    <div id="container">
        <super-button @state="buttonHandler" />
        <super-button />
        <super-button />
    </div>
    `
});