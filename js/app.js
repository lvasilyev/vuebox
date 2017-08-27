// Your VueJS code goes here
Vue.component('product-box', {
    data() {
        return {
            product: '',
            cart: []
        }
    },
    methods: {
        addProduct() {
            if(this.product !== '') {
                this.cart.push(this.product);
                this.product = '';
            }
        },
        removeItem(key) {
            this.cart.splice(key, 1);
        }
    },
    template: `
            <div class="add-products">
                <ul>
                    <li class="product" v-for="(item, key) in cart">
                        <span class="title">{{item}}</span>
                        <a href="#" class="remove-btn" @click.prevent="removeItem(key)">X</a>
                    </li>
                    <li class="search-box"><input type="text" placeholder="Add Products..." v-model="product" @keyup.enter="addProduct"></li>
                </ul>
            </div>
    `
});

new Vue({
    el: '#app',
    data() {
        return {
            email: []
        }
    },
    template: `
        <div class="add-products-container">
            <product-box />
        </div>`
});
