// Your VueJS code goes here
const vm = new Vue({
    el: '#app',
    data() {
        return {
            greeting: 'Hello!'
        }
    },
    methods: {
        greetMe() {
            this.greeting = `Hello! ${event.target.value}`;
        },
        clearOut() {
            event.target.value = '';
        }
    }
});