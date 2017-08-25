// Your VueJS code goes here
new Vue({
    el: '#app',
    template: `
        <div id="number-box">
            <ul>
                <li v-for="x in 30" :style="backgroundColor()" @click="rerender">{{x < 10 ? ('0' + x) : x}}</li>
            </ul>
        </div>
    `,
    methods: {
        rerender() {
            this.$forceUpdate();
        },
        getRandom() {
            return parseInt(Math.random() * 255);
        },
        backgroundColor() {
            return {
                'background-color': `rgb(${this.getRandom()}, ${this.getRandom()}, ${this.getRandom()})`
            }
        }
    }
});