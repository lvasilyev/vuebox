// Your VueJS code goes here
new Vue({
    el: '#app',
    data() {
        return {
            slidevalue: 0
        }
    },
    created() {
        this.runshow();
    },
    methods: {
        slide() {
            if(this.slidevalue > -800) {
                this.slidevalue = this.slidevalue - 320;
            }
        },
        runshow() {
            setInterval(() => {
                this.slide();
            }, 4000);
        }
    },
    computed: {
        translateVal() {
            return {
                'transform': `translate3d(${this.slidevalue}px, 0px, 0px)`,
                'transition-duration': 1000 + 'ms'
            }
        }
    },
    template: `
    <div class="viewport">
        <ul class="gallery" :style="translateVal">
            <li class="slide">1</li>
            <li class="slide">2</li>
            <li class="slide">3</li>
            <li class="slide">4</li>     
        </ul> 
 </div>
    `
});