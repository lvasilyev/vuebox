// Your VueJS code goes here
const vm = new Vue({
    el: '#app',
    data() {
        return {
            greeting: ''
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
        },
        greet(value) {
            return `Hello! ${value}`;
        }
    }
});