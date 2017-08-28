// Your VueJS code goes here
const InputField = {
    name: 'input-field',
    template: '<input type="number" min="0">'
}

const RangeSlider = {
    name: 'range-slider',
    template: '<input type="range" min="0" max="100">'
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
            <input-field />
            <range-slider />
        </div>`
}

new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<App />'
});