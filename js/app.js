// Your VueJS code goes here
const ListWidget = {
    name: 'list-widget',
    props: ['cart'],
    data() {
        return {
            product: '',
            products: this.cart
        }
    },
    methods: {
        addProduct() {
            if(this.product !== '') {
                this.products.push(this.product);
                this.product = '';
            }
        },
        removeItem(key) {
            this.products.splice(key, 1);
        }
    },
    template: `
    <div class="add-products">
        <ul>
            <li class="product" v-for="(item, key) in products" :key="key">
                <span class="title">{{item}}</span>
                <a href="#" class="remove-btn" @click.prevent="removeItem(key)">X</a>
            </li>
            <li class="search-box"><input type="text" placeholder="Add Products..." v-model="product" @keyup.enter="addProduct"></li>
        </ul>
    </div>
    `
}

const App = {
    name: 'app',
    components: {
        ListWidget
    },
    data() {
        return {
            cart: []
        }
    },
    template: `
    <div class="add-products-container">
        <list-widget :cart="cart" />
        <ol class="products-list">
            <li v-for="item in cart">{{item}}</li>
        </ol>
    </div>
    `
}

new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<app />'
});