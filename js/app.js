// Your VueJS code goes here
Vue.component('input-field', {
    props: ['name', 'value'],
    computed: {
        typeFn() {
            let types = [{
                typeName: 'text',
                nameDict: ['Name', 'Address']
            }, {
                typeName: 'phone',
                nameDict: ['Phone', 'Mobile']
            }, {
                typeName: 'email',
                nameDict: ['Email']
            }];

            let findType = types.filter(t => {
                return t.nameDict.some(v => v === this.name);
            });

            if(findType[0]) {
                return findType[0]['typeName'];
            } else {
                return 'text';
            }
        }
    },
    template: `
    <div class="form-field">
        <input :type="typeFn" :placeholder="name" :value="value" @input="$emit('input', $event.target.value)">
    </div>`
});

Vue.component('multi-option', {
    props: ['config', 'value'],
    data() {
        return {
            pickedValue: this.value
        }
    },
    watch: {
        pickedValue: function() {
            this.$emit('input', this.pickedValue);
        }
    },
    template: 
    `
    <div class="form-field">
        <h4>{{config.name}}</h4>
        <div class="multi-option" v-for="(n, key) in config.opts" :key="key">
            <div class="label">{{n}}</div>
            <div class="field">
                <input type="radio" :value="n" v-model="pickedValue" v-if="config.type === 'radio'">
                <input type="checkbox" :value="n" v-model="pickedValue" v-else-if="config.type === 'checkbox'">
            </div>
        </div>
    </div>
    `
});

Vue.component('list-option', {
    props: ['config', 'value'],
    methods: {
        generateSeq() {
            let yrs = [];
            for(let x = this.config.minValue; x <= (new Date().getFullYear()); x++) {
                yrs.push(String(x));
            }

            return yrs;
        },
        isSelected(year) {
            return year === this.value;
        }
    },
    template: 
    `
    <div class="form-field">
        <select @change="$emit('input', $event.target.value)">
            <option selected disabled>{{config.title}}</option>
            <option v-for="year in generateSeq()" :selected="isSelected(year)">{{year}}</option>
        </select>
    </div>
    `
});

const App = {
    name: 'app',
    data() {
        return {
            routeView: 'formView',
            customer: {
                name: '',
                email: '',
                phone: '',
                carType: '',
                contactMode: [],
                carModel: '',
                yearOfPurchase: ''
            },
            config: {
                typeOfCar: {
                    type: 'radio',
                    name: 'Type of Car',
                    opts: ['Sedan', 'Saloon', 'MPV', 'SUV']
                },
                contactMode: {
                    type: 'checkbox',
                    name: 'Contact Mode',
                    opts: ['E-Mail', 'Phone', 'Post', 'Agent Visit']
                },
                yearOfPurchase: {
                    title: 'Year of Purchase',
                    minValue: 1975
                }
            }
        }
    },
    computed: {
        validate() {
            return this.customer.name !== ''
                && this.customer.email !== ''
                && this.customer.phone !== ''
                && this.customer.carType !== ''
                && this.customer.carModel !== ''
                && this.customer.contactMode.length !== 0
                && this.customer.yearOfPurchase !== ''
        }
    },
    methods: {
        sendData() {
            // Send data to the server
            console.log(this.customer);
            this.routeView = 'thanksView';
        }
    },
    filters: {
        firstname(str) {
            return str.split(/\s/)[0];
        }
    },
    template: `
    <div v-if="routeView === 'formView'">
        <input-field name="Name" v-model="customer.name" />
        <div class="separator" />
        <input-field name="Email" v-model="customer.email" />
        <div class="separator" />
        <input-field name="Phone" v-model="customer.phone" />
        <div class="separator" />
        <multi-option :config="config.typeOfCar" v-model="customer.carType"/>
        <div class="separator" />
        <multi-option :config="config.contactMode" v-model="customer.contactMode"/>
        <div class="separator" />
        <input-field name="Car Model" v-model="customer.carModel" />
        <div class="separator" />
        <list-option :config="config.yearOfPurchase" v-model="customer.yearOfPurchase"/>
        <div class="form-field">
            <a href="#" id="sendBtn" @click="sendData" v-if="validate">Request a Quote!</a>
        </div>
    </div>
    <div v-else-if="routeView === 'thanksView'" id="thankyou-dialog">Thank you for your request {{customer.name | firstname}}! We'll get back to you soon!</div>
    `
}



new Vue({
    el: '#app',
    components: { App },
    template: 
    `<div id="container">
        <div class="title-holder">Sales Quote Request</div>
        <app />
    </div>`
});