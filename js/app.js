// Your VueJS code goes here
Vue.component('currency-convertor', {
    data() {
        return {
            isLoading: true,
            symbolsArray: ['INR', 'USD', 'GBP', 'EUR', 'CAD'],
            symbols: {
                first: 'USD',
                second: 'INR'
            },
            inputValue: {
                first: 1,
                second: 0
            },
            conversionRate: 0,
            firstActive: true
        }
    },
    created() {
        this.getRate();
    },
    methods: {
        getRate() {
            this.isLoading = true;
            let {first, second} = this.symbols;

            axios.get('https://api.fixer.io/latest', {
                params: {
                    base: first,
                    symbols: second
                }
            })
            .then(res => {
                this.conversionRate = res.data.rates[second] || 1.0;
                this.convert();
                this.isLoading = false;
            });
        },
        convert() {
            if(this.firstActive) {
                this.inputValue.second = (this.inputValue.first * this.conversionRate).toFixed(3);
            } else {
                this.inputValue.first = (this.inputValue.second / this.conversionRate).toFixed(3);
            }
        }
    },
    template:
    `
    <div class="currency-convertor">
        <div class="section">
            <div class="currency-symbol">
                <select v-model="symbols.first" @change="getRate()">
                    <option v-for="sym in symbolsArray">{{sym}}</option>
                </select>
            </div>
            <div class="currency-value">
                <input type="number" min="0" value="0" 
                    v-model.number="inputValue.first"
                    @input="convert()"
                    @focus="firstActive = true"
                >
            </div>
        </div>
        <div class="section">
            <div class="currency-symbol">
                <select v-model="symbols.second" @change="getRate()">
                    <option v-for="sym in symbolsArray">{{sym}}</option>
                </select>
            </div>
            <div class="currency-value">
                <input type="number" min="0" value="0" 
                    v-model.number="inputValue.second"
                    @input="convert()"
                    @focus="firstActive = false"
                >
            </div>
        </div>
        <div id="cover" v-if="isLoading"></div>
    </div>
    `
});

new Vue({
    el: '#app',
    template: '<currency-convertor />'
});