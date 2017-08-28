const dataSet = [
    {
        id: 1,
        name: 'Mocha',
        type: ['American', 'Mexican', 'Patisserie', 'Cafe'],
        rating: 4.3
    }, {
        id: 2,
        name: 'Playground',
        type: ['American', 'Italian', 'Indian'],
        rating: 1.2
    }, {
        id: 3,
        name: 'MTV Flyp',
        type: ['Cafe', 'Pub'],
        rating: 3.0
    }, {
        id: 5,
        name: 'F Bar',
        type: ['Bar', 'Cafe', 'American'],
        rating: 4.0
    }
];
// Your VueJS code goes here
const RestaurantName = {
    name: 'restaurant-name',
    props: ['name'],
    template: `<div class="restaurant-name">{{name}}</div>`
}

const RestaurantType = {
    name: 'restaurant-type',
    props: ['type'],
    template: `<div class="restaurant-type">{{type.join(' | ')}}</div>`
}

const ListItem = {
    name: 'list-item',
    props: ['listData'],
    components: {
        RestaurantName,
        RestaurantType
    },
    template: 
        `<div class="list-item">
            <restaurant-name :name="listData.name" />
            <restaurant-type :type="listData.type" />
         </div>`
}

new Vue({
    el: '#app',
    data() {
        return {
            restaurants: dataSet
        }
    },
    components: {
        ListItem
    },
    template: `
        <div id="list-container">
            <list-item v-for="x in restaurants" v-bind:key="x.id" :list-data="x" />
        </div>
    `
});