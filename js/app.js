// Your VueJS code goes here
const apiKey = "fa94eed770e24f1cbd1174101170310";

Vue.component('search-box', {
    data() {
        return {
            showResults: false,
            locationsArray: []
        }
    },
    methods: {
        searchLoc: _.debounce(function(event) {
            if(event.target.value) {
                axios.get('https://api.apixu.com/v1/search.json', {
                    params: {
                        key: apiKey,
                        q: event.target.value
                    }
                })
                .then(res => {
                    this.locationsArray = res.data;
                    this.showResults = true;
                })
                .catch(error => {
                    console.log(error);
                    this.locationsArray = [];
                    this.showResults = false;
                });
            }
        }, 500),
        clearOut() {
            this.locationsArray = [];
            this.showResults = false;
            this.$refs.searchField.value = '';
        },
        emitLocation(loc) {
            this.$emit('addLocation', loc);
            this.clearOut();
        }
    },
    template:
    `
    <div class="search">
        <input type="text" placeholder="Search and add a location..."
            @input="searchLoc"
            @keyup.esc="clearOut"
            ref="searchField"
        >
        <ul class="search-results" v-if="showResults">
            <li 
                v-for="loc in locationsArray"
                @click="emitLocation(loc)">{{loc.name}}</li>
        </ul>
    </div>`
});

Vue.component('weather-cards', {
    props: ['location'],
    data() {
        return {
            isLoading: true,
            weather: {
                condition: '',
                temperature: '',
                icon: ''
            },
            place: {
                name: '',
                isDay: true
            }
        }
    },
    created() {
        axios.get('https://api.apixu.com/v1/current.json', {
            params: {
                key: apiKey,
                q: this.location.loc
            }
        })
        .then(res => {
            let { current, location } = res.data;
            this.weather.condition = current.condition.text;
            this.weather.temperature = current.temp_c;
            this.weather.icon = current.condition.icon;

            this.place.name = location.name;
            this.place.isDay = current.is_day === 1 ? true : false;
            this.isLoading = false;
        })
        .catch(error => console.log(error));
    },
    template:
    `
    <div :class="['card', place.isDay ? 'day' : 'night']">
        <span class="temperature">{{weather.temperature}}&#176;</span>
        <div class="location">{{place.name}}</div>
        <div class="conditions">{{weather.condition}}</div>
        <img class="icon" :src="weather.icon" />
        <a href="#" class="remove-btn" @click="$emit('removeLocation', location.id)">X</a>
        <div class="loading" v-if="isLoading"></div>
    </div>`
});

Vue.component('weather-app', {
    data() {
        return {
            locations: []
        }
    },
    created() {
        this.getFromLS();
    },
    methods: {
        updateLS() {
            if(window.localStorage) {
                window.localStorage.setItem('weatherLocations', JSON.stringify(this.locations));
            }
        },
        getFromLS() {
            if(window.localStorage && window.localStorage['weatherLocations'] !== '') {
                this.locations = JSON.parse(window.localStorage['weatherLocations']);
            }
        },
        addLocation(payload) {
            let place = {
                loc: `${payload.lat},${payload.lon}`,
                id: payload.id
            }

            if(!this.locations.some(loc => loc.id === place.id)) {
                this.locations.unshift(place);
                this.updateLS();
            }
        },
        removeLocation(id) {
            let locationIndex = this.locations.findIndex(loc => loc.id === id);
            this.locations.splice(locationIndex, 1);
            this.updateLS();
        }
    },
    template:
    `
    <div class="weather-app">
        <search-box @addLocation="addLocation" />
        <div class="cards">
            <weather-cards 
                v-for="location in locations"
                :key="location.id"
                :location="location"
                @removeLocation="removeLocation" />
        </div>
    </div>`
});

new Vue({
    el: '#app',
    template: '<weather-app />'
});