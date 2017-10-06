<template>
    <div style="display:inline;">
        <span>{{tweeingValue}}</span>
    </div>
</template>

<script>
import TWEEN from 'tween/tween.min.js'

export default {
    name: 'animatedInter',
    props: {
        value: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            tweeingValue: 0
        }
    },
    watch: {
        value: function (newValue, oldValue) {
            this.tween(oldValue, newValue);
        }
    },
    mounted: function () {
        this.tween(0, this.value);
    },
    methods: {
        tween: function (startValue, endValue) {
            var vm = this;
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            new TWEEN.Tween({
                tweeingValue: startValue
            })
                .to({ tweeingValue: endValue }, 1000)
                .onUpdate(function () {
                    vm.tweeingValue = this.tweeingValue.toFixed(0);
                })
                .start();
            animate();
        }
    }
}
</script>