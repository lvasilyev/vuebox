// Your VueJS code goes here
Vue.component('super-button', {
    data() {
        return {
            enabled: false,
            buttonState: 0,
            blinkState: false,
            ticktock: false
        }
    },
    created() {
        setInterval(() => {
            this.ticktock = !this.ticktock;
        }, 800);
    },
    methods: {
        toggle() {
            // If the button is blinking, first turn it off
            if(this.blinkState) {
                this.blinkState = false;
                this.enabled = false;
                this.buttonState = 0;
                return;
            }

            // If the button is enabled, turn it off
            // or else enable it.
            if(!this.enabled) {
                this.enabled = true;
                this.buttonState = 1;
            } else {
                this.enabled = false;
                this.buttonState = 0;
            }
        },
        toggleBlink() {
            if(!this.blinkState) {
                this.enabled = false;
                this.buttonState = 2;
                this.blinkState = true;
            }
        }
    },
    watch: {
        buttonState() {
            this.$emit('buttonstate', this.buttonState);
        }
    },
    computed: {
        buttonText() {
            switch(this.buttonState) {
                case 0: 
                    return 'Off';
                    break;
                case 1:
                    return 'On';
                    break;
                default: 
                    return 'ALERT';
            }
        },
        blinks() {
            if(this.blinkState) {
                return this.ticktock;
            } else {
                return false;
            }
        }
    },
    template: 
    `<div class="button">
        <a href="#" 
            :class="[
                'btn', 
                { 'btn-on' : enabled }, 
                { 'btn-blink' : blinkState }, 
                { 'btn-blink-off' : blinks }
            ]" 
            @click.prevent="toggle"
            @dblclick.prevent="toggleBlink">{{buttonText}}</a>
    </div>`
});

new Vue({
    el: '#app',
    methods: {
        useButton(ev) {
            console.log(ev);
        }
    },
    template: `
    <div id="container">
        <super-button @buttonstate="useButton" />
        <super-button  />
        <super-button  />
        <super-button  />
    </div>
    `
})