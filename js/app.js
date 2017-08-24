// Your VueJS code goes here
const vm = new Vue({
    el: '#app',
    data() {
        return {
            greeting: 'Hello!'
        }
    },
    methods: {
        clearOut() {
            this.greeting = '';
        }
    },
    computed: {
        reverseText() {
            return this.greeting.split('').reverse().join('');
        }
    },
    filters: {
        upperCase(value) {
            return value.toUpperCase();
        }
    }
});