// Your VueJS code goes here
let template = 
`<div id="login-dialog">
    <div id="login-title">{{ title }}</div>
    <div class="input-holder">
        <input type="text" placeholder="E-Mail">
    </div>
    <div class="input-holder">
        <input type="password" placeholder="Password">
    </div>
    <div class="input-holder">
        <a href="#" id="signinBtn">{{buttonText}}</a>
        <div class="text-links">
            <a href="#" id="signupBtn" @click="signupTitle">Signup for a free account!</a>
        </div>
    </div>
</div>`;

new Vue({
    el: '#app',
    data() {
        return {
            title: 'Sign-in to your account',
            buttonText: 'Sign-in'
        }
    },
    template,
    methods: {
        signupTitle() {
            this.title = 'Signup for a new account!';
            this.buttonText = 'Signup';
        }
    }
});