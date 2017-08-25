// Your VueJS code goes here
new Vue({
    el: '#app',
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