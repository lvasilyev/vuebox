const places = [
    {
        id: 1,
        name: 'Mocha',
        rating: 4
    }, {
        id: 2,
        name: 'Playground',
        rating: 1
    }, {
        id: 3,
        name: 'MTV Flyp',
        rating: 3
    }, {
        id: 5,
        name: 'F Bar',
        rating: 4
    }
];

const RatingMeter = {
    name: 'rating-meter',
    props: ['value'],
    computed: {
        ratingStyle() {
            if(this.value <= 2) {
                return 'red';
            } else if(this.value === 3) {
                return 'orange';
            }
        }
    },
    template: `
    <div class="rating-meter">
        <div :class="['rating-block', ratingStyle]" v-for="x in value" />
    </div>
    `
}

const ListItem = {
    name: 'list-item',
    props: ['place'],
    components: { RatingMeter },
    template: 
    `<div class="list-item">
        <div class="restaurant-name">{{place.name}}</div>
        <rating-meter :value="place.rating" />
    </div>`
}

const App = {
    name: 'app',
    data() {
        return {
            places
        }
    },
    components: { ListItem },
    template: 
    `<div id="list-container">
        <list-item v-for="place in places" :key="place.id" :place="place" />
    </div>`
}

new Vue({
    el: '#app',
    components: { App },
    template: '<app />'
});