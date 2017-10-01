// Your VueJS code goes here
Vue.component('slides', {
    props: ['src'],
    data() {
        return {
            width: this.$parent.w,
            height: this.$parent.h
        }
    },
    computed: {
        getStyle() {
            return {
                'background-image': `url(${this.src})`,
                width: `${this.width}px`,
                height: `${this.height}px`
            }
        }
    },
    template:
    `
    <div class="slides" :style="getStyle"></div>
    `
});

Vue.component('slideshow', {
    props: ['w', 'h'],
    data() {
        return {
            slideCount: 0,
            maxSlideX: 0,
            galleryXPos: 0
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getSlideCount();
            setInterval(this.runShow, 4000);
        });
    },
    methods: {
        runShow() {
            if(this.galleryXPos !== this.maxSlideX) {
                this.galleryXPos = this.galleryXPos - this.w;
            } else {
                this.galleryXPos = 0;
            }
        },
        getViewportSize() {
            return {
                width: `${this.w}px`,
                height: `${this.h}px`
            }
        },
        getSlideCount() {
            this.slideCount = this.$slots.default.filter(item => {
                return item.elm.className === 'slides';
            }).length;

            this.maxSlideX = -(this.w * (this.slideCount - 1));
        },
        getGalleryStyle() {
            return {
                width: `${this.slideCount * this.w}px`,
                transform: `translate(${this.galleryXPos}px, 0px)`
            }
        }
    },
    template:
    `
    <div class="viewport" :style="getViewportSize()">
        <div class="gallery" :style="getGalleryStyle()">
            <slot></slot>
        </div>
    </div>
    `
});

new Vue({
    el: '#app'
});