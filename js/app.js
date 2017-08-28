// Your VueJS code goes here
const InputField = {
    name: 'input-field',
    props: ['value'],
    template: '<input type="number" min="0" :value="value" @change="update" @keyup="update">',
    methods: {
        update() {
            this.$emit('update:value', Number(event.target.value));
        }
    }
}

const RangeSlider = {
    name: 'range-slider',
    props: ['value'],
    template: '<input type="range" min="0" max="100" :value="value" @input="update">',
    methods: {
        update() {
            this.$emit('update:value', Number(event.target.value));
        }
    }
}


const App = {
    name: 'app',
    data() {
        return {
            val: 0
        }
    },
    components: {
        InputField,
        RangeSlider
    },
    template: 
        `<div id="container">
            <input-field :value.sync="val" />
            <range-slider :value.sync="val" />
        </div>`
}

new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<app />'
});