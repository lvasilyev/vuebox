const products = [
    {
        product: "Ben & Jerry's Coconut Seven",
        cost: 30,
        quantity: 2
    }, {
        product: "Lipton Honey Lemon Green Tea",
        cost: 10,
        quantity: 6
    }, {
        product: "Lindt Lindor - Milk Truffles",
        cost: 100,
        quantity: 1
    }, {
        product: "Ferrero Rocher (24 Pieces)",
        cost: 12,
        quantity: 4
    }, {
        product: "Goodwyn Tea",
        cost: 20,
        quantity: 8
    }, {
        product: "Typhoo Treasures Green Tea",
        cost: 5,
        quantity: 10
    }
];
// Your VueJS code goes here

const ListItem = {
    props: ['item'],
    template: `
    <span>
        <span class="product">{{item.product}}</span>
        <span class="quantity">{{item.quantity}}</span>
        <span class="cost">{{item.quantity * item.cost}}</span>
    </span>
    `
}

const App = {
    components: {
        ListItem
    },
    data() {
        return {
            cart: products,
            total: 0
        }
    },
    template: `
        <div id="cart">
            <h2>Shopping List</h2>
            <ol id="list">
                <li v-for="item in cart">
                    <ListItem :item="item" />
                </li>
            </ol>

            <div id="totals">
                Total = USD {{totals}}
            </div>
        </div>
    `,
    computed: {
        totals() {
            return this.cart.reduce(function(total, item) {
                return total + (item.cost * item.quantity);
            }, 0);
        }
    }
};

new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<App />'
});
