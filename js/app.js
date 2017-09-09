// Your VueJS code goes here
const ListWidget = {
    name: 'list-widget',
    props: ['value'],
    data() {
        return {
            product: '',
            products: this.value
        }
    },
    methods: {
        addProduct() {
            if(this.product !== '') {
                this.products.push(this.product);
                this.product = '';
                //this.syncCart();
            }
        },
        removeItem(key) {
            this.products.splice(key, 1);
            //this.syncCart();
        }
    },
    watch: {
        products: function() {
            this.$emit('input', this.products);
        }
    },
    template: `
    <div class="add-products">
        <ul>
            <li class="product" v-for="(item, key) in products">
                <span class="title">{{item}}</span>
                <a href="#" class="remove-btn" @click.prevent="removeItem(key)">X</a>
            </li>
            <li class="search-box"><input type="text" placeholder="Add Products..." v-model="product" @keyup.enter="addProduct"></li>
        </ul>
    </div>
    `
}


new Vue({
    el: '#app',
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
            <list-widget v-model="cart" />
            <ol class="products-list">
                <li v-for="item in cart">{{item}}</li>
            </ol>
        </div>
    `
});