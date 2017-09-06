// Your VueJS code goes here
Vue.component('login-dialog-component', {
    data() {
        return {
            title: 'Sign-in to your account',
            buttonText: 'Sign-in'
        }
    },
    methods: {
        signupTitle() {
            this.title = 'Signup for a new account!';
            this.buttonText = 'Signup';
        }
    },
    template: '#login-dialog-component'
});

new Vue({
    el: '#app',
    template: '<login-dialog-component />'
});