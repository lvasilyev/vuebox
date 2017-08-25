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
    render(createElement) {
        return createElement('div', {
            attrs: {
                id: 'login-dialog'
            }
        }, [
            createElement('div', {
                attrs: {
                    id: 'login-title'
                }
            }, [ this.title ]),
            createElement('div', {
                attrs: {
                    class: 'input-holder'
                }
            }, [
                createElement('input', {
                    attrs: {
                        type: 'text',
                        placeholder: 'E-Mail'
                    }
                })
            ]),
            createElement('div', {
                attrs: {
                    class: 'input-holder'
                }
            }, [
                createElement('input', {
                    attrs: {
                        type: 'password',
                        placeholder: 'Password'
                    }
                })
            ]),
            createElement('div', {
                attrs: {
                    class: 'input-holder'
                }
            }, [
                createElement('a', {
                    attrs: {
                        href: '#',
                        id: 'signinBtn'
                    }
                }, [ this.buttonText ]),
                createElement('div', {
                    attrs: {
                        class: 'text-links'
                    }
                }, [
                    createElement('a', {
                        attrs: {
                            href: '#',
                            id: 'signupBtn'
                        },
                        on: {
                            click: this.signupTitle
                        }
                    }, [ 'Signup for a free account!' ])
                ])
            ])
        ])
    }
});