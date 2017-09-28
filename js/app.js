// Your VueJS code goes here
const CurrencyInput = {
    name: 'currency-input',
    props: ['value', 'symbol'],
    data() {
        return {
            symbols: ['INR', 'USD', 'GBP', 'EUR']
        }
    },
    methods: {
        isSelected(val) {
            return val === this.symbol;
        }
    },
    template:
    `
    <div class="section">
        <div class="currency-symbol">
            <select @change="$emit('symChanged', $event.target.value)">
                <option v-for="sym in symbols" :selected="isSelected(sym)">{{sym}}</option>
            </select>
        </div>
        <div class="currency-value">
            <input type="number" min="0" :value="value" @input="$emit('input', $event.target.value)" @focus="$emit('focus')">
        </div>
    </div>
    `
}

const CurrencyConvertor = {
    name: 'currency-convertor',
    data() {
        return {
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
    components: {
        CurrencyInput
    },
    created() {
        this.getRate();
    },
    methods: {
        getRate() {
            $.getJSON(`https://api.fixer.io/latest?base=${this.symbols.first}&symbols=${this.symbols.second}`, json => {
                this.conversionRate = json.rates[this.symbols.second] || 1.000;
                this.convert();
            });
        },
        convert() {
            if(this.firstActive) {
                this.inputValue.second = (this.inputValue.first * this.conversionRate).toFixed(4);
            } else {
                this.inputValue.first = (this.inputValue.second / this.conversionRate).toFixed(4);
            }
        },
        symChanged(sym) {
            this.symbols[sym] = event.target.value;
            this.getRate();
        },
        inputValChanged(val) {
            this.inputValue[val] = event.target.value;
            this.convert();
        }
    },
    template:
    `
    <div class="currency-convertor">
        <currency-input 
            :value="inputValue.first"
            :symbol="symbols.first" 
            @input="inputValChanged('first')"
            @focus="firstActive = true" 
            @symChanged="symChanged('first')"
        />
        <currency-input 
            :value="inputValue.second"
            :symbol="symbols.second" 
            @input="inputValChanged('second')"
            @focus="firstActive = false" 
            @symChanged="symChanged('second')"
        />
    </div>
    `
}

new Vue({
    el: '#app',
    components: {
        CurrencyConvertor
    },
    template: '<currency-convertor />'
});