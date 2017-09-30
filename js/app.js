// Your VueJS code goes here
const vm = new Vue({
    el: '#app',
    data() {
        return {
            greeting: 'Hello!'
        }
    },
    methods: {
        greetMe(event) {
             this.greeting = `Hello! ${event.target.value}`;
        },
        clearOut(event) {
            event.target.value = '';
        }
    }
});