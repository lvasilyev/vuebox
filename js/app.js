// Your VueJS code goes here
Vue.component('input-field', {
    props: ['name', 'value'],
    data() {
        return {
            type: ''
        }
    },
    computed: {
        typeFn() {
            let types = [{
                typeName: 'text',
                nameDict: ['Name','Address']
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
    methods: {
        update() {
            this.$emit('input', event.target.value);
        }
    },
    template: `
    <div class="form-field">
        <input :type="typeFn" :placeholder="name" @input="update" :value="value">
    </div>
    `
});

Vue.component('multi-option', {
    props: ['config', 'value'],
    data() {
        return {
            data: []
        }
    },
    watch: {
        data: function() {
            this.$emit('input', this.data);
        }
    },
    computed: {
        yearCount(n) {
            return n > 1960 && n <= (new Date().getFullYear());
        }
    },
    template: `
    <div class="form-field">
        <h4>Type of car</h4>
        <div class="multi-option" v-for="(n, key) in config.opts" :key="key">
            <div class="label">{{n}}</div>
            <div class="field">
                <input type="radio" :value="n" v-model="data" v-if="config.type === 'radio'">
                <input type="checkbox" :value="n" v-model="data" v-if="config.type === 'checkbox'">
            </div>
        </div>
    </div>
    `
});

Vue.component('list-option', {
    props: ['config', 'value'],
    methods: {
        generateSeq() {
            let yr = [];
            for(let x = 1950; x <= 2017; x++) {
                yr.push(String(x));
            }

            return yr;
        }
    },
    render(h) {
        return h('div', {
            attrs: {
                class: 'form-field'
            }
        }, [
            h('select', {
                domProps: {
                    value: this.value === '' ? this.config.title : this.value
                },
                on: {
                    input: () => {
                        this.$emit('input', event.target.value);
                    }
                }
            },[
                h('option', {
                    attrs: {
                        selected: true,
                        disabled: true
                    }
                }, [ this.config.title ]),
                    this.generateSeq().map(i => {
                        return h('option', i)
                    })
            ])
        ]);
    }
});

const App = {
    name: 'app',
    data() {
        return {
            customer: {
                name: '',
                email: '',
                phone: '',
                carType: '',
                contactMode: [],
                carmodel: '',
                yearOfPurchase: ''
            },
            config: {
                typeOfCar: {
                    type: 'radio',
                    name: 'typeOfCar',
                    opts: ['Sedan', 'Saloon', 'MPV', 'SUV']
                },
                contactMode: {
                    type: 'checkbox',
                    name: 'contactMode',
                    opts: ['E-Mail', 'Phone', 'Post', 'Agent Visit']
                },
                yearOfPurchase: {
                    title: 'Year of Purchase'
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
    template: `
    <div>
        <input-field name="Name" v-model="customer.name" />
            <div class="separator" />
        <input-field name="Email" v-model="customer.email" />
            <div class="separator" />
        <input-field name="Phone" v-model="customer.phone" />
            <div class="separator" />
        <multi-option :config="config.typeOfCar" v-model="customer.carType" />
            <div class="separator" />
        <multi-option :config="config.contactMode" v-model="customer.contactMode" />
            <div class="separator" />
        <input-field name="Car Model" v-model="customer.carmodel" />
            <div class="separator" />
        <list-option :config="config.yearOfPurchase" v-model="customer.yearOfPurchase" />
        <div class="form-field" v-if="validate">
            <a href="#" id="sendBtn">Request a Quote!</a>
        </div>
    </div>`
}



new Vue({
    el: '#app',
    components: { App },
    template: 
    `<div id="container">
        <div class="title-holder">Sales Quote Request</div>
        <app />
    </div>
    `
});