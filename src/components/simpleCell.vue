<template>
    <div class="my-cell"
         @click="doClick"
         :style="{padding:padding+'px'}">
        <div class="my-head">
            <slot name="icon"></slot>
        </div>
        <div class="my-body">
            <slot name="label"></slot>
        </div>
        <div class="my-foot"
             :class="[link?'isLink':'']">
             <slot name="second"></slot>
        </div>
        <div class="my-desc">
            <slot name="more"></slot>
        </div>
    </div>
</template>

<script>
import { go } from '../../node_modules/vux/src/libs/router'
export default {
    name: 'SimpleCell',
    props: {
        link: {
            type: [String, Object]
        },
        padding: {
            type: Number,
            default: 15
        }
    },
    methods: {
        doClick() {
            if (!!this.link) {
                go(this.link, this.$router);
            }
        }
    }
}
</script>
<style lang="less">
.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.my-cell {
    background: #fff;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 0;
    &:last-child {
        border-bottom: none;
    }
    .my-head {
        display: inline-block;
        margin-right: 5px;
        font-size: 18px;
        span {
            width: 20px;
        }
        img {
            width: 100%;
        }
    }
    .my-body {
        flex: 1;
        font-size: 16px;
        .ellipsis;
    }
    .my-foot {
        display: inline;
        
        position: relative;
        font-size: 15px;
        color:#aaa;
        &.isLink {
            right: 10px;
            &:after {
                position: absolute;
                content: '';
                top: -6px;
                width: 10px;
                height: 10px;
                border: 1px solid transparent;
                border-top-color: #2318fb;
                border-right-color: #e21243;
                transform: rotate(45deg);
            }
        }
    }
}

.my-desc {
    flex: none;
    width: 100%;
    font-size: 14px;
    padding-left: 20px;
}
</style>