<template>
    <div class="v-modal-container">
        <transition name='t-layer'>
            <div class="v-layer"
                 @click='closeOverlay'
                 v-show="currentValue"></div>
        </transition>
        <transition name="t-scale" >
            <div class="v-modal" v-show='currentValue'>
                <header>
                    <slot name='header'></slot>
                </header>
                <main>
                    <slot name='main'></slot>
                </main>
                <footer>
                    <slot name='footer'></slot>
                </footer>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'modal',
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentValue: false
        }
    },
    created() {
        if (typeof this.value !== 'undefined') {
            this.currentValue = this.value;
        }
    },
    watch: {
        value: {
            handler(val) {
                this.currentValue = val;
            },
            immediate: true
        },
        currentValue(val) {
            this.$emit(val ? 'modal-show' : 'modal-hide');
            this.$emit('input', val);
        }
    },
    methods: {
        closeOverlay() {
            this.currentValue = false;
        }
    }
}
</script>
 <style lang="less">
.v-layer {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, .6);
}

.v-modal {
    position: fixed;
    width: 14rem;
    min-height: 12rem;
    left: 50%;
    top: 50%;
    margin-top: -6rem;
    margin-left: -7rem;
    background: #fff;
    border-radius: 5px;
    background: #fff;
    z-index: 1001;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 ,p{
        font-size: 18px;
        text-align: center;
        padding: 10px 0;
        font-weight: normal;
    }
}

.t-scale-enter-active{
    animation: scale-in .5s linear;
}
.t-scale-leave-active {
    transform: scale(0);
    transition: transform 500ms;
}
@keyframes scale-in{
    0%{
       transform: scale(0); 
    }
    100%{
        transform: scale(1);
    }
}

</style>