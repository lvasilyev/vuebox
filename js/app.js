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
    filters: {
        reverseText(value) {
            return value.split('').reverse().join('');
        }
    }
});