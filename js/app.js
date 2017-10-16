// Your VueJS code goes here...
Vue.component('warn', {
    props: ['show'],
    template:
    `
    <transition name="warn-transition">
        <div class="warning" v-if="show">
            <span class="warn-text">
                <slot name="message">Success!</slot>
            </span>
            <span class="warn-records">
                <slot name="records">No</slot> records were updated!
            </span>
            <a href="#" class="cancel-btn" @click="$emit('close')">X</a>
        </div>
    </transition>
    `
});

Vue.component('app', {
    data() {
        return {
            showWarning: false
        }
    },
    template: 
    `
    <div>
        <a href="#" class="remove-btn" @click="showWarning = true">Remove Data!</a>
        <warn :show="showWarning" @close="showWarning = false">
            <span slot="message">Your data has been removed from the system!</span>
            <span slot="records">234</span>
        </warn>        
    </div>`
});

new Vue({
    el: '#app',
    template: '<app />'
});