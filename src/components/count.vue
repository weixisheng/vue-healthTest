<template>
    <div class="v-product-count">
        <div class="v-btn-minus"
             @click="sub">
            <i class="fa fa-minus"></i>
        </div>
        <input type="tel"
               class="v-input"
               v-model.number="currentValue"
               disabled>
        <div class="v-btn-plus"
             @click="add">
            <i class="fa fa-plus"></i>
        </div>
    </div>
</template>
<script>
export default {
    name: 'count',
    props: {
        min: Number,
        max: Number,
        step: {
            type: Number,
            default: 1
        },
        value: {
            type: Number,
            default: 1
        }
    },
    created() {
        this.currentValue = this.value
    },
    data() {
        return {
            currentValue: 1
        }
    },
    watch: {
        currentValue(newValue, oldValue) {
            if (this.min && this.currentValue < this.min)
                this.currentValue = this.min;
            if (this.max && this.currentValue > this.max)
                this.currentValue = this.max;

            this.$nextTick(() => {
                this.$emit('pro-count', this.currentValue);
                // this.$emit('on-input', this.currentValue);
            });
        },
        value(newValue) {
            this.currentValue = newValue;
        }
    },
    methods: {
        add() {
            this.currentValue += this.step;
        },
        sub() {
            this.currentValue -= this.step;
        }
    }
}
</script>

<style lang="less">
.v-product-count {
    float: left;
    border: 1px solid #e4bb91;
    div {
        box-sizing: border-box;
        width: 2em;
        line-height: 2;
        text-align: center;
        font-weight: bold;
        float: left;
        font-size: 15px;
        color: #e4bb91;
        border-left: none;
        &:first-child {
            border-left: none;
        }
        &:last-child {
            border-left: 1px solid #e4bb91;
        }
    }
    input {
        text-align: center;
        border-left: 1px solid #e4bb91;
        width: 40px;
        float: left;
        line-height: 2;
        font-size: 15px;
        color: #888;
    }
}
</style>