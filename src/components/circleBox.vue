<template>
    <div class="test-item v-bg-lightgray"
         :class="state=='normal'?'open':halfClass"
         :data-code="code">
        <div v-if="state=='normal'"
             :class="[activeClass,commonClass]">开始测试</div>
        <div v-else
             :class='[commonClass]'>暂未开通</div>
        <h3 class="v-gray">{{paperName}}</h3>
    </div>
</template>
<script>
export default {
    props: ['state', 'code', 'paperName'],
    data() {
        return {
            halfClass: 'half',
            commonClass: 'circle-box v-fz-18 v-white',
            activeClass: 'test-active v-bg-yellow'
        }
    }
}
</script>
<style lang="less" scoped>
.test-item {
    float: left;
    width: 100%;
    margin-top: 4%;
    padding-top: 5%;
    text-align: center;
    border-radius: 3px;
    box-shadow: 0 0 3px 2px rgba(223, 223, 221, .55);
    &.half {
        width: calc((100% - 5px)/2);
        .circle-box {
            width:6.1rem;
            height:6.1rem;
            line-height:6.1rem;
            background: #dfdfdf;
        }
    }
}

.circle-box {
    position: relative;
    width: 7rem;
    height: 7rem;
    line-height: 7rem;
    margin: 0 auto;
    border: 1px solid transparent;/*解决部分oppo机型渲染问题*/
    border-radius: 50%;
    box-shadow: 0 0 5px 5px rgba(223, 223, 221, .64);
    &.test-active {
        box-shadow: 0 0 5px 5px rgba(228, 187, 145, .64);
    }
}

h3 {
    line-height: 1.2;
    font-weight: normal;
    margin: .5rem 0;
    font-size: .8rem;
}
</style>